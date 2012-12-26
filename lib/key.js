
Key.fields = {
  g: 'granularity',
  h: 'hash',
  k: 'type',
  n: 'notes',
  p: 'key',
  s: 'service',
  t: 'flags',
  v: 'version',
}

Key.fieldmap = {
  flags:       't',
  granularity: 'g',
  hash:        'h',
  key:         'p',
  notes:       'n',
  service:     's',
  type:        'k',
  version:     'v',
}

function Key( data ) {
  
  if( !(this instanceof Key) )
    return new Key( data )
  
  var field, fields = data.split( /;\s+/g )
  
  for( var i in fields ) {
    if( field = fields[i].match( /^([a-z]+?)=(.+?)$/i ) ) {
      this[ Key.fields[ field[1] ] || field[1] ] = field[2]
    }
  }
  
}

Key.prototype = {
  
  toString: function() {
    
  }
  
}

module.exports = Key
