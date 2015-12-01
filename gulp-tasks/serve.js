var browserSync  = require('browser-sync');
var histFallback = require('connect-history-api-fallback');

module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('serve', ['inject', 'ngConstants'], function() {
    gulp.watch(config.sass, ['styles'])
      .on('change', function(event) { utilities.changeEvent(event); });

    gulp.watch(config.jade, ['templatecache'])
      .on('change', function(event) { utilities.changeEvent(event); });

    var options = {
      server: {
        baseDir: [config.temp, config.app, config.assets],
        // Enables serving index.html for Angular HTML5 mode
        middleware: [histFallback()],
        routes: {
          '/bower_components': 'bower_components'
        }
      },
      files: config.watchFiles,
      ghostMode: {
        clicks: true,
        location: false,
        forms: true,
        scroll: true
      },
      logPrefix: 'Topcoder-Account',
      notify: false,
      port: 3000,
      reloadDelay: 1000
    };

    browserSync(options);

  });

  gulp.task('serve-specs', ['build-specs'], function() {
    utilities.log('Run the spec runner');

    gulp.watch(config.sass, ['styles'])
      .on('change', function(event) { utilities.changeEvent(event); });

    gulp.watch(config.jade, ['templatecache'])
      .on('change', function(event) { utilities.changeEvent(event); });

    var options = {
      server: {
        baseDir: ['./'],
        // Enables serving index.html for Angular HTML5 mode
        middleware: [histFallback()],
        routes: {
          '/bower_components': 'bower_components'
        }
      },
      files: config.watchFiles,
      ghostMode: {
        clicks: true,
        location: false,
        forms: true,
        scroll: true
      },
      logPrefix: 'Topcoder-Account',
      notify: false,
      reloadDelay: 1000,
      startPath: config.app + config.specRunnerFile
    };

    browserSync(options);
  });

  gulp.task('serve-build', ['build'], function() {
    // TODO: Figure out why watch doesn't work. Jade running before wiredep?

    gulp.watch([config.sass, config.js, config.jade], ['optimize', browserSync.reload])
      .on('change', function(event) { utilities.changeEvent(event); });

    var options = {
      server: {
        baseDir: config.build,
        // Enables serving index.html for Angular HTML5 mode
        middleware: [histFallback()]
      },
      files: [],
      ghostMode: {
        clicks: true,
        location: false,
        forms: true,
        scroll: true
      },
      logPrefix: 'Topcoder-Account',
      notify: false,
      reloadDelay: 1000
    };

    browserSync(options);

  });
};
