var crypto = require( 'crypto' )
var DKIM = require( './dkim' )

/**
 * Verify a message signature
 * @memberOf DKIM
 * @param {Buffer} body
 * @param {Array} headers
 * @param {Function} callback
 */
function verifySignature( body, headers, callback ) {

  var signature = null
  // NOTE: result.status counts only if verified is not true
  var result = {
    verified: false,
    status: DKIM.NONE,
    error: null,
    signature: null,
    key: null
  }

  try {
    if( !/^(DKIM-Signature|X-Google-DKIM-Signature)/i.test( headers[0] ) ) {
      throw new Error( 'Missing DKIM-Signature' )
    }
    signature = result.signature = DKIM.Signature.parse( headers[0].slice( headers[0].indexOf(':') + 1 ) )
  } catch( err ) {
    result.error = err
    result.error.code = result.status = DKIM.PERMFAIL
    return callback( result.error, result )
  }

  // Truncate body to defined length
  body = signature.length != null ?
    body.slice( 0, signature.length ) :
    body

  DKIM.getKey( signature.domain, signature.selector, ( error, key ) => {

    if( error != null ) {
      result.error = error
      result.status = error.code
      return callback( error, result )
    }

    result.key = key

    var message = DKIM.processBody( body, signature.canonical.split( '/' ).pop() )
    var processedHeader = DKIM.processHeader( headers, signature.headers, signature.canonical.split( '/' ).shift() )

    var digest = crypto.createHash( signature.algorithm.split( '-' ).pop() )
      .update( message )
      .digest()

    if( digest.compare( signature.hash ) !== 0 ) {

      result.error = new Error( 'Body hash did not verify' )
      result.error.code = result.status = DKIM.PERMFAIL
      return callback( error, result )
    }

    var verified = false
    var pubKey = '-----BEGIN PUBLIC KEY-----\n' +
      key.key.toString( 'base64' ) +
      '\n-----END PUBLIC KEY-----'

    try {
      verified = crypto.createVerify( signature.algorithm.toUpperCase() )
        .update( processedHeader )
        .verify( pubKey, signature.signature )
      result.verified = verified
      result.status = result.verified ? DKIM.OK : DKIM.PERMFAIL
    } catch( e ) {
      result.error = e
      result.error.code = result.status = DKIM.NONE
      return callback( error, result )
    }

    if( verified !== true ) {
      result.error = new Error( 'Signature did not verify' )
      result.error.code = result.status = DKIM.PERMFAIL
      return callback( error, result )
    }

    callback( null, result )

  })

}

module.exports = verifySignature
