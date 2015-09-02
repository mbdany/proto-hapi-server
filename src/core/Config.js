/**
 * Copyright (c) 2015, YourNameHere. All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
/* global module,require,__filename */
var loadJson = require('./JsonLoader'),
    logError = require('./LogError')(__filename);

var validateKeyName = (name) => {
    if (['load', 'assign', 'merge'].indexOf(name) > -1) {
        throw logError('Configuration key "' + name + '" is reserved and can\'t be used as root config key.', new Error('Configuration Reserved Keyword Error'));
    } else {
        return true;
    }
};

var Config = {
    load:   (jsonFileName = 'config.json', defaultConfig = {}) => {
        return loadJson(jsonFileName).then(json => {
            Config.merge(defaultConfig);
            for (var name in json) {
                if (json.hasOwnProperty(name)) {
                    if (validateKeyName(name)) {
                        Config[name] = json[name];
                    }
                }
            }

            return Config;
        });
    },
    assign: (dest, conf) => {
        conf = conf || {};
        dest = dest || {};
        for (var name in conf) {
            if (conf.hasOwnProperty(name)) {
                var val = conf[name];
                if (val && typeof val === 'object') {
                    dest[name] = Config.assign(dest[name], val);
                } else {
                    dest[name] = conf[name];
                }
            }
        }
        return dest;
    },
    merge:  (conf) => {
        conf = conf || {};
        for (var name in conf) {
            if (conf.hasOwnProperty(name)) {
                validateKeyName(name);
            }
        }
        return Config.assign(Config, conf);
    }
};

module.exports = Config;