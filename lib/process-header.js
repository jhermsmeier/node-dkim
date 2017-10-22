/**
 * Canonicalize the message header according to
 * methods defined in RFC[XXXX]
 * @memberOf DKIM
 * @param {Buffer|String} header
 * @param {Array} signHeaders
 * @param {String} method - (simple|relaxed)
 * @return {String}
 * @throws {Error} If canonicalization method is unsupported
 */
function processHeader( headers, signHeaders, method ) {

  if( typeof signHeaders === 'string' ) {
    method = signHeaders
    signHeaders = null
  }

  method = method || 'simple'

  if( method !== 'simple' && method !== 'relaxed' ) {
    throw new Error( 'Canonicalization method "' + method + '" not supported' )
  }

  if( signHeaders != null ) {

    // https://tools.ietf.org/html/rfc5322#section-3.6
    signHeaders = signHeaders.slice() // clone this array so that newely added headers don't show up outsite this "processHeader" function
    signHeaders.push('DKIM-Signature')
    signHeaders.push('X-Google-DKIM-Signature') 

    signHeaders = signHeaders.map( function( header ) {
      return header.toLowerCase()
    })
    headers = headers.filter( function( header ) {
      var key = header.slice( 0, header.indexOf( ':' ) ).trim().toLowerCase()
      return signHeaders.indexOf( key ) !== -1
    })
  }

  if( method === 'simple' ) {
    return headers.join( '\r\n' )
  }

  // TODO: Something's not right here...
  // relaxed signatures still don't verify
  if( method === 'relaxed' ) {
    return headers.map( function( line ) {

      var lines = {}
      var colon = line.indexOf( ':' )
      var value = line.slice( colon )

      // Convert all header field names to lowercase
      var key = line.slice( 0, colon ).toLowerCase()

      // Unfold all header field continuation lines
      value = value.replace( /\r\n(?=[\x20\x09])/g, '' )
      // Convert all sequences of one or more WSP characters to a single SP
      value = value.replace( /[\x20\x09]+/g, ' ' )
      // Delete all WSP characters at the end of each unfolded header field
      value = value.replace( /[\x20\x09]+$/g, '' )

      // Delete signature value for "dkim-signature" header
      if(key === 'dkim-signature')
        value = value.replace( / b=(.*)$/, ' b=' )

      // Delete any WSP characters remaining before and after the colon
      return ( key + value ).replace( /[\x20\x09]*[:][\x20\x09]*/, ':' )

    }).join( '\r\n' )
  }

}

module.exports = processHeader
