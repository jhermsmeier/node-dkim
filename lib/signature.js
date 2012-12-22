
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
  
}

module.exports = Signature
