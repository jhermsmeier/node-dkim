/**
 * Key Constructor
 * @return {Key}
 */
function Key( options ) {
  
  if( !(this instanceof Key) )
    return new Key( options )
  
  this.flags       = null
  this.granularity = null
  this.hash        = null
  this.key         = null
  this.notes       = null
  this.service     = null
  this.type        = 'rsa-sha256'
  this.version     = null
  
  var self = this
  
  if( options != null ) {
    Object.keys( options ).forEach( function( k, v ) {
      if( self.hasOwnProperty( k ) )
        self[ k ] = options[ k ]
    })
  }
  
}

Key.fields = [
  'flags',
  'granularity',
  'hash',
  'key',
  'notes',
  'service',
  'type',
  'version',
]

Key.keys = [
  't', // flags
  'g', // granularity
  'h', // hash
  'p', // key
  'n', // notes
  's', // service
  'k', // type
  'v', // version
]

Key.create = function( options ) {
  return new Key( options )
}

Key.parse = function( value ) {
  return new Key().parse( value )
}

/**
 * Key Prototype
 * @type {Object}
 */
Key.prototype = {
  
  constructor: Key,

  /**
   * 
   * @param {string} value 
   * ex: "k=rsa; p=abc=", "k=rsa; p=abc=;"
   * @return {Key}
   */
  parse: function( value ) {
    
    var fields = ( value + '' )
      .replace( /\r\n\s/g, '' )
      .split( /;\s+/g )
    // some values come with a ";" at both k and p
    fields = fields.map(a => a.replace(';',''))
    
    var field, match, i
    
    while( field = fields.shift() ) {
      match = /^([a-z]{1,2})=([^;]+?)$/i.exec( field )
      if( match != null ) {
        i = Key.keys.indexOf( match[1] )
        if( Key.fields[i] === 'key' || Key.fields[i] === 'hash' )
          this[ Key.fields[i] ] = new Buffer( match[2], 'base64' )
        else
          this[ Key.fields[i] ] = match[2]
      }
    }
    
    return this
    
  },
  
  toString: function() {
    
    var self = this
    
    return Key.fields
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
module.exports = Key
