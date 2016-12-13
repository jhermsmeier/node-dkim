/**
 * Canonicalize the message body according to
 * methods defined in RFC[XXXX]
 * @memberOf DKIM
 * @param {Buffer|String} message
 * @param {String} method - (simple|relaxed)
 * @throws {Error} If canonicalization method is unsupported
 * @return {String}
 */
function processBody( message, method ) {

  if( method !== 'simple' && method !== 'relaxed' ) {
    throw new Error( 'Canonicalization method "' + method + '" not supported' )
  }

  if( method === 'simple' ) {
    return message.toString( 'ascii' )
      .replace( /(?:\r\n){1,}$/m, '' ) + '\r\n'
  }

  if( method === 'relaxed' ) {
    return message.toString( 'ascii' )
      .replace( /^\s+$/g, ' ' )
      .replace( /\r\n$/, '' ) + '\r\n'
  }

}

module.exports = processBody
