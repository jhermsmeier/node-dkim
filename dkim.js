
function DKIM( signature ) {
  
  if( !(this instanceof DKIM) )
    return new DKIM( signature )
  
  var field, fields = signature.split( '; ' )
  
  for( var i in fields ) {
    if( field = fields[i].match( /^([a-z]+?)=(.+?)$/i ) ) {
      this[ DKIM.fields[ field[1] ] ] = field[2]
    }
  }
  
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
