/**
 * Copyright (c) 2015, YourNameHere. All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var del         = require('del'),
    gulp        = require('gulp'),
    babel       = require("gulp-babel"),
    jshint      = require('gulp-jshint'),
    util        = require('gulp-util'),
    runSequence = require('run-sequence');

//-----------------
// The default task
//-----------------
gulp.task('default', ['build']);

//-------------------
// Display some infos
//-------------------
gulp.task('infos', function () {

    util.log(util.colors.green('-------------------------------------------------------'));
    util.log(util.colors.green('--- Building Server                                 ---'));
    util.log(util.colors.green('-------------------------------------------------------'));
});

//------------------
// Clean destination
//------------------
gulp.task('clean', del.bind(null, ['lib/core', 'lib/*']));

//---------------------
// babelify js sources
//---------------------
gulp.task("babelify", function () {
    return gulp.src("src/**")
        .pipe(jshint({
            esnext: true,
            node:   true  // in node , use strict can be added on top of file
        }))
        .pipe(jshint.reporter('default', {verbose: true}))
        .pipe(babel())
        .pipe(gulp.dest("lib"));
});

//---------------------
// copy app config file
//---------------------
gulp.task("config", function () {
    return gulp.src("config.json")
        .pipe(gulp.dest("lib"));
});

//--------------
// Build the app
//--------------

// Build the dev app from source code
gulp.task('build', ['infos'], function (cb) {
    runSequence(['clean', 'babelify', 'config'], cb);
});