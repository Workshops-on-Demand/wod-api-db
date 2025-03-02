#!/bin/bash
#
# Wrapper for wod-build-seeders.pl
#
source /etc/wod.sh
source $WODSCRIPTPRIVDIR/wod-private.sh
source $WODINSDIR/install-functions.sh
#
$WODSCRIPTDIR/wod-build-seeders.pl
