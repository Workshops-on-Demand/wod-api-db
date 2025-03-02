#!/usr/bin/perl -w
#
# Update the workshop DB to synchronize the content of the DB with the set of wod.yml files from workshops
# Need to be called after wod.sh and functions.sh have been sourced
# Done automatically at install time

use strict;
use Data::Dumper;
use open ":std", ":encoding(UTF-8)"; # to avoid wide char in print msgs
# Load functions also used by the update process
use lib "$ENV{'WODSCRIPTDIR'}";
require "wod-update-functions.pl";
# Comm with the DB
use DBI;
# For some advanced uses you may need PostgreSQL type values:
use DBD::Pg qw(:pg_types);
#use Tie::DBI;

# Get content from git wod.yml files
my $h = get_wod_metadata();
print "Wod metadata:".Dumper($h)."\n";

my $dbh = DBI->connect("dbi:Pg:dbname=$ENV{'WODPGDB'};host=localhost",
	$ENV{'WODPGUSER'},
	$ENV{'WODPGPASSWD'},
                    {AutoCommit => 1, RaiseError => 1, PrintError => 0}
		    ) || die "Unable to connect to $ENV{'POSTGRES_DB'} $DBI::errstr";
# The AutoCommit attribute should always be explicitly set
 
 
# First we need to detect backends
# The first or single is item 0
my $backs = $dbh->selectall_hashref("SELECT * FROM locations","name") || die "Unable to selectall_arrayref from DB $DBI::errstr";
my @backends = keys %{$backs};
my @backfirst = split(/:/,$backends[0]);
# The others - multibackend if $#backends > 0 (number of the last array member)
my @altbackends=@backends[ 1 .. $#backends ];
my $alt = get_wod_alternateloc(\@altbackends,"PG");

#
# First we need to remove from the workshops table now missing WKSHP deleted in git
# Get full DB with keys being the name
my $hashref = $dbh->selectall_hashref("SELECT * FROM workshops", "notebook") || die "Unable to selectall_hashref from DB $DBI::errstr";
foreach my $w (sort(keys %$hashref)) {
	#print Dumper($hashref->{$w})."\n";
	# If it doesn't exist in git
	if (! exists($h->{$w})) {
		print "We need to delete $w from the DB as non existant in git\n";
		my $sth = $dbh->prepare("DELETE * FROM workshops WHERE id = '$hashref->{$w}->{id}'") || die "Unable to prepare deletion $DBI::errstr";
          	$sth->execute() || die "Can't execute statement: $DBI::errstr";;
	}
}

# Parameters not mentionned in wod.yml
my @kptcolumns = qw(
	notebook
	sessionId
	sessionType
	location
	preRequisite
	alternateLocation
	createdAt
	updatedAt
	);

# These params may be omitted in the wod.yml:
# monoappliance, multiappliance 
# but have been forced in Docker101
my @updcolumns = qw(
	name
	description
	active
	capacity
	priority
	range
	reset
	ldap
	avatar
	role
	replayLink
	compile
	varpass
	replayId
	workshopImg
	badgeImg
	monoappliance
	multiappliance
	beta
	category
	duration
	presenter
	);

# Merge the 2 arrays
# https://www.perlmonks.org/?node_id=208210
my %seen;
my @allcolumns = grep { not $seen{$_}++ } (@kptcolumns, @updcolumns);

# Check that the table structure has not changed
$hashref = $dbh->selectall_hashref("SELECT * FROM workshops", "notebook") || die "Unable to selectall_hashref from DB $DBI::errstr";
# Count how many we get on both sides for values in the hashes
print "Hashref: ".Dumper(%$hashref)."\n";

# Compute the field names from wod.yml files
my $hv;
for my $k (keys %$h) {
	for my $v (keys %{$h->{$k}}) {
		$hv->{$v} = 1;
	}
}
my $gitnb = keys(%$hv);
print "Found $gitnb field values in all wod.yml files\n";
#print "Values:".Dumper(keys(%$hv))."\n";
if ($gitnb != scalar @updcolumns) {
	print "Found $gitnb fields in wod.yml files not corresponfing to ".scalar @updcolumns." fields in array updcolumns\n";
	print "Please fix the wod-update-db.pl program as DB schema changed\n";
	exit(-1);
} else {
	print "and the same in array updcolumns\n";
}
# Adds to git missing params in count which should not be touched during updates but initialized when inserting a new wod as in kptcolumns upper
# And adds one for id not mentioned as managed dynamically
$gitnb += keys(@kptcolumns) + 1;

my $sth = $dbh->prepare("SELECT * FROM workshops WHERE 1=0");
$sth->execute();
my $dbsize = 0;
for my $i (@{$sth->{NAME}}) {
        $dbsize++;
}
print "Found ".$dbsize." columns in the DB.\n";

if ($dbsize != $gitnb) {
	print "Found $dbsize columns in DB but $gitnb in wod.yml files\n";
	print "Please fix the wod-update-db.pl program as DB schema changed\n";
	exit(-1);
} else {
	print "and the same in array allcolumns\n";
}

# Then we need to update all fields managed in git in the workshops table
foreach my $w (sort(keys %$h)) {
	#print "Handling ".Dumper($h->{$w}->{$notebook})."\n";
	print "Handling $w\n";

	my $setrq = "";
	my $sth;
	my $rq = "";
	# If it doesn't exist in DB add it
	if (! exists($hashref->{$w})) {
		# First adds values managed outside of git
		$setrq = "VALUES ('$w',NULL,'Workshops-on-Demand','$backfirst[0]','','{$alt}',CURRENT_DATE,CURRENT_DATE,";
		# Then add values managed in git for the remaining columns
		foreach my $f (@updcolumns) {
			if (! exists($h->{$w}->{$f})) {
				$setrq .= "NULL,";
			} else {
				$setrq .= filter_wod_db_field($f, $h->{$w}->{$f},"PG").",";
			}
		}
		# Remove last , 
		$setrq =~ s/,$//;
		my $columns = "";
		foreach my $f (@allcolumns) {
			$columns .= "\"$f\",";
		}
		$columns =~ s/,$//;

		$rq = << "SQL";
INSERT INTO workshops ($columns)
$setrq
);
SQL
		$sth = $dbh->prepare($rq) || die "Unable to prepare insertion $DBI::errstr";
	} else {
		$setrq = "SET ";
		# Just update the values managed in git
		foreach my $f (sort keys %{$h->{$w}}) {
			# Do not manage capacity
			next if ($f eq "capacity");
			my $res = filter_wod_db_field($f, $h->{$w}->{$f},"PG");
			$setrq .= "\"$f\" = $res, ";
		}
		# Remove last , 
		$setrq =~ s/, $//;

		$rq = << "SQL";
UPDATE workshops 
$setrq
WHERE notebook = '$w';
SQL
		$sth = $dbh->prepare($rq) || die "Unable to prepare update $DBI::errstr";
	}
	print "Modification of DB with: $rq\n";
	$sth->execute() || die "Can't execute statement: $DBI::errstr";;
}
