module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('copy-html', function() {
    utilities.log('Moving app html files to .tmp');

    return gulp
      .src([config.app + '**/*.html', '!' + config.app + 'specs.html'])
      .pipe(gulp.dest(config.temp));
  });
};
