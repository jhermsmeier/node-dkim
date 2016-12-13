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
