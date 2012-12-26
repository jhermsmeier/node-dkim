module.exports = {
  
  canonicalizeHeader: function( header, method ) {
    
    header = header != null ? header.toString() : ''
    method = method != null ? method.split( '/' ) : []
    method = method[1] || method[0] || 'simple'
    
    if( method !== 'simple' && method !== 'relaxed' ) {
      throw new Error(
        'Invalid or not implemented canonicalization method'
      )
    }
    
    var key, colon, value, lines = {}
    
    header.split( /\r\n(?=[^\s])/g ).map(
      function( line ) {
        
        colon = line.indexOf( ':' )
        
        key   = line.slice( 0, colon )
        value = line.slice( colon )
        
        if( method === 'relaxed' ) {
          
          // Convert all header field names to lowercase
          key = key.toLowerCase()
          
          // Unfold all header field continuation lines
          value = value.replace( /\r\n\s+/g, ' ' )
          // Convert all sequences of one or more WSP characters to a single SP
          value = value.replace( /\s+/g, ' ' )
          // Delete all WSP characters at the end of each unfolded header field
          value = value.replace( /\s+$/g, '' )
          // Delete any WSP characters remaining before and after the colon
          value = value.replace( /\s*[:]\s*/, ':' )
          
        }
        
        lines[ key ] = value + '\r\n'
        
      } 
    )
    
    return lines
    
  }
  
}