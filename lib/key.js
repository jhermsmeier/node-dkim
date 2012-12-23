
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

Key.fields = {
  v: 'version',
  g: 'granularity',
  h: 'hash',
  k: 'type',
  n: 'notes',
  p: 'key',
  s: 'service',
  t: 'flags',
}

Key.fieldmap = {
  version:     'v',
  granularity: 'g',
  hash:        'h',
  type:        'k',
  notes:       'n',
  key:         'p',
  service:     's',
  flags:       't',
}

Key.prototype = {
  
  toString: function() {
    
  }
  
}
