module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('images', ['clean', 'images:move-skills'], function() {
    utilities.log('Copying and compressing the images');

    return gulp
      .src([config.images, '!' + config.assets + 'images/skills/**.*'])
      .pipe($.imagemin({optimizationLevel: 4}))
      .pipe(gulp.dest(config.temp + 'images'));
  });

  gulp.task('images:move-skills', ['clean'], function() {
    utilities.log('Copying original skill icons to build folder');

    return gulp
       .src(config.assets + 'images/skills/**.*')
      .pipe(gulp.dest(config.build + 'images/skills'));
  });
};
