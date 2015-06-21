var gulp      = require('gulp');
var jshint    = require('gulp-jshint');
var jscs      = require('gulp-jscs');
var util      = require('gulp-util');
var gulpprint = require('gulp-print');

gulp.task('vet', function() {
  log('Analyzing source with JSHint and JSCS');

  return gulp
    .src([
      './app/**/*.js',
      './*.js'
    ])
    .pipe(gulpif(args.verbose, gulpprint()))
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(jshint.reporter('fail'));
});


//////////////

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        util.log(util.colors.blue(msg[item]));
      }
    }
  } else {
    util.log(util.colors.blue(msg));
  }
}


