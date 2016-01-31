var DKIM = module.exports

DKIM.Signature = require( 'dkim-signature' )
DKIM.Key = require( 'dkim-key' )

DKIM.util = require( './util' )
