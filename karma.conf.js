var wiredep = require('wiredep');

module.exports = function(config) {
  var bowerFiles = wiredep({devDependencies: true})['js'];

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // some available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],

    // list of files / patterns to load in the browser
    files: [].concat(
      'bower_components/bind-polyfill/index.js',
      bowerFiles,
      'tests/test-helpers/*.js',
      './app/topcoder.module.js',
      './app/topcoder.**.js',
      './app/**/*.module.js',
      './app/**/*.js',
      './assets/scripts/**/*.js',
      '.tmp/templates.js',
      'tests/server-integration/**/*.spec.js'
    ),

    // list of files to exclude
    exclude: ['package.js'],

    proxies: {
      '/': 'http://localhost:8888/'
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './app/**/!(*.spec)+(.js)': ['coverage']
    },
    // test results reporter to use
    // possible values: 'dots', 'progress', 'coverage'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['junit', 'progress', 'coverage'],

    junitReporter: {
      outputDir: 'report/junit',
      outputFile: 'test-results.xml',
      useBrowserName: false
    },

    coverageReporter: {
      dir: './report/coverage',
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'lcov', subdir: '.', file: 'lcov.info'},
        {type: 'text-summary'},
        {type: 'cobertura', subdir: 'cobertura', file: 'coverage.xml'}
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //        browsers: ['Chrome', 'ChromeCanary', 'FirefoxAurora', 'Safari', 'PhantomJS'],
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
