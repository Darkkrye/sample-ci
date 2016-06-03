var express = require('express')
var api = express()
var _ = require('lodash')
var bodyparser = require('body-parser')

var contacts = []

api.get('/', function(req, res, next) {
    res.send('Hello World')
})

api.get('/contacts', function(req, res, next) {
    res.send(contacts)
})

api.get('/contacts/:name', function(req, res, next) {
    res.send(contacts)
})

api.post('/contacts', bodyparser.json(), function(req, res, next) {
    var contact = req.body.contact

    if (typeof contact !== 'object')
        res.status(422).send('Unprocessable entity')

    contacts.push(contact)
    res.send(contact)
})

api.put('/contacts/:name/:new', function(req, res, next) {
    var count = 0;
    contacts = contacts.map(function(contact) {
        if (contact.name === req.params.name) {
            count++;
            contact.name = req.params.new;
        }

        return contact;
    });

    res.send({count: count});
});

api.delete('/contacts/:name', function(req, res, next) {
    var count = 0
    contacts = _.remove(contacts, function(contact) {
        if (contact.name !== req.params.name)
            return false

        count ++
        return false
    })

    res.send({count: count})
})

//console.log('API listening on port 3000')
api.listen(3000)

module.exports = api;
