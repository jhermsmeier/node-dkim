var assert = require('assert')
var raw = require('./data/raw-message')
var DKIM = require('..')

describe('DKIM', function () {

  describe('processSignature()', function () {
    context('When Gmail raw message has multiple signatures', function () {

      let processSignature = DKIM.verify.processSignature

      it('excludes extra signature headers', function () {
        let headers = require('./data/verify-headers')
        let signatureHeader = require('./data/verify-signature-header')
        let otherSignatureHeader = require('./data/verify-other-signature-header')

        let result = processSignature(headers, signatureHeader)

        assert.ok(headers.includes(signatureHeader))
        assert.ok(headers.includes(otherSignatureHeader))
        assert.ok(result.includes(signatureHeader))
        assert.ok(!result.includes(otherSignatureHeader))
      })
    })

  })


  describe('Acceptence test - verify()', function () {

    context('When provided Gmail raw message', function () {

      it('returns an object with verified set to true', function (done) {

        // "raw" is a string, so we have to convert new lines to "text-file's new lines"
        let message = new Buffer(raw.replace(/\n/g, '\r\n'))

        DKIM.verify(message, function (e, res) {
          assert.ok(res.every(record => record.verified))
          done()
        })
      })

    })
  })
})
