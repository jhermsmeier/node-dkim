var assert = require( 'assert' )
var fs = require( 'fs' )
var path = require( 'path' )
var DKIM = require( '..' )

describe('DKIM', function () {

  describe('.verify()', function () {

    context('When provided Gmail raw message', function () {

      it('returns an object with verified set to true', function (done) {

        var message = fs.readFileSync( path.join( __dirname, 'data', 'gmail-raw.txt' ) )

        DKIM.verify( message, function( error, res ) {
          assert.ifError( error )
          assert.ok( res && res.length > 0 )
          assert.ok( res.every( function( record ) {
            return record.verified
          }))
          done( error )
        })

      })

    })

    context( 'email contains no signatures', function() {

      it( 'does not hang', function( done ) {

        var message = fs.readFileSync( path.join( __dirname, 'data', 'no-signatures.txt' ) )

        DKIM.verify( message, function( error, res ) {
          assert.ifError( error )
          assert.equal( res.length, 0 )
          done( error )
        })

      })

    })

  })

  describe('.verify.filterSignatureHeaders()', function () {

    context('When Gmail raw message has multiple signatures', function () {

      it('excludes extra signature headers', function () {

        var headers = require('./data/verify-headers')
        var signatureHeader = require('./data/verify-signature-header')
        var otherSignatureHeader = require('./data/verify-other-signature-header')

        var result = DKIM.verify.filterSignatureHeaders(headers, signatureHeader)

        assert.ok(headers.indexOf(signatureHeader) > -1)
        assert.ok(headers.indexOf(otherSignatureHeader) > -1)
        assert.ok(result.indexOf(signatureHeader) > -1)
        assert.ok(!result.indexOf(otherSignatureHeader) > -1)

      })

    })

  })

})
