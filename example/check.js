var DKIM = require( '..' )
var fs = require( 'fs' )

var filename = process.argv.slice( 2 ).shift()
if( !filename ) {
  console.error( 'Usage: node example/check.js <filename>' )
  process.exit( 1 )
}

var message = fs.readFileSync( filename )

DKIM.verify( message, function( error, results ) {
  console.log( error, results )
})
