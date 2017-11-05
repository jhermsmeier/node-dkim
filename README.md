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
        * [.filterSignatureHeaders(headers, signatureHeader)](#DKIM.verify.filterSignatureHeaders) ⇒ <code>Array.&lt;String&gt;</code>


* * *

<a name="DKIM.Signature"></a>

#### DKIM.Signature
**Kind**: static class of [<code>DKIM</code>](#DKIM)  
**See**: [dkim-signature](https://github.com/jhermsmeier/node-dkim-signature)  

* * *

<a name="new_DKIM.Signature_new"></a>

##### new DKIM.Signature()
DKIM Signature


* * *

<a name="DKIM.Key"></a>

#### DKIM.Key
**Kind**: static class of [<code>DKIM</code>](#DKIM)  
**See**: [dkim-key](https://github.com/jhermsmeier/node-dkim-key)  

* * *

<a name="new_DKIM.Key_new"></a>

##### new DKIM.Key()
DKIM Key


* * *

<a name="DKIM.NONE"></a>

#### DKIM.NONE : <code>String</code>
**Kind**: static property of [<code>DKIM</code>](#DKIM)  

* * *

<a name="DKIM.OK"></a>

#### DKIM.OK : <code>String</code>
**Kind**: static property of [<code>DKIM</code>](#DKIM)  

* * *

<a name="DKIM.TEMPFAIL"></a>

#### DKIM.TEMPFAIL : <code>String</code>
**Kind**: static property of [<code>DKIM</code>](#DKIM)  

* * *

<a name="DKIM.PERMFAIL"></a>

#### DKIM.PERMFAIL : <code>String</code>
**Kind**: static property of [<code>DKIM</code>](#DKIM)  

* * *

<a name="DKIM.getKey"></a>

#### DKIM.getKey(domain, [selector], callback)
Retrieve a domain key

**Kind**: static method of [<code>DKIM</code>](#DKIM)  
**Todo**

- [ ] DNS seems to FORMERR on unregistered / expired domains,
which maybe should be a TEMPFAIL (?)
- [ ] make this `public_key = dkim_find_key(q_val, d_val, s_val)`,
where `*_val` are the signature's attribute values
- [ ] Throw error if the public key is not a Buffer

**Params**

- domain <code>String</code>
- [selector] <code>String</code>
- callback <code>function</code>


* * *

<a name="DKIM.processBody"></a>

#### DKIM.processBody(message, method) ⇒ <code>String</code>
Canonicalize the message body according to
methods defined in RFC[XXXX]

**Kind**: static method of [<code>DKIM</code>](#DKIM)  
**Throws**:

- <code>Error</code> If canonicalization method is unsupported

**Params**

- message <code>Buffer</code> | <code>String</code>
- method <code>String</code> - (simple|relaxed)


* * *

<a name="DKIM.processHeader"></a>

#### DKIM.processHeader(headers, signHeaders, method) ⇒ <code>String</code>
Canonicalize the message header according to
methods defined in RFC[6376]

**Kind**: static method of [<code>DKIM</code>](#DKIM)  
**Throws**:

- <code>Error</code> If canonicalization method is unsupported

**Params**

- headers <code>Array.&lt;String&gt;</code> - Each header is formatted as `<field>: <value>`
- signHeaders <code>Array</code>
- method <code>String</code> - (simple|relaxed)

**Example**  
```js
DKIM.processHeader( [ 'A: X', 'B : Y\t\r\n\tZ  '], [ 'A' ], 'relaxed' )
```

* * *

<a name="DKIM.verifySignature"></a>

#### DKIM.verifySignature(body, headers, callback)
Verify a message signature

**Kind**: static method of [<code>DKIM</code>](#DKIM)  
**Params**

- body <code>Buffer</code>
- headers <code>Array</code>
- callback <code>function</code>


* * *

<a name="DKIM.verify"></a>

#### DKIM.verify(message, callback)
Verify a message's signatures

**Kind**: static method of [<code>DKIM</code>](#DKIM)  
**Throws**:

- <code>Error</code> If input is not a buffer

**Params**

- message <code>Buffer</code>
- callback <code>function</code>


* * *

<a name="DKIM.verify.filterSignatureHeaders"></a>

##### verify.filterSignatureHeaders(headers, signatureHeader) ⇒ <code>Array.&lt;String&gt;</code>
Filter out signature headers other than the specified `signatureHeader`

**Kind**: static method of [<code>verify</code>](#DKIM.verify)  
**Returns**: <code>Array.&lt;String&gt;</code> - filtered headers  
**Params**

- headers <code>Array.&lt;String&gt;</code> - list of headers to filter
- signatureHeader <code>String</code> - signature header to keep


* * *

