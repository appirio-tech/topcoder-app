'use strict';

var gulp     = require('gulp');
// rename to plugins once everything is modularized
var $  = require('gulp-load-plugins')({lazy: true});
var config   = require('./gulp.config')();
var taskPath = './gulp-tasks/';
var taskList = require('fs').readdirSync(taskPath);
var utilities = require(taskPath + 'utilities');
var envFile = require('./config.js')();
var envConfig = envFile[process.env.ENVIRONMENT || 'development'];

taskList.forEach(function(taskFile) {
  if (taskFile !== 'utilities.js') {
    require(taskPath + taskFile)(gulp, $, config, utilities);
  }
});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

var browserSync  = require('browser-sync');
var histFallback = require('connect-history-api-fallback');
var merge        = require('merge-stream');
var RevAll       = require('gulp-rev-all');

var awspublishRouter = require('gulp-awspublish-router');

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
    .pipe($.inject( // Sort the css (reset.css, then topcoder.css, then everything else)
      gulp.src([config.temp + 'assets/css/reset.css', config.css], {read: false})
      .pipe($.naturalSort('desc')),
      {ignorePath: '.tmp', addRootSlash: false}))
    .pipe(gulp.dest(config.app));
});

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

gulp.task('build', ['optimize', 'fonts'], function(done) {
  utilities.log('Building everything');
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

gulp.task('serve', ['inject', 'ngConstants'], function() {

  gulp.watch(config.sass, ['styles'])
    .on('change', function(event) { changeEvent(event); });

  gulp.watch(config.jade, ['jade'])
    .on('change', function(event) { changeEvent(event); });

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
    .on('change', function(event) { changeEvent(event); });

  gulp.watch(config.jade, ['jade'])
    .on('change', function(event) { changeEvent(event); });

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
    .on('change', function(event) { changeEvent(event); });

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

// gulp.task('test', ['vet', 'templatecache'], function(done) {
gulp.task('test', ['templatecache', 'ngConstants'], function(done) {
  utilities.startTests(true /* singleRun */, done);
});

gulp.task('autotest', ['vet', 'templatecache'], function(done) {
  utilities.startTests(false /* singleRun */, done);
});

gulp.task('deploy', ['build'], function() {
  var awsConfig = {
    params: {
      Bucket: config.aws.bucket
    },
    "accessKeyId": config.aws.key,
    "secretAccessKey": config.aws.secret
  };

  // create a new publisher
  var publisher = $.awspublish.create(awsConfig);

  utilities.log('Deploying to S3');

  var gzip = gulp.src(['build/**/*.js', 'build/**/*.css']).pipe($.awspublish.gzip())
    .pipe(awspublishRouter({
      cache: {
        cacheTime: 94608000,
        allowTransform: false,
        public: true
      },
      routes: {
        "^.+$": "$&"
      }
    }));

  var plain = gulp.src(['build/**/*', '!build/**/*.js', '!build/**/*.css'])
    .pipe(awspublishRouter({
      cache: {
        cacheTime: 94608000,
        allowTransform: false,
        public: true
      },
      routes: {
        "^.+\\.html": {
          cacheTime: 0
        },
        "^.+$": "$&"
      }
    }));

  return merge(gzip, plain)
    .pipe(publisher.cache())
    .pipe(publisher.publish())
    .pipe($.if(!config.production, publisher.sync()))
    .pipe($.awspublish.reporter());
});
