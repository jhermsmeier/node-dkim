var DKIM = require( '..' )
var assert = require( 'assert' )
var fs = require( 'fs' )

suite( 'DKIM', function() {
  
  suite( 'canonicalizeHeader()', function() {
    
    var header
    
    suiteSetup( function() {
      header = fs.readFileSync( __dirname + '/data/gmail.headers' )
    })
    
    test( 'undefined', function() {
      DKIM.util.canonicalizeHeader( header )
    })
    
    test( '"simple"', function() {
      DKIM.util.canonicalizeHeader( header, 'simple' )
    })
    
    test( '"relaxed"', function() {
      DKIM.util.canonicalizeHeader( header, 'relaxed' )
    })
    
    test( '"simple/relaxed"', function() {
      DKIM.util.canonicalizeHeader( header, 'simple/relaxed' )
    })
    
    test( '"relaxed/relaxed"', function() {
      DKIM.util.canonicalizeHeader( header, 'relaxed/relaxed' )
    })
    
    test( '"simple/simple"', function() {
      DKIM.util.canonicalizeHeader( header, 'simple/simple' )
    })
    
  })
  
})
