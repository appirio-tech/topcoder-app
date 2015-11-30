var util = require('gulp-util');
var del  = require('del'); // rm -rf

exports.changeEvent = function(event) {
  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  this.log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

exports.clean = function(path, done) {
  this.log('Cleaning: ' + util.colors.blue(path));
  del(path, done);
}

exports.log = function(msg) {
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

exports.startTests = function(singleRun, done) {
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

return module.exports;
