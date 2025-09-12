#!/bin/bash
#
# Wrapper for wod-update-db.pl
#
# Import required env var and functions.
source /etc/wod.sh
source $WODSCRIPTPRIVDIR/wod-private.sh
source $WODINSDIR/install-functions.sh

$WODSCRIPTDIR/wod-update-db.pl
