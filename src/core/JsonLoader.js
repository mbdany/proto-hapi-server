/**
 * Copyright (c) 2015, YourNameHere. All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
/* global module,require,__filename */
var fs       = require('fs'),
    P        = require('bluebird'),
    logError = require('./LogError')(__filename);

module.exports = jsonFileName => {

    return new P((resolve, reject) => {
        fs.readFile(jsonFileName, (readFileErr, data) => {
            if (readFileErr) {

                return reject(logError('fs.readFile', readFileErr));
            } else {
                var jsonData;
                try {
                    jsonData = JSON.parse(data);
                } catch (parseError) {

                    return reject(logError('JSON.parse', parseError));
                }
                resolve(jsonData);
            }
        });
    });
};