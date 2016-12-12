var DKIM = module.exports

DKIM.NONE = 0
DKIM.OK = 1 << 0
DKIM.TEMPFAIL = 1 << 1
DKIM.PERMFAIL = 1 << 2

DKIM.Signature = require( 'dkim-signature' )
DKIM.Key = require( 'dkim-key' )
