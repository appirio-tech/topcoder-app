var envFile = require('../config.js')();
var envConfig = envFile[process.env.ENVIRONMENT || 'development'];

module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('styles', ['clean'], function() {
    utilities.log('Compiling Sass --> CSS');

    var assetPrefix = envConfig.CONSTANTS.ASSET_PREFIX.length ? envConfig.CONSTANTS.ASSET_PREFIX : '/';

    return gulp
      .src(config.sass, {base: './'})
      .pipe($.plumber())
      .pipe($.sass({includePaths: require('appirio-styles').includePaths}))
      .pipe($.autoprefixer({browsers: ['last 2 version']}))
      .pipe($.replace(/\/fonts/g, assetPrefix + 'fonts'))
      .pipe(gulp.dest(config.temp));
  });

  gulp.task('sass-watcher', function() {
    gulp.watch([config.sass], ['styles']);
  });
};
