var runSequence  = require('run-sequence');

module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('build', function(done) {
    utilities.log('Building everything');

    runSequence(
      'clean',
      ['optimize', 'fonts']
    );

    utilities.clean(config.temp, done);
  });

  gulp.task('build-specs', ['templatecache', 'ngConstants'], function() {
    utilities.log('Building the spec runner');

    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();
    options.devDependencies = true;

    return gulp
      .src(config.specRunner)
      .pipe(wiredep(options))
      .pipe($.inject(gulp.src(config.testlibraries),
        {name: 'inject:testlibraries', read: false}))
      .pipe($.inject(gulp.src(config.nonBowerScripts),
        {name: 'inject:nonBowerScripts', read: false}))
      .pipe($.inject(
        gulp.src(config.js)
        .pipe($.naturalSort())
        .pipe($.angularFilesort())
      ))
      .pipe($.inject(gulp.src(config.specHelpers),
        {name: 'inject:spechelpers', read: false}))
      .pipe($.inject(gulp.src(config.specs),
        {name: 'inject:specs', read: false}))
      .pipe($.inject(gulp.src(config.temp + config.templateCache.file),
        {name: 'inject:templates', read: false}))
      .pipe(gulp.dest(config.app));
  });
};
