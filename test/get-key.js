var assert = require( 'assert' )
var DKIM = require( '..' )

describe( 'DKIM', function() {

  describe( '.getKey()', function() {

    context( 'when key record exists', function() {

      it( 'parse & return the key', function( done ) {
        DKIM.getKey( 'gmail.com', '20120113', function( error, key ) {
          assert.ifError( error )
          assert.equal( key instanceof DKIM.Key, true )
          assert.equal( key.type, 'rsa' )
          done()
        })
      })

    })

    context( 'when key record does not exist', function() {

      it( 'PERMFAIL if domain has no record', function( done ) {
        DKIM.getKey( 'aa', function( error, key ) {
          assert.equal( key, null )
          assert.equal( error instanceof Error, true )
          assert.equal( error.code, DKIM.PERMFAIL )
          done()
        })
      })

      it( 'PERMFAIL if TXT record is not a valid key', function( done ) {
        DKIM.getKey( 'gmail.com', function( error, key ) {
          
          assert.ok( key, 'key instance present' )
          assert.ok( key.key == null, 'key is null' )
          assert.equal( error instanceof Error, true, 'error is an instance of Error Class' )
          assert.equal( error.code, DKIM.PERMFAIL, 'Error code is PERMFAIL' )
          done()
        })
      })

      it( 'TEMPFAIL if query fails to respond' )

    })

  })

})
