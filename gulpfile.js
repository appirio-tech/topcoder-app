var gulp         = require('gulp');
var args         = require('yargs').argv;
var config       = require('./gulp.config')();
var del          = require('del'); // rm -rf
var $            = require('gulp-load-plugins')({lazy: true});
var browserSync  = require('browser-sync');
var histFallback = require('connect-history-api-fallback');
var merge        = require('merge-stream');

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function() {
  log('Analyzing source with JSHint and JSCS');

  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print())) // gulp vet --verbose to trigger this line
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('jade', ['clean-html'], function() {
  log('Compiling Jade --> HTML');

  return gulp
    .src(config.jade)
    .pipe($.plumber())
    .pipe($.jade({pretty: true}))
    .pipe($.replace(/-->/g, ' -->'))
    .pipe(gulp.dest(config.temp));
});

gulp.task('styles', ['clean-styles'], function() {
  log('Compiling Sass --> CSS');

  return gulp
    .src(config.sass, {base: './'})
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 2 version']}))
    .pipe(gulp.dest(config.temp));
});

gulp.task('sass-watcher', function() {
  gulp.watch([config.sass], ['styles']);
});

gulp.task('fonts', ['clean-fonts'], function() {
  log('Copying fonts');

  return gulp
    .src([config.fonts, 'bower_components/fontawesome/fonts/fontawesome-webfont.*'])
    .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function() {
  log('Copying and compressing the images');

  return gulp
    .src(config.images)
    .pipe($.imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean', function(done) {
  var delconfig = [].concat(config.build, config.temp);
  log('Cleaning: ' + $.util.colors.blue(delconfig));
  del(delconfig, done);
});
gulp.task('clean-fonts', function(done) {
  clean(config.build + 'fonts/**/*.*', done);
});
gulp.task('clean-images', function(done) {
  clean(config.build + 'images/**/*.*', done);
});
gulp.task('clean-styles', function(done) {
  clean(config.temp + '**/*.css', done);
});
gulp.task('clean-html', function(done) {
  clean(config.temp + '**/*.html', done);
});
gulp.task('clean-code', function(done) {
  var files = [].concat(
    config.temp + '**/*.js',
    config.build + '**/*.html',
    config.build + 'js/**/*.js',
    config.build + 'styles/**/*.css'
  );
  clean(files, done);
});

gulp.task('copy-html', function() {
  log('Moving app html files to .tmp');

  return gulp
    .src([config.app + '**/*.html', '!' + config.app + 'specs.html'])
    .pipe(gulp.dest(config.temp));
});

gulp.task('templatecache', ['clean-code', 'jade', 'copy-html'], function() {
  log('Creating AngularJS $templateCache');

  return gulp
    .src(config.htmltemplates)
    .pipe($.minifyHtml({empty: true}))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
      ))
    .pipe(gulp.dest(config.temp));
});

gulp.task('ngConstants', function() {
  var envFile = require('./config.js')();
  var envConfig = envFile[process.env.ENVIRONMENT || 'development'];

  return $.ngConstant({
      name: 'CONSTANTS',
      dest: 'topcoder.constants.js',
      constants: envConfig,
      stream: true
    })
    .pipe(gulp.dest(config.app));
});

gulp.task('wiredep', ['jade'], function() {
  log('Injecting bower css/js and app js files into index.jade');
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(
      gulp.src(config.js)
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
  log('Injecting app css into index.jade');

  return gulp
    .src(config.index)
    .pipe($.inject( // Sort the css (reset.css, then topcoder.css, then everything else)
      gulp.src([config.temp + 'assets/css/reset.css', config.css], {read: false})
      .pipe($.naturalSort('desc')),
      {ignorePath: '.tmp', addRootSlash: false}))
    .pipe(gulp.dest(config.app));
});

gulp.task('optimize', ['inject', 'test', 'ngConstants'], function() {
  log('Optimizing the JavaScript, CSS, and HTML');

  var assets = $.useref.assets({searchPath: ['.tmp', 'app', 'assets']});
  var templateCache = config.temp + config.templateCache.file;
  var cssFilter = $.filter('**/*.css');
  var jsLibFilter = $.filter('**/' + config.optimized.vendor);
  var jsAppFilter = $.filter('**/' + config.optimized.app);

  return gulp
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
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.if(!config.production && !config.qa, $.sourcemaps.write()))
    // Uncomment if you want to see the JSON file containing
    // the file mapping (e.g., "{"js/app.js": "js/app-a9bae026bc.js"}")
    // .pipe(gulp.dest(config.build))
    // .pipe($.rev.manifest())
    .pipe(gulp.dest(config.build));
});

gulp.task('build', ['optimize', 'images', 'fonts'], function() {
  log('Building everything');

  var msg = {
    title: 'gulp build',
    subtitle: 'Deployed to the build folder',
    message: 'Running `gulp serve-build`'
  };
  del(config.temp);
  log(msg);
});

gulp.task('build-specs', ['templatecache'], function() {
  log('Building the spec runner');

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
    .pipe($.inject(gulp.src(config.js)))
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
    notify: true,
    port: 3000,
    reloadDelay: 500
  };

  browserSync(options);

});

gulp.task('serve-specs', ['build-specs'], function() {
  log('Run the spec runner');

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
    notify: true,
    reloadDelay: 1000
  };

  browserSync(options);

});

// gulp.task('test', ['vet', 'templatecache'], function(done) {
gulp.task('test', ['templatecache', 'ngConstants'], function(done) {
  startTests(true /* singleRun */, done);
});

gulp.task('autotest', ['vet', 'templatecache'], function(done) {
  startTests(false /* singleRun */, done);
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

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=94608000, no-transform, public'
  };

  log('Deploying to S3');

  var gzip = gulp.src(['build/**/*.js', 'build/**/*.css']).pipe($.awspublish.gzip());
  var plain = gulp.src([ 'build/**/*', '!build/**/*.js' ]);

  return merge(gzip, plain)
    .pipe(publisher.publish(headers))
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe($.awspublish.reporter());

  // return gulp
  //   .src('./build/**/*')
  //   .pipe($.awspublish.gzip({ext: '.gz'}))
  //   // If not specified it will set x-amz-acl to public-read by default
  //   .pipe(publisher.publish(headers))
  //   .pipe(publisher.sync())
  //   // print upload updates to console
  //   .pipe($.awspublish.reporter());
});

//////////////

function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path, done);
}

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

function startTests(singleRun, done) {
  var karma = require('karma').server;
  var excludeFiles = [];
  var serverSpecs = config.serverIntegrationSpecs;

  excludeFiles = serverSpecs;

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    exclude: excludeFiles,
    singleRun: !!singleRun
  }, karmaCompleted);

  function karmaCompleted(karmaResult) {
    log('Karma completed!');
    if (karmaResult === 1) {
      done('karma: tests failed with code ' + karmaResult);
    } else {
      done();
    }
  }
}
