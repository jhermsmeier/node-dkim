
function DKIM( signature ) {
  
  if( !(this instanceof DKIM) )
    return new DKIM( signature )
  
  var field, fields = signature.split( /;\s+/g )
  
  for( var i in fields ) {
    if( field = fields[i].match( /^([a-z]+?)=(.+?)$/i ) ) {
      this[ DKIM.fields[ field[1] ] ] = field[2]
    }
  }
  
  // Remove folding whitespace from signature
  this.signature = this.signature.replace( /\s/g, '' )
  
}

DKIM.fields = {
  v: 'version',
  a: 'algorithm',
  c: 'canonical',
  q: 'query',
  l: 'length',
  t: 'timestamp',
  x: 'expires',
  h: 'headers',
  bh: 'hash',
  s: 'selector',
  d: 'domain',
  b: 'signature'
}

DKIM.prototype = {
  
}

module.exports = DKIM
