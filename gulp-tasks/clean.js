var del = require('del'); // rm -rf

module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.temp);
    utilities.log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
  });
};
