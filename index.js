var express = require('express')
var api = express()


api.get('/', function(req, res, next) {
    res.send('Hello World')
})

//console.log('API listening on port 3000')
api.listen(3000)

module.exports = api;
