var envFile = require('../config.js')();
var envConfig = envFile[process.env.ENVIRONMENT || 'development'];

module.exports = function(gulp, $, config, utilities) {
  'use strict';

  gulp.task('ngConstants', function() {
    utilities.log('Creating ng-constants file')

    return $.ngConstant({
        name: 'CONSTANTS',
        constants: envConfig,
        stream: true
      })
      .pipe($.rename('topcoder.constants.js'))
      .pipe(gulp.dest(config.app));
  });
};
