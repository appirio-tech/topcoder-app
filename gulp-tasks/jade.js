var envFile = require('../config.js')();
var envConfig = envFile[process.env.ENVIRONMENT || 'development'];

module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('jade', ['clean'], function() {
    utilities.log('Compiling Jade --> HTML');

    return gulp
      .src(config.jade)
      .pipe($.plumber())
      .pipe($.data(function(file) {
        return envConfig;
      }))
      .pipe($.jade({pretty: true}))
      .pipe($.replace(/-->/g, ' -->'))
      .pipe(gulp.dest(config.temp));
  });
};
