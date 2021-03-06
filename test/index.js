var test = require('tape')
var path = require('path')
var nano = require('nano')

var secure = require('../')


var url = process.env.COUCH || 'http://localhost:5984'
var dbname = 'couchdb-secure-test';
var couch = nano(url)
var db = couch.use(dbname)


function clear(callback) {
  couch.db.destroy(dbname, callback)
}

test('configure from json', function(t) {
  clear(function() {
    secure(url + '/' + dbname, path.join(__dirname, 'fixtures', 'security.json'), function(error, response) {
      t.notOk(error, 'no error occured')
      t.ok(response.ok, 'response is ok')
      t.end()
    })
  })
})
