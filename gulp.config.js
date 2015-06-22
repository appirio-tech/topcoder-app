module.exports = function() {
  var app = './app/';
  var temp = './.tmp/';

  var config = {
    temp: temp,

    // File Paths

    // WatchFiles
    watchFiles: [
      temp + '**/*.{js,css,html}',
      app + '**/*.{js,css,html}'
    ],

    // All JavaScript files to vet
    alljs: [
      app + '**/*.js',
      './*.js'
    ],
    app: app,
    css: temp + '**/*.css',
    index: app + 'index.jade',
    js: [
      app + '**/*.js',
      '!' + app + '**/*.spec.js'
    ],

    sass: app + '**/*.scss',
    jade: app + '**/*.jade',

    // Bower and npm locations
    bower: {
      json: require('./bower.json'),
      directory: './bower_components/',
      ignorePath: '../..'
    }
  };

  config.getWiredepDefaultOptions = function () {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;
};
