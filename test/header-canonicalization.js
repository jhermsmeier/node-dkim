var assert = require( 'assert' )
var DKIM = require( '..' )

describe( 'DKIM', function() {

  describe( '.processHeader()', function() {

    context( '"relaxed" method', function() {

      it( 'normalizes RFC 6376 Example 1', function() {
        var headers = [ 'A: X', 'B : Y\t\r\n\tZ  ', '' ]
        var result = DKIM.processHeader( headers, 'relaxed' )
        assert.equal( result, 'a:X\r\nb:Y Z\r\n' )
      })

    })

    context( '"simple" method', function() {

      it( 'normalizes RFC 6376 Example 2', function() {
        var headers = [ 'A: X', 'B : Y\t\r\n\tZ  ', '' ]
        var result = DKIM.processHeader( headers, 'simple' )
        assert.equal( result, headers.join( '\r\n' ) )
      })

    })

  })

})
