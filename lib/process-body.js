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

  method = method || 'simple'

  if( method !== 'simple' && method !== 'relaxed' ) {
    throw new Error( 'Canonicalization method "' + method + '" not supported' )
  }

  // @see https://tools.ietf.org/html/rfc6376#section-3.4.3
  if( method === 'simple' ) {
    return message.toString( 'ascii' )
      .replace( /(\r\n)+$/m, '' ) + '\r\n'
  }

  // @see https://tools.ietf.org/html/rfc6376#section-3.4.4
  if( method === 'relaxed' ) {
    return message.toString( 'ascii' )
      // Ignore all whitespace at the end of lines.
      .replace( /[\x20\x09]+(?=\r\n)/g, '' )
      // Reduce all sequences of WSP within a line to a single SP
      .replace( /[\x20\x09]+/g, ' ' )
      // Ignore all empty lines at the end of the message body.
      .replace( /(\r\n)+$/, '\r\n' )
  }

}

module.exports = processBody
