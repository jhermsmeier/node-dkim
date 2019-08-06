var assert = require( 'assert' )
var DKIM = require( '..' )

describe( 'DKIM', function() {

  describe( '.getKey()', function() {

    context( 'when key record exists', function() {

      specify( 'parse & return the key', function( done ) {
        DKIM.getKey( 'gmail.com', '20120113', function( error, key ) {
          assert.ok( key instanceof DKIM.Key, 'Key instance not present' )
          assert.equal( key.type, 'rsa', 'Invalid key type' )
          done( error )
        })
      })

    })

    context( 'when key record does not exist', function() {

      specify( 'PERMFAIL if domain has no record', function( done ) {
        DKIM.getKey( 'aa', function( error, key ) {
          assert.equal( key, null )
          assert.ok( error instanceof Error, 'Missing expected error' )
          assert.equal( error.code, DKIM.PERMFAIL, 'Error code is not PERMFAIL' )
          done()
        })
      })

      specify( 'PERMFAIL if TXT record is not a valid key', function( done ) {
        DKIM.getKey( 'gmail.com', function( error, key ) {
          assert.ok( key instanceof DKIM.Key, 'Key instance not present' )
          assert.ok( key.key == null, 'Key is not null' )
          assert.ok( error instanceof Error, 'Error value not an instance of Error' )
          assert.equal( error.code, DKIM.PERMFAIL, 'Error code is not PERMFAIL' )
          done()
        })
      })

      specify( 'TEMPFAIL if query fails to respond' )

    })

  })

})
