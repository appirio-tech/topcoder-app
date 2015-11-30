module.exports = function(gulp, $, config, utilities) {
  'use strict';

  // vet should be run before tests
  gulp.task('test', ['templatecache', 'ngConstants'], function(done) {
    utilities.startTests(true /* singleRun */, done);
  });

  gulp.task('autotest', ['vet', 'templatecache', 'ngConstants'], function(done) {
    utilities.startTests(false, done);
  });
};
