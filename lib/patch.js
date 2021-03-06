"use strict";

var _cloneDeep = require('lodash.clonedeep');

var routeHelper = require('loopback-explorer/lib/route-helper');
var translateDataTypeKeys = require('loopback-explorer/lib/translate-data-type-keys');

routeHelper.convertAcceptsToSwagger = function convertAcceptsToSwagger(route, classDef) {
    var split = route.method.split('.');
    var accepts = _cloneDeep(route.accepts) || [];
    if (classDef && classDef.sharedCtor &&
        classDef.sharedCtor.accepts && split.length > 2 /* HACK */) {
        accepts = accepts.concat(classDef.sharedCtor.accepts);
    }

    // Filter out parameters that are generated from the incoming request,
    // or generated by functions that use those resources.
    accepts = accepts.filter(function(arg){
        if (!arg.http) return true;
        return typeof arg.http !== 'function' && (!arg.http.source || arg.http.source === 'body');
    });

    // Translate LDL keys to Swagger keys.
    accepts = accepts.map(translateDataTypeKeys);

    // Turn accept definitions in to parameter docs.
    accepts = accepts.map(routeHelper.acceptToParameter(route));

    return accepts;
};