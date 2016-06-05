/**
 * Copyright (c) 2015, YourNameHere. All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
/* global module,require */

var fs = require('fs');
var glob = require('glob');

var HandleSocketIo = function (server, config) {
    var io = require("socket.io")(server.listener);
    var socketioroutes = config["socket.io-listeners"] || "listeners/*.js";
    var globOptions = {
        nodir: true,
        strict: true,
        cwd: process.cwd()
    };
    var files = glob.sync(socketioroutes, globOptions);
    files.forEach(function (file) {
        var listener = require(globOptions.cwd + '/' + file);
        listener(io, server, config);
    });
};

module.exports = HandleSocketIo;