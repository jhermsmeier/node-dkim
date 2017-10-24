'use strict'
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

      /**
       * The DKIM-Signature header field being created or verified is always included in the signature calculation
       * source: https://tools.ietf.org/html/rfc6376#section-3.5
       */
      it( 'normalizes RFC 6376 Example 2 - Including DKIM-Signature header', function() {
        var headers = [
          'From: X',
          'To : Y  ',
          'Subject : Y\t\r\n\tZ  ',
          'Date : Sun, 22 Oct 2017 10:43:49 +0000  ',
          `DKIM-Signature: v=1; a=rsa-sha256; d=example.net; s=brisbane; c=simple; q=dns/txt; i=@eng.example.net; t=1117574938; x=1118006938; h=from:to:subject:date; z=From:foo@eng.example.net|To:joe@example.com|Subject:demo=20run|Date:July=205,=202005=203:44:08=20PM=20-0700; bh=MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=; b=dzdVyOfAKCdLXdJOc9G2q8LoXSlEniSbav+yuU4zGeeruD00lszZVoG4ZHRNiYzR`
        ]
        var sigHeaders = [
          'from',
          'to',
          'subject',
          'date',
        ]
        var result = DKIM.processHeader( headers, sigHeaders, 'relaxed' )
        assert.equal( result, 'from:X\r\nto:Y\r\nsubject:Y Z\r\ndate:Sun, 22 Oct 2017 10:43:49 +0000\r\ndkim-signature:v=1; a=rsa-sha256; d=example.net; s=brisbane; c=simple; q=dns/txt; i=@eng.example.net; t=1117574938; x=1118006938; h=from:to:subject:date; z=From:foo@eng.example.net|To:joe@example.com|Subject:demo=20run|Date:July=205,=202005=203:44:08=20PM=20-0700; bh=MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=; b=' )
      })

      it('Preserves the order of signing headers', function() {
        var headers = [
          'From: X',
          'To : Y  ',
          'Date : Sun, 22 Oct 2017 10:43:49 +0000  ',
          'Subject : Y\t\r\n\tZ  ',
          `DKIM-Signature: v=1; a=rsa-sha256; d=example.net; s=brisbane; c=simple; q=dns/txt; i=@eng.example.net; t=1117574938; x=1118006938; h=from:to:subject:date; z=From:foo@eng.example.net|To:joe@example.com|Subject:demo=20run|Date:July=205,=202005=203:44:08=20PM=20-0700; bh=MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=; b=dzdVyOfAKCdLXdJOc9G2q8LoXSlEniSbav+yuU4zGeeruD00lszZVoG4ZHRNiYzR`
        ]
        var sigHeaders = [
          'from',
          'to',
          'subject',
          'date',
        ]
        var result = DKIM.processHeader( headers, sigHeaders, 'relaxed' )
        assert.equal( result, 'from:X\r\nto:Y\r\nsubject:Y Z\r\ndate:Sun, 22 Oct 2017 10:43:49 +0000\r\ndkim-signature:v=1; a=rsa-sha256; d=example.net; s=brisbane; c=simple; q=dns/txt; i=@eng.example.net; t=1117574938; x=1118006938; h=from:to:subject:date; z=From:foo@eng.example.net|To:joe@example.com|Subject:demo=20run|Date:July=205,=202005=203:44:08=20PM=20-0700; bh=MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=; b=' )
      })

      it('turns header keys into lowercased values', function() {        
        var headers = [
          'From: X',
          'To : Y  ',
          'Date : Sun, 22 Oct 2017 10:43:49 +0000  ',
          'Subject : Y\t\r\n\tZ  ',
          `DKIM-Signature: v=1; a=rsa-sha256; d=example.net; s=brisbane; c=simple; q=dns/txt; i=@eng.example.net; t=1117574938; x=1118006938; h=From : To : Subject : Date; z=From:foo@eng.example.net|To:joe@example.com|Subject:demo=20run|Date:July=205,=202005=203:44:08=20PM=20-0700; bh=MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=; b=dzdVyOfAKCdLXdJOc9G2q8LoXSlEniSbav+yuU4zGeeruD00lszZVoG4ZHRNiYzR`
        ]
        var sigHeaders = [
          'From',
          'To',
          'Subject',
          'Date',
        ]
        var result = DKIM.processHeader( headers, sigHeaders, 'relaxed' )
        assert.equal( result, 'from:X\r\nto:Y\r\nsubject:Y Z\r\ndate:Sun, 22 Oct 2017 10:43:49 +0000\r\ndkim-signature:v=1; a=rsa-sha256; d=example.net; s=brisbane; c=simple; q=dns/txt; i=@eng.example.net; t=1117574938; x=1118006938; h=From : To : Subject : Date; z=From:foo@eng.example.net|To:joe@example.com|Subject:demo=20run|Date:July=205,=202005=203:44:08=20PM=20-0700; bh=MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=; b=' )
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
