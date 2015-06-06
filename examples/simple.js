"use strict";

var sycle = require('sycle');
var express = require('express');
var rest = require('sycle-express-rest');
var explorer = require('../');
var port = 3000;

// create express application
var app = express();
app.disable('x-powered-by');

// create sycle application
var sapp = sycle();
sapp.registry.define('Product', {
    crud: true,
    properties: {
        foo: {type: String, required: true},
        bar: String,
        aNum: {type: Number, min: 1, max: 10, required: true, default: 5}
    }
});
sapp.phase(sycle.boot.database());
sapp.boot(function (err) { if (err) throw err; });

// setup middlewares
var apiPath = '/api';
app.use('/explorer', explorer(sapp, {
    basePath: apiPath,
    apiInfo: {
        'title': 'Example API',
        'description': 'Explorer example app.'
    },
    version: '1.0'
}));
app.use(apiPath, rest(sapp));
console.log("Explorer mounted at localhost:" + port + "/explorer");

// start server
app.listen(port);
