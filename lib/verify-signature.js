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
  var result = {
    status: DKIM.NONE,
    error: null,
    signature: null,
    key: null
  }

  try {
    if( !/^(DKIM-Signature|X-Google-DKIM-Signature)/i.test( headers[0] ) )
      throw new Error( 'Missing DKIM-Signature' )
    signature = result.signature = DKIM.Signature.parse( headers[0].slice( headers[0].indexOf(':') ) )
  } catch( e ) {
    result.error = new Error( 'Signature syntax error' )
    result.error.code = result.status = DKIM.PERMFAIL
    return callback( result.error, result )
  }

  DKIM.getKey( signature.domain, signature.selector, ( error, key ) => {

    if( error != null ) {
      result.error = error
      result.status = error.code
      return callback( error, result )
    }

    result.key = key

    // TODO: Canonical method order – which one is the body?
    // TODO: Body hashes don't verify – bug in canonicalization?
    var message = DKIM.processBody( body.slice( 0, signature.length ), signature.canonical.split( '/' ).pop() )
    var digest = crypto.createHash( signature.algorithm.split( '-' ).pop() )
      .update( message )
      .digest()

    if( digest.compare( signature.hash ) !== 0 ) {
      result.error = new Error( 'Body hash did not verify' )
      result.error.code = result.status = DKIM.PERMFAIL
      return callback( error, result )
    }

    // TODO: Process header
    var verified = crypto.createVerify( signature.algorithm )
      .update( processedHeader )
      .verify( key.key, signature.signature )

    if( verified !== true ) {
      result.error = new Error( 'Signature did not verify' )
      result.error.code = result.status = DKIM.PERMFAIL
      return callback( error, result )
    }

    callback( null, result )

  })

}

module.exports = verifySignature
