/**
 * Canonicalize the message header according to
 * methods defined in RFC[6376]
 * @memberOf DKIM
 * @param {Array<String>} headers - Each header is formatted as `<field>: <value>`
 * @param {Array} signHeaders
 * @param {String} method - (simple|relaxed)
 * @return {String}
 * @throws {Error} If canonicalization method is unsupported
 * @example
 * DKIM.processHeader( [ 'A: X', 'B : Y\t\r\n\tZ  '], [ 'A' ], 'relaxed' )
 */
function processHeader( headers, signHeaders, method ) {

  if( typeof signHeaders === 'string' ) {
    method = signHeaders
    signHeaders = null
  }

  method = method || 'simple'

  if( method !== 'simple' && method !== 'relaxed' ) {
    throw new Error( 'Canonicalization method "' + method + '" not supported' )
  }

  if( signHeaders != null ) {

    // Clone this array so that newely added headers don't show up outsite this "processHeader" function
    // See https://tools.ietf.org/html/rfc5322#section-3.6
    signHeaders = signHeaders.slice()
    signHeaders.push( 'DKIM-Signature' )
    signHeaders.push( 'X-Google-DKIM-Signature' )

    signHeaders = signHeaders.map( function( header ) {
      return header.toLowerCase()
    })

    // Remove duplicates
    // signHeaders = signHeaders.reduce((ac, val) => [...ac, ...ac.includes(val) ? [] : [val]], [])
    signHeaders = signHeaders.reduce( function( ac, val ) {
      if( ac.indexOf( val ) < 0 ) {
        ac.push( val )
      }
      return ac;
    }, [])

    // Sort elements of headers array using the "signHeaders" order
    var indexedHeaders = headers.map( function( header ) {
      var key = header.slice( 0, header.indexOf( ':' ) ).trim().toLowerCase()
      var idx = signHeaders.indexOf( key )
      return { idx, header }
    })

    headers = indexedHeaders
      .filter( function( h ) { return h.idx > -1 })
      .sort( function( h1, h2 ) { return h1.idx - h2.idx })
      .map( function( h ) { return h.header })

    // headers = headers.filter( function( header ) {
    //   var key = header.slice( 0, header.indexOf( ':' ) ).trim().toLowerCase()
    //   return signHeaders.indexOf( key ) !== -1
    // })
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
      // Devare all WSP characters at the end of each unfolded header field
      value = value.replace( /[\x20\x09]+$/g, '' )

      // Remove signature value for "dkim-signature" header
      if( /^(dkim-signature|x-google-dkim-signature)/i.test( key ) ) {
        value = value.replace( / b=(.*)$/, ' b=' )
      }

      if( key === 'x-google-dkim-signature' ) {
        key = key.replace( 'x-google-dkim-signature', 'dkim-signature' )
      }

      // Remove any WSP characters remaining before and after the colon
      return ( key + value ).replace( /[\x20\x09]*[:][\x20\x09]*/, ':' )

    }).join( '\r\n' )
  }

}

module.exports = processHeader
