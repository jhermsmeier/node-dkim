/**
 * Canonicalize the message header according to
 * methods defined in RFC[XXXX]
 * @memberOf DKIM
 * @param {Buffer|String} message
 * @param {String} method - (simple|relaxed)
 * @return {String}
 * @throws {Error} If canonicalization method is unsupported
 */
function processHeader( message, method ) {

  if( method !== 'simple' && method !== 'relaxed' ) {
    throw new Error( 'Canonicalization method "' + method + '" not supported' )
  }

  // TODO

}

module.exports = processHeader
