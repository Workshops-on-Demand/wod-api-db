#!/usr/bin/perl -w
#
# Functions to help build the workshop seeder file to create the correct Workshops during install time
# Need to be called after wod.sh has been sourced
# Done automatically at intall time

use strict;
use Data::Dumper;
use YAML::Tiny;
use open ":std", ":encoding(UTF-8)"; # to avoid wide char in print msgs

sub get_wod_metadata {

my $h = {};

# Analyses metadata stored within Workshops both public and private
opendir(DIR,$ENV{'WODNOBO'}) || die "Unable to open directory $ENV{'WODNOBO'}";
while (my $wkshp = readdir(DIR)) {
	next if ($wkshp =~ /^\./);
	my $meta = "$ENV{'WODNOBO'}/$wkshp/wod.yml";
	if (-f "$meta") {
		# Open the config
		my $yaml = YAML::Tiny->read("$meta") || die "Unable to open $meta";
		# Get a reference to the first document
		$h->{$wkshp} = $yaml->[0];
	}
}
closedir(DIR);
print "Data gathered from YAML files wod.yml under $ENV{'WODNOBO'}\n";

if (-d $ENV{'WODPRIVNOBO'}) {
	opendir(PRIVDIR,$ENV{'WODPRIVNOBO'}) || die "Unable to open directory $ENV{'WODPRIVNOBO'}";
	while (my $wkshp = readdir(PRIVDIR)) {
		next if ($wkshp =~ /^\./);
		my $meta = "$ENV{'WODPRIVNOBO'}/$wkshp/wod.yml";
		if (-f "$meta") {
			# Open the config
			my $yaml = YAML::Tiny->read("$meta") || die "Unable to open $meta";
			# Get a reference to the first document
			$h->{$wkshp} = $yaml->[0];
		}
	}
	closedir(PRIVDIR);
}
print "Data gathered from YAML files wod.yml under $ENV{'WODPRIVNOBO'}\n";

#print Dumper($h);
return($h);
}

sub get_wod_alternateloc {

my $altbackends = shift;
my $type = shift;
# Type is PG for postgresql INSERT commands
# Type is SQ for sequelize injections at install
#
my $alt="";
foreach my $a (@{$altbackends}) {
	my @b = split(/:/,$a);
	$alt=$alt."'$b[0]'," if (($b[0] !~ /'/) && ($type eq "SQ"));
	$alt=$alt."\"$b[0]\"," if (($b[0] !~ /'/) && ($type eq "PG"));
}
# remove last , just added
$alt =~ s/,$//;
# Handle mono-backend here no alternate is available
# npx migration needs a field, even ''
$alt = "''" if (($alt =~ /^$/) && ($type eq "SQ"));
$alt = "\"\"" if (($alt =~ /^$/) && ($type eq "PG"));
return($alt);
}

sub filter_wod_db_field {

my $f = shift;
my $v = shift;
my $type = shift;
# Type is PG for postgresql UPDATE or INSERT commands
# Type is SQ for sequelize injections at install
#

if ($v =~ /\[/) {
	if ($type eq "PG") {
		# For PG change array content
		$v =~ s/([0-9]+)-([0-9]+)/$1,$2/;
		# For PG change array [] into {}
		$v =~ s/\[(.*)\]/{$1}/g;
		$v =~ s/'/"/g if ($f eq "category");
	}
	if ($type eq "SQ") {
		# No quote for sequelize arrays
		return($v);
	}
} else {
	if (($v =~ /'/) && ($type eq "SQ")) {
		return('"'.$v.'"');
	}
	if (($v =~ /'/) && ($type eq "PG")) {
		# PG needs simple quote doubled and no double quotes around fields
		$v =~ s/'/''/g;
		$v =~ s/"//g;
	}
}
# No filter needed on boolean or integer or array
return("'".$v."'");
}
	
1;
