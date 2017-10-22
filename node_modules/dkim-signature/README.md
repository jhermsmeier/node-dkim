# DomainKeys Identified Mail (DKIM) Signature
[![npm](https://img.shields.io/npm/v/dkim-signature.svg?style=flat-square)](https://npmjs.com/dkim-signature)
[![npm](https://img.shields.io/npm/l/dkim-signature.svg?style=flat-square)](https://npmjs.com/dkim-signature)
[![npm downloads](https://img.shields.io/npm/dm/dkim-signature.svg?style=flat-square)](https://npmjs.com/dkim-signature)
[![build status](https://img.shields.io/travis/jhermsmeier/node-dkim-signature.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-dkim-signature)

## Install via [npm](https://npmjs.com)

```sh
$ npm install dkim-signature
```

## Usage

```js
var DKIMSignature = require( 'dkim-signature' )
```

Suppose you have the content of the `DKIM-Signature` email header:
```
v=1; a=rsa-sha256; c=relaxed/relaxed;
 d=gmail.com; s=20120113;
 h=mime-version:date:message-id:subject:from:to:content-type;
 bh=DrlXO8ocnosZnW5ZN7P4S/fIdR8vwHj0TyzoPISZF2Q=;
 b=gOHBExs2JcJFRrozPDw88Js0dc0AHOo6YTZqrDTedfcK/jM/mxfu5rfVzuUnKAGiS5
 ZvRvXvwYjIW0B9t0DDHDOs5soIukuEXeUw9OV2QD8qc5pmOShuRQWyW5pRftTF87omkj
 gV2Eik5K2f8FpNlyvuLDjMUmyP8RpLaRrii6+kRRsoJzzP41IqALmlLmJfvtnkeu5kM0
 v4XnQ4hBNcaLuCmq3fZfCQFDexofECQOZ8FWE0VfdASG8HOJ6jgxuKwYtNfy11ySUSrI
 wFFlrjTfiNqSD9nzQns3j+xXLtqsvviJQXJgkC8O6mLel3GDwm8LHzBoszzqZ/FiL4rg
 Vdfw==
```

Parse the signature header:
```js
var signature = DKIMSignature.parse( header )
```

```js
{
  algorithm: 'rsa-sha256',
  canonical: 'relaxed/relaxed',
  copiedHeaders: [],
  domain: 'gmail.com',
  expires: null,
  hash: <Buffer 0e b9 57 3b ca 1c 9e 8b 19 9d 6e 59 37 b3 ...>,
  headers: [
    'mime-version',
    'date',
    'message-id',
    'subject',
    'from',
    'to',
    'content-type'
  ],
  identity: null,
  length: null,
  query: null,
  selector: '20120113',
  signature: <Buffer 80 e1 c1 13 1b 36 25 c2 45 46 ba 33 3c ...>,
  timestamp: null,
  version: '1'
}
```

Or create a signature header:
```js
var signature = new DKIMSignature({
  algorithm: 'rsa-sha256',
  canonical: 'simple/relaxed',
  domain: 'into.space',
  headers: [
    'mime-version',
    'date',
    'message-id',
    'subject',
    ...
  ],
  selector: '20120113',
  signature: <Buffer 80 e1 c1 13 1b 36 25 c2 45 46 ba 33 3c ...>,
  version: '1'
})
```

```js
signature.toString()
```

## API

Constructor:

- new Signature( options )
- Signature.create( options )
- Signature.parse( header )

Methods:

- signature.parse( header )
- signature.toString()
