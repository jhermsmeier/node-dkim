
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
  
  if( typeof data === 'string' ) {
    
    var field, fields = data.split( /;\s+/g )
    
    for( var i in fields ) {
      if( field = fields[i].match( /^([a-z]+?)=(.+?)$/i ) ) {
        this[ Key.fields[ field[1] ] || field[1] ] = field[2]
      }
    }
    
  } else if( data != null ) {
    
    for( var k in data ) {
      if( data.hasOwnProperty( k ) ) {
        this[ Key.fields[ k ] || k ] = data[ k ]
      }
    }
    
  }
  
}

Key.prototype = {
  
  toString: function() {
    var out = []
    for( var key in this ) {
      if( this.hasOwnProperty( key ) ) {
        out.push(
          ( Key.fieldmap[ key ] || key ) + '=' + this[ key ]
        )
      }
    }
    return out.join( '; ' )
  }
  
}

module.exports = Key
