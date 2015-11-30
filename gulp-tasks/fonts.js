module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('fonts', ['clean-fonts'], function() {
    utilities.log('Copying fonts');

    return gulp
      .src([config.fonts, 'bower_components/fontawesome/fonts/fontawesome-webfont.*'])
      .pipe(gulp.dest(config.build + 'fonts'));
  });

  // gulp.task('dev-fonts', ['fonts'], function() {
  //   utilities.log('Copying devicon fonts');

  //   return gulp
  //     .src('bower_components/devicon/fonts/**.*')
  //     .pipe(gulp.dest(config.build + 'styles/fonts'));
  // });
};
