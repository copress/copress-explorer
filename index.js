"use strict";

require('./lib/patch');

var path = require('path');

module.exports = explorer;

/**
 * Example usage:
 *
 * var explorer = require('sycle-express-explorer');
 * app.use('/explorer', explorer(sapp, options));
 */
function explorer(sapp, options) {
    options = options || {};
    options.uiDirs = options.uiDirs || path.join(__dirname, 'public');
    return require('loopback-explorer')(buildLoopbackApplication(sapp), options);
}

function buildLoopbackApplication(sapp) {
    return {
        models: sapp.models,
        get: function () {
            return sapp.get.apply(sapp, arguments);
        },
        remotes: function () {
            return sapp.remotes;
        }
    }
}