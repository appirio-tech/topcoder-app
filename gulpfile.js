var gulp         = require('gulp');
var args         = require('yargs').argv;
var config       = require('./gulp.config')();
var del          = require('del');
var $            = require('gulp-load-plugins')({lazy: true});
var browserSync  = require('browser-sync');
var histFallback = require('connect-history-api-fallback');

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
    .pipe($.jade({pretty: false}))
    .pipe(gulp.dest(config.temp));
});

gulp.task('styles', ['clean-styles'], function() {
  log('Compiling Sass --> CSS');

  return gulp
    .src(config.sass)
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 2 version']}))
    .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(done) {
  var files = config.temp + '**/*.css';
  clean(files, done);
});

gulp.task('clean-html', function(done) {
  var files = config.temp + '**/*.html';
  clean(files, done);
});


gulp.task('sass-watcher', function() {
  gulp.watch([config.sass], ['styles']);
});

gulp.task('wiredep', function() {
  log('Injecting bower css and js files into index.jade');
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.app));
});

gulp.task('inject', ['wiredep', 'styles'], function() {
  log('Injecting app css into index.jade and calling wiredep when done')
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.app));
});

gulp.task('browser-sync', ['jade', 'styles'], function() {
  options = {
    server: {
      baseDir: [config.temp, config.app],
      // Enables serving index.html for Angular HTML5 mode
      middleware: [histFallback()],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  }

  browserSync(options);

  gulp.watch(config.watchFiles).on('change', browserSync.reload);

  gulp.watch(config.sass, ['jade', 'styles']);
});

//////////////

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
