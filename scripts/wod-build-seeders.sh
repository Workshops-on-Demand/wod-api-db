#!/bin/bash
#
# Wrapper for wod-build-seeders.pl
#
source /etc/wod.sh
source $WODINSDIR/install-functions.sh
if [ -f "$WODPRIVINV" ]; then
	PRIVINV="-i $WODPRIVINV"
else
	PRIVINV=""
fi
# Only valid for wod-apidb anyway
export USERMAX=`ansible-inventory -i $WODANSIBLEDIR/inventory $PRIVINV --host $WODAPIDBFQDN --playbook-dir $WODINSANSDIR --playbook-dir $WODANSIBLEDIR --playbook-dir $WODANSIBLEPRIVDIR | jq ".USERMAX"`
get_wodapidb_userpwd
$WODSCRIPTDIR/wod-build-seeders.pl
