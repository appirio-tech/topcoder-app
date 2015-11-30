var del = require('del'); // rm -rf

module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.temp);
    utilities.log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
  });
  gulp.task('clean-fonts', function(done) {
    utilities.clean(config.build + 'fonts/**/*.*', done);
  });
  gulp.task('clean-images', function(done) {
    utilities.clean(config.build + 'images/**/*.*', done);
  });
  gulp.task('clean-styles', function(done) {
    utilities.clean(config.temp + '**/*.css', done);
  });
};
