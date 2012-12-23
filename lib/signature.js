
var dns    = require( 'dns' )
var crypto = require( 'crypto' )

var Key    = require( './key' )

function Signature( header ) {
  
  if( !(this instanceof Signature) )
    return new Signature( header )
  
  var field, fields = header.split( /;\s+/g )
  
  for( var i in fields ) {
    if( field = fields[i].match( /^([a-z]+?)=(.+?)$/i ) ) {
      this[ Signature.fields[ field[1] ] ] = field[2]
    }
  }
  
  this.headers = this.headers.split( ':' )
  // Remove folding whitespace from signature
  this.signature = this.signature.replace( /\s/g, '' )
  
  // Split up the query methods
  if( this.query )
    this.query = this.query.split( ':' )
  // Split up copied header fields
  if( this.copied_headers )
    this.copied_headers = this.copied_headers.split( '|' )
  
}

Signature.fields = {
  a: 'algorithm',
  b: 'signature',
  bh: 'hash',
  c: 'canonical',
  d: 'domain',
  h: 'headers',
  i: 'identity',
  l: 'length',
  q: 'query',
  s: 'selector',
  t: 'timestamp',
  v: 'version',
  x: 'expires',
  z: 'copied_headers',
}

Signature.prototype = {
  
  verify: function( envelope, callback ) {
    
    var domain = this.selector + '._domainkey.' + this.domain;
    var rrtype = ( this.query || 'txt' ).toUpperCase()
    
    dns.resolve(
      domain, rrtype,
      function( error, records ) {
        
        if( error ) { callback( error ) }
        
        var key = new Key( records.join( '' ) )
        
        
        
      }
    )
    
  },
  
  toString: function() {
    if( this._raw ) { return this._raw }
  }
  
}

module.exports = Signature
