module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('images', ['clean'], function() {
    utilities.log('Copying and compressing the images');

    return gulp
      .src(config.images)
      .pipe($.imagemin({optimizationLevel: 4}))
      .pipe(gulp.dest(config.temp + 'images'));
  });

  gulp.task('images-orig-nav', ['build1'], function() {
    utilities.log('Copying original images');

    return gulp
       .src(config.assets + 'images/nav/**.*')
      .pipe(gulp.dest(config.build + 'images/nav'));
  });

  gulp.task('images-orig', ['images-orig-nav'], function() {
    utilities.log('Copying original images');

    return gulp
       .src(config.assets + 'images/skills/**.*')
      .pipe(gulp.dest(config.build + 'images/skills'));
  });
};
