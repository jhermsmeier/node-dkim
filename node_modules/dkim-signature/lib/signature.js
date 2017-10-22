/**
 * Signature Constructor
 * @return {Signature}
 */
function Signature( options ) {
  
  if( !(this instanceof Signature) )
    return new Signature( options )
  
  // Signing algorithm
  this.algorithm     = 'rsa-sha256'
  // Headers canonicalization / normalization type
  this.canonical     = 'simple'
  this.copiedHeaders = []
  // Signing domain
  this.domain        = null
  this.expires       = null
  this.hash          = null
  // Headers
  this.headers       = []
  this.identity      = null
  this.length        = null
  this.query         = 'dns/txt'
  this.selector      = null
  // DKIM Signature data (base64)
  this.signature     = null
  this.timestamp     = null
  // DKIM version
  this.version       = '1'
  
  var self = this
  
  if( options != null ) {
    Object.keys( options ).forEach( function( k, v ) {
      if( self.hasOwnProperty( k ) )
        self[ k ] = options[ k ]
    })
  }
  
}

Signature.fields = [
  'algorithm',
  'canonical',
  'copiedHeaders',
  'domain',
  'expires',
  'hash',
  'headers',
  'identity',
  'length',
  'query',
  'selector',
  'signature',
  'timestamp',
  'version',
]

Signature.keys = [
  'a', // algorithm
  'c', // canonical
  'z', // copiedHeaders
  'd', // domain
  'x', // expires
  'bh', // body hash
  'h', // headers
  'i', // identity
  'l', // length
  'q', // query
  's', // selector
  'b', // signature
  't', // timestamp
  'v', // version
]

Signature.create = function( options ) {
  return new Signature( options )
}

Signature.parse = function( dkimHeader ) {
  return new Signature().parse( dkimHeader )
}

/**
 * Signature Prototype
 * @type {Object}
 */
Signature.prototype = {
  
  constructor: Signature,
  
  parse: function( value ) {
    
    var fields = ( value + '' )
      .replace( /\r\n\s/g, '' )
      .split( /;(?:\s+)?/g )

      var field, match, i
    
    while( field = fields.shift() ) {
      match = /^([a-z]{1,2})=([^;]+?)$/i.exec( field )
      if( match != null ) {
    
        i = Signature.keys.indexOf( match[1] )
        if( Signature.fields[i] === 'signature' || Signature.fields[i] === 'hash' )
          this[ Signature.fields[i] ] = new Buffer( match[2], 'base64' )
        else if( Signature.fields[i] === 'headers' || Signature.fields[i] === 'copiedHeaders' )
          this[ Signature.fields[i] ] = match[2].split( /:/g ).map(val => val.trim())
        else
          this[ Signature.fields[i] ] = match[2]
      }
    }
    
    return this
    
  },
  
  toString: function() {
    
    var self = this
    
    return Signature.fields
      .map( function( field, i ) {
        if( typeof self[ field ] === 'string' || typeof self[ field ] === 'number' )
          return Signature.keys[ i ] + '=' + self[ field ]
        else if( Array.isArray( self[ field ] ) && self[ field ].length )
          return Signature.keys[ i ] + '=' + self[ field ].join( ':' )
        else if( Buffer.isBuffer( self[ field ] ) && self[ field ].length )
          return Signature.keys[ i ] + '=' + self[ field ].toString( 'base64' )
      })
      .filter( function( field ) {
        return field != null
      })
      .join( '; ' )
    
  }
  
}

// Exports
module.exports = Signature
