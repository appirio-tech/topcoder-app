var envFile   = require('../config.js')();
var envConfig = envFile[process.env.ENVIRONMENT || 'development'];
var RevAll    = require('gulp-rev-all');
var merge     = require('merge-stream');

module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('optimize', ['inject', 'test', 'ngConstants', 'images'], function() {
    utilities.log('Optimizing the JavaScript, CSS, and HTML');

    var assets = $.useref.assets({searchPath: ['.tmp', 'app', 'assets']});
    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = $.filter('**/*.css');
    var jsLibFilter = $.filter('**/' + config.optimized.vendor);
    var jsAppFilter = $.filter('**/' + config.optimized.app);

    var imageStream = gulp.src(config.temp + '/**/*.{svg,png,jpg,jpeg,gif}');
    var userefStream = gulp
      .src(config.indexHtml)
      .pipe($.plumber())
      .pipe($.inject(gulp.src(templateCache, {read: false}), {
        starttag: '<!-- inject:templates.js -->',
        endtag: '<!-- endinject -->',
        relative: true
      }))
      .pipe(assets)
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe(cssFilter.restore())
      .pipe(jsLibFilter)
      .pipe($.uglify())
      .pipe(jsLibFilter.restore())
      .pipe(jsAppFilter)
      .pipe($.if(!config.production && !config.qa, $.sourcemaps.init()))
      .pipe($.ngAnnotate())
      .pipe($.uglify())
      .pipe(jsAppFilter.restore())
      .pipe(assets.restore())
      .pipe($.useref())

    var revAll = new RevAll({
      prefix: envConfig.CONSTANTS.ASSET_PREFIX,
      dontRenameFile: [/^\/index.html/g]
    });

    return merge(userefStream, imageStream)
      .pipe(revAll.revision())
      .pipe($.if(!config.production && !config.qa, $.sourcemaps.write()))
      // Uncomment if you want to see the JSON file containing
      // the file mapping (e.g., "{"js/app.js": "js/app-a9bae026bc.js"}")
      // .pipe(gulp.dest(config.build))
      // .pipe(revAll.manifestFile())
      .pipe(gulp.dest(config.build));
  });
};
