module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('fonts', ['clean'], function() {
    utilities.log('Copying fonts');

    return gulp
      .src([config.fonts, 'bower_components/fontawesome/fonts/fontawesome-webfont.*'])
      .pipe(gulp.dest(config.build + 'fonts'));
  });
};
