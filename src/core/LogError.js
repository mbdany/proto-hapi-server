/**
 * Copyright (c) 2015, YourNameHere. All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
/* global module,console */

var pad = (n) => (n < 10) ? '0' + n : n;
var padMs = (n) => (n < 100) ? '0' + pad(n) : n;
var timestamp = () => {
    var d = new Date();

    return d.getFullYear() +
        '-' + d.getDate() +
        '-' + pad(d.getMonth() + 1) +
        ' ' + pad(d.getHours()) +
        ':' + pad(d.getMinutes()) +
        ':' + pad(d.getSeconds()) +
        '.' + padMs(d.getMilliseconds());
};
var errFmt = (message) => '[' + timestamp() + '][ERROR] ' + message;

module.exports = (filename) => {

    return (description, error) => {
        console.error(errFmt('in : ' + filename));
        console.error(errFmt('---> ' + description));
        if (error) {
            console.error(errFmt('details : '));
            console.error(error);
        }

        return error;
    };
};


