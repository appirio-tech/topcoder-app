module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('wiredep', ['jade'], function() {
    utilities.log('Injecting bower css/js and app js files into index.jade');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
      .src(config.index)
      .pipe(wiredep(options))
      .pipe($.inject(
        gulp.src(config.js)
        .pipe($.naturalSort('desc'))
        .pipe($.angularFilesort()),
        {relative: true}))
      .pipe($.inject(gulp.src(config.nonBowerScripts, {read: false}), {
        starttag: '//- inject:nonBowerScripts',
        endtag: '//- endinject',
        ignorePath: 'assets/'
      }))
      .pipe(gulp.dest(config.app));
  });

  gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function() {
    utilities.log('Injecting app css into index.jade');

    return gulp
      .src(config.index)
      .pipe($.inject( // Sort the css (topcoder.css, then everything else)
        gulp.src(config.css, {read: false})
        .pipe($.naturalSort('desc')),
        {ignorePath: '.tmp', addRootSlash: false}))
      .pipe(gulp.dest(config.app));
  });
};
