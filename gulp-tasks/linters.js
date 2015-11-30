var args = require('yargs').argv;

module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('vet', function() {
    utilities.log('Analyzing source with JSHint and JSCS');

    return gulp
      .src(config.alljs)
      .pipe($.if(args.verbose, $.print())) // gulp vet --verbose to trigger this line
      .pipe($.jscs())
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
      .pipe($.jshint.reporter('fail'));
  });
};
