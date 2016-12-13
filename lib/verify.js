var DKIM = require( './dkim' )

/**
 * Verify a message's signatures
 * @memberOf DKIM
 * @param {Buffer} message
 * @param {Function} callback
 * @throws {Error} If input is not a buffer
 */
function verify( message, callback ) {

  if( !Buffer.isBuffer( message ) )
    throw new Error( 'Message must be a Buffer' )

  var boundary = message.indexOf( new Buffer( '\r\n\r\n' ) )
  if( boundary === -1 ) {
    return callback( new Error( 'No header boundary found' ) )
  }

  var header = message.toString( 'ascii', 0, boundary )
  var body = message.slice( boundary + 4 )

  var results = []
  var signatures = []

  header.split( /\r\n(?=[^\s]|$)/g ).forEach( function( header, i, headers ) {
    if( /^(DKIM-Signature|X-Google-DKIM-Signature)/i.test( header ) ) {
      signatures.push( headers.slice( i ) )
    }
  })

  signatures.forEach( function( headers ) {
    DKIM.verifySignature( body, headers, function( error, result ) {
      results.push( result )
      if( results.length === signatures.length ) {
        callback( null, results )
      }
    })
  })

}

module.exports = verify
