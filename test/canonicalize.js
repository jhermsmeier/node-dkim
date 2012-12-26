
var dkim = require( '../' )
var assert = require( 'assert' )
var fs = require( 'fs' )

var read = fs.readFileSync
var header = read( __dirname + '/data/gmail.headers' )

module.exports = {
  
  'canonicalizeHeader( header, undefined )': function() {
    dkim.util.canonicalizeHeader( header )
  },
  
  'canonicalizeHeader( header, "simple" )': function() {
    dkim.util.canonicalizeHeader( header, 'simple' )
  },
  
  'canonicalizeHeader( header, "relaxed" )': function() {
    dkim.util.canonicalizeHeader( header, 'relaxed' )
  },
  
  'canonicalizeHeader( header, "simple/relaxed" )': function() {
    dkim.util.canonicalizeHeader( header, 'simple/relaxed' )
  },
  
  'canonicalizeHeader( header, "relaxed/relaxed" )': function() {
    dkim.util.canonicalizeHeader( header, 'relaxed/relaxed' )
  },
  
  'canonicalizeHeader( header, "simple/simple" )': function() {
    dkim.util.canonicalizeHeader( header, 'simple/simple' )
  },
  
}
