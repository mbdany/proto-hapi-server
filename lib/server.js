/**
 * Copyright (c) 2015, YourNameHere. All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
/* module, global require, console */

module.exports = (configFileName, onReadyHandler) => {

    //-----------------------------
    // load configuration and then,
    // start application.
    //-----------------------------
    require('./core/Config').load(configFileName, { server: {} }).then(config => {

        var Hapi = require('hapi');
        var fs = require('fs');
        var port = config.server.port || 80;
        var host = config.server.host || 'localhost';
        var certKey = fs.readFileSync(config.server.tlsKey);
        var certCrt = fs.readFileSync(config.server.tlsCert);
        var tls = config.server.protocol === 'https' ? { key: certKey, cert: certCrt } : undefined;
        

        //-------------------------------------
        // Create a server with a host and port
        //-------------------------------------
        var server = new Hapi.Server();
        server.connection({
            host: host,
            port: port,
            tls: tls
        });

        //---------------------------------------
        // Add socket io pluggins
        //---------------------------------------
        var handleSocketIo = require("./core/HandleSocketIo");
        handleSocketIo(server, config);

        //---------------------------------------
        // Configure plugins and Start the server
        //---------------------------------------
        server.register([{
            register: require('inert')
        }, {
            register: require('blipp')
        }, {
            register: require('hapi-router'),
            options: {
                routes: config["dynamic-routes"] || 'routes/*.js',
                config: config
            }
        }], function (err) {

            server.start(function () {
                console.log('listening port ' + port + '...');
                if (onReadyHandler) {
                    onReadyHandler(server, config);
                }
            });
        });
    });
};
