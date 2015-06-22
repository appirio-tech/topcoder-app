module.exports = function() {
  var app = './app/';
  var temp = './.tmp/';

  var config = {
    temp: temp,

    // File Paths

    // WatchFiles
    watchFiles: [
      temp + '**/*.{js,css,html}'
    ],

    // All JavaScript files to vet
    alljs: [
      app + '**/*.js',
      './*.js'
    ],
    app: app,
    index: app + 'index.html',
    js: [
      app + '**/*.js',
      '!' + app + '**/*.spec.js'
    ],

    sass: app + 'assets/css/login.scss',
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
