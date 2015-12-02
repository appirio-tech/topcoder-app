'use strict';

var gulp     = require('gulp');
var plugins  = require('gulp-load-plugins')({lazy: true});

var config   = require('./gulp.config')();
var taskPath = './gulp-tasks/';
var taskList = require('fs').readdirSync(taskPath);

var utilities = require(taskPath + 'utilities');

taskList.forEach(function(taskFile) {
  if (taskFile !== 'utilities.js') {
    require(taskPath + taskFile)(gulp, plugins, config, utilities);
  }
});

gulp.task('help', plugins.taskListing);
gulp.task('default', ['help']);
