/** @type {Object} */
var DKIM = module.exports

/** @type {Number} */
DKIM.NONE = 0
/** @type {Number} */
DKIM.OK = 1 << 0
/** @type {Number} */
DKIM.TEMPFAIL = 1 << 1
/** @type {Number} */
DKIM.PERMFAIL = 1 << 2

/**
 * DKIM Signature
 * @constructor
 * @see [dkim-signature](https://github.com/jhermsmeier/node-dkim-signature)
 */
DKIM.Signature = require( 'dkim-signature' )

/**
 * DKIM Key
 * @constructor
 * @see [dkim-key](https://github.com/jhermsmeier/node-dkim-key)
 */
DKIM.Key = require( 'dkim-key' )
