# DomainKeys Identified Mail (DKIM)
[![npm](http://img.shields.io/npm/v/dkim.svg?style=flat-square)](https://npmjs.com/package/dkim)
[![npm](http://img.shields.io/npm/l/dkim.svg?style=flat-square)](https://npmjs.com/package/dkim)
[![npm downloads](http://img.shields.io/npm/dm/dkim.svg?style=flat-square)](https://npmjs.com/package/dkim)
[![build status](http://img.shields.io/travis/jhermsmeier/node-dkim.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-dkim)

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save dkim
```

## API

<a name="DKIM"></a>

### DKIM : <code>Object</code>
**Kind**: global variable  

* [DKIM](#DKIM) : <code>Object</code>
    * [.Signature](#DKIM.Signature)
        * [new DKIM.Signature()](#new_DKIM.Signature_new)
    * [.Key](#DKIM.Key)
        * [new DKIM.Key()](#new_DKIM.Key_new)
    * [.NONE](#DKIM.NONE) : <code>String</code>
    * [.OK](#DKIM.OK) : <code>String</code>
    * [.TEMPFAIL](#DKIM.TEMPFAIL) : <code>String</code>
    * [.PERMFAIL](#DKIM.PERMFAIL) : <code>String</code>
    * [.getKey(domain, [selector], callback)](#DKIM.getKey)
    * [.processBody(message, method)](#DKIM.processBody) ⇒ <code>String</code>
    * [.processHeader(headers, signHeaders, method)](#DKIM.processHeader) ⇒ <code>String</code>
    * [.verifySignature(body, headers, callback)](#DKIM.verifySignature)
    * [.verify(message, callback)](#DKIM.verify)


-

<a name="DKIM.Signature"></a>

#### DKIM.Signature
**Kind**: static class of <code>[DKIM](#DKIM)</code>  
**See**: [dkim-signature](https://github.com/jhermsmeier/node-dkim-signature)  

-

<a name="new_DKIM.Signature_new"></a>

##### new DKIM.Signature()
DKIM Signature


-

<a name="DKIM.Key"></a>

#### DKIM.Key
**Kind**: static class of <code>[DKIM](#DKIM)</code>  
**See**: [dkim-key](https://github.com/jhermsmeier/node-dkim-key)  

-

<a name="new_DKIM.Key_new"></a>

##### new DKIM.Key()
DKIM Key


-

<a name="DKIM.NONE"></a>

#### DKIM.NONE : <code>String</code>
**Kind**: static property of <code>[DKIM](#DKIM)</code>  

-

<a name="DKIM.OK"></a>

#### DKIM.OK : <code>String</code>
**Kind**: static property of <code>[DKIM](#DKIM)</code>  

-

<a name="DKIM.TEMPFAIL"></a>

#### DKIM.TEMPFAIL : <code>String</code>
**Kind**: static property of <code>[DKIM](#DKIM)</code>  

-

<a name="DKIM.PERMFAIL"></a>

#### DKIM.PERMFAIL : <code>String</code>
**Kind**: static property of <code>[DKIM](#DKIM)</code>  

-

<a name="DKIM.getKey"></a>

#### DKIM.getKey(domain, [selector], callback)
Retrieve a domain key

**Kind**: static method of <code>[DKIM](#DKIM)</code>  
**Note**: Throw error if the public key is not a Buffer  
**Todo**

- [ ] DNS seems to FORMERR on unregistered / expired domains,
which maybe should be a TEMPFAIL (?)
- [ ] make this `public_key = dkim_find_key(q_val, d_val, s_val)`,
where `*_val` are the signature's attribute values

**Params**

- domain <code>String</code>
- [selector] <code>String</code>
- callback <code>function</code>


-

<a name="DKIM.processBody"></a>

#### DKIM.processBody(message, method) ⇒ <code>String</code>
Canonicalize the message body according to
methods defined in RFC[XXXX]

**Kind**: static method of <code>[DKIM](#DKIM)</code>  
**Throws**:

- <code>Error</code> If canonicalization method is unsupported

**Params**

- message <code>Buffer</code> | <code>String</code>
- method <code>String</code> - (simple|relaxed)


-

<a name="DKIM.processHeader"></a>

#### DKIM.processHeader(headers, signHeaders, method) ⇒ <code>String</code>
Canonicalize the message header according to
methods defined in RFC[6376]
example usage: `DKIM.processHeader([ 'A: X', 'B : Y\t\r\n\tZ  '], ['A'], 'relaxed')`

**Kind**: static method of <code>[DKIM](#DKIM)</code>  
**Throws**:

- <code>Error</code> If canonicalization method is unsupported

**Params**

- headers <code>Array.&lt;String&gt;</code> - Each header is formatted as `<field>: <value>`
- signHeaders <code>Array</code>
- method <code>String</code> - (simple|relaxed)


-

<a name="DKIM.verifySignature"></a>

#### DKIM.verifySignature(body, headers, callback)
Verify a message signature

**Kind**: static method of <code>[DKIM](#DKIM)</code>  
**Params**

- body <code>Buffer</code>
- headers <code>Array</code>
- callback <code>function</code>


-

<a name="DKIM.verify"></a>

#### DKIM.verify(message, callback)
Verify a message's signatures

**Kind**: static method of <code>[DKIM](#DKIM)</code>  
**Throws**:

- <code>Error</code> If input is not a buffer

**Params**

- message <code>Buffer</code>
- callback <code>function</code>


-

<a name="processSignature"></a>

### processSignature()
For messages that have multiple signatures,
We want add headers to each signature without including signature headers of other signatures

ex: 
Input
===== 1 =====
[ 'DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\r\n        d=fusemachines.com; s=google;\r\n        h=mime-version:from:date:message-id:subject:to;\r\n        bh=9w2H8ucfF1w3+Zqu9gpPcHgTU9GHPjw7E2HYHHlZEkw=;\r\n        b=iPc3RHh9oXL6+dvuPM0hYt1vdj6U4hN83BFxhumWsSXnFDFmbSG4OtXHPF823HoZAA\r\n         4MbFQu5VgfvAQ+FmnKyfON2WdJrAYicyslVXlcA6l0UKSGIH/0NHSqi/kX+4KEKaClY7\r\n         jZkXZZ8EIl5IUBdRRUWSsySFOtrQ/9IeAb6YM=',
  'X-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\r\n        d=1e100.net; s=20161025;\r\n        h=x-gm-message-state:mime-version:from:date:message-id:subject:to;\r\n        bh=9w2H8ucfF1w3+Zqu9gpPcHgTU9GHPjw7E2HYHHlZEkw=;\r\n        b=gaapyixgX52/f91ifJ2hxRuk13TLcG1ZKUo+Ci3j5a6rKCISPtmLXxwaXq5tghh5qg\r\n         r7S/oe5nDijJmdo1pIBDYGf9U+IDgIT9jHxP3pUoLwmhgnO3pr1di1JH0361ogIsGq/W\r\n         wATmvMTeEA1jAnKw8sr9Rb+jl2MUhqZLhL5Lhkdx/l5CCI0mfUmRAuv1XvGKdrPexM00\r\n         4UTNx9VeK8qYQ/jdf1BiX0ICrj/7e5hSImZ44ctHzn/HA3Htur6cBdFlAVHpW5/vPj0q\r\n         xnz5KQATcG0GmTX2rF27SGhAyPzRl+CZ0SDg9cGV2CvQ5kbDxsxOdzotR2X4hqksqMcC\r\n         S+EQ==',
  'X-Gm-Message-State: AMCzsaVGkvHZbfZofPrsj3QKBCLwg3nAsBM8cWdu5BXU7v1zENATSRJC uiG27aeGnsU8HjTsRFYk1HqnrNYGNuxg5R7wfRrnRw==',
  'X-Google-Smtp-Source: ABhQp+RznzRtpIGeOvxieUGeSxwDHEfX8SuSwMwZJSlXyU4GyjbzDw6PsT5DOScWWomiALUIa/1ktC1p5vFEDe7HcH8=',
  'X-Received: by 10.200.3.87 with SMTP id w23mr15494938qtg.98.1508680821032; Sun, 22 Oct 2017 07:00:21 -0700 (PDT)',
  'MIME-Version: 1.0',
  'Received: by 10.12.141.15 with HTTP; Sun, 22 Oct 2017 07:00:00 -0700 (PDT)',
  'From: Marcellin Nshimiyimana <mars@fusemachines.com>',
  'Date: Sun, 22 Oct 2017 19:45:00 +0545',
  'Message-ID: <CAOwpMi-cqMgYZ4BqFeP2QASdS54oqQ6diFfFQn+eVAVhHEC4yw@mail.gmail.com>',
  'Subject: Test email',
  'To: Mars-sprint <nmarcellin2@gmail.com>',
  'Content-Type: multipart/alternative; boundary="f4030435c3286adbf3055c232081"' ]
===== 2 =====
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\r\n        d=fusemachines.com; s=google;\r\n        h=mime-version:from:date:message-id:subject:to;\r\n        bh=9w2H8ucfF1w3+Zqu9gpPcHgTU9GHPjw7E2HYHHlZEkw=;\r\n        b=iPc3RHh9oXL6+dvuPM0hYt1vdj6U4hN83BFxhumWsSXnFDFmbSG4OtXHPF823HoZAA\r\n         4MbFQu5VgfvAQ+FmnKyfON2WdJrAYicyslVXlcA6l0UKSGIH/0NHSqi/kX+4KEKaClY7\r\n         jZkXZZ8EIl5IUBdRRUWSsySFOtrQ/9IeAb6YM=
=====

Output
======
[ 'DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\r\n        d=fusemachines.com; s=google;\r\n        h=mime-version:from:date:message-id:subject:to;\r\n        bh=9w2H8ucfF1w3+Zqu9gpPcHgTU9GHPjw7E2HYHHlZEkw=;\r\n        b=iPc3RHh9oXL6+dvuPM0hYt1vdj6U4hN83BFxhumWsSXnFDFmbSG4OtXHPF823HoZAA\r\n         4MbFQu5VgfvAQ+FmnKyfON2WdJrAYicyslVXlcA6l0UKSGIH/0NHSqi/kX+4KEKaClY7\r\n         jZkXZZ8EIl5IUBdRRUWSsySFOtrQ/9IeAb6YM=',
  'X-Gm-Message-State: AMCzsaVGkvHZbfZofPrsj3QKBCLwg3nAsBM8cWdu5BXU7v1zENATSRJC uiG27aeGnsU8HjTsRFYk1HqnrNYGNuxg5R7wfRrnRw==',
  'X-Google-Smtp-Source: ABhQp+RznzRtpIGeOvxieUGeSxwDHEfX8SuSwMwZJSlXyU4GyjbzDw6PsT5DOScWWomiALUIa/1ktC1p5vFEDe7HcH8=',
  'X-Received: by 10.200.3.87 with SMTP id w23mr15494938qtg.98.1508680821032; Sun, 22 Oct 2017 07:00:21 -0700 (PDT)',
  'MIME-Version: 1.0',
  'Received: by 10.12.141.15 with HTTP; Sun, 22 Oct 2017 07:00:00 -0700 (PDT)',
  'From: Marcellin Nshimiyimana <mars@fusemachines.com>',
  'Date: Sun, 22 Oct 2017 19:45:00 +0545',
  'Message-ID: <CAOwpMi-cqMgYZ4BqFeP2QASdS54oqQ6diFfFQn+eVAVhHEC4yw@mail.gmail.com>',
  'Subject: Test email',
  'To: Mars-sprint <nmarcellin2@gmail.com>',
  'Content-Type: multipart/alternative; boundary="f4030435c3286adbf3055c232081"' ]
======

**Kind**: global function  

-

