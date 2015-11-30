module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('e2e', function() {
    return gulp
      .src(['./tests/e2e/app/*.js'])
      .pipe($.angularProtractor({
        'configFile': 'tests/e2e/conf.js',
        'args': ['--baseUrl', 'http://127.0.0.1:8000'],
        'autoStartStopServer': true,
        'debug': true
      }))
      .on('error', function(e) { throw e });
  });
};
