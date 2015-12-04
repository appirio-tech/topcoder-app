var angularProtractor = require('gulp-angular-protractor');
var rename            = require('gulp-rename');
var curEnv            = process.env.ENVIRONMENT || 'development';
module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('e2eDataFilesRename', function() {
	  return gulp.src(config.e2eApp + '/**/*.' + curEnv +'.data.js')
	  .pipe(rename(function (path) {
		  path.basename = path.basename.replace('.'+ curEnv, '');
	  }))
	  .pipe(gulp.dest(config.e2eApp));
	});

  gulp.task('e2eCopy', function() {
	  return gulp
	    .src(config.e2eTests)
	    .pipe(gulp.dest(config.e2eTemp));
	});
  
  gulp.task('e2e', ['e2eDataFilesRename', 'e2eCopy'], function() {
    return gulp
      .src(config.e2eTempFiles)
      .pipe(angularProtractor({
        'configFile': config.e2eTemp + '/conf.js',
        'args': ['--baseUrl', 'http://127.0.0.1:8000'],
        'autoStartStopServer': true,
        'debug': true
      }))
      .on('error', function(e) { throw e });
  });
};
