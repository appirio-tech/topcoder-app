module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('templatecache', ['jade'], function() {
    utilities.log('Creating AngularJS $templateCache');

    return gulp
      .src(config.htmltemplates)
      .pipe($.minifyHtml({empty: true}))
      .pipe($.angularTemplatecache(
        config.templateCache.file,
        config.templateCache.options
        ))
      .pipe(gulp.dest(config.temp));
  });
};
