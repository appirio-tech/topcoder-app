var angularProtractor = require('gulp-angular-protractor');
var rename = require('gulp-rename');
module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('e2eDataFilesRename', function() {
	  log('Copying environment specific files'+config.e2eTestsDataFiles);
	  
	  return gulp.src(config.e2eTestsDataFiles)
	  .pipe(rename(function (path) {
		  log('path '+path.basename);
		  log('curEnv '+config.curEnv);
		  path.basename = path.basename.replace('.'+config.curEnv, '');
	  }))
	  .pipe(gulp.dest(config.e2eApp));
	});

  gulp.task('e2eCopy', function() {
	  log('Copying environment specific files');
	  
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
