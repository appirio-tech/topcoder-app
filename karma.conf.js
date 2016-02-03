require('./node_modules/coffee-script/register')

process.env.ENV = 'DEV'

var webpackConfig = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.html'
})

// Make jQuery globally available
webpackConfig.module.loaders.push({
  test: /jquery-1\.10\.2\.js$/,
  loader: 'expose?jQuery'
})
webpackConfig.devtool = 'inline-source-map'

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // some available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],

    // list of files / patterns to load in the browser
    files: [
      './node_modules/jquery/dist/jquery.js',
      'webpack.tests.js'
    ],

    // list of files to exclude
    exclude: ['package.js', 'index.js'],

    proxies: {
      '/': 'http://localhost:8888/'
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './app/**/!(*.spec)+(.js)': ['coverage'],
      'webpack.tests.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

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
    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
