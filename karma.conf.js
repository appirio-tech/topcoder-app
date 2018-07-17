require('./node_modules/coffee-script/register')

var webpackConfig = require('appirio-tech-webpack-config')({
  dirname: __dirname
})

// Make jQuery globally available
webpackConfig.module.loaders.push({
  test: /jquery-1\.10\.2\.js$/,
  loader: 'expose?jQuery'
})
process.env.ACCOUNTS_APP_URL = `http://accounts.${process.env.domain}/tc`

module.exports = function(config) {
  config.set({
    // Base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],

    // List of files / patterns to load in the browser
    files: [
      './node_modules/babelify/node_modules/babel-core/browser-polyfill.js',
      './node_modules/babel-polyfill/dist/polyfill.js',
      './node_modules/jquery/dist/jquery.js',
      'webpack.tests.js'
    ],

    exclude: ['package.js', 'index.js'],

    proxies: {
      '/': 'http://localhost:8888/'
    },

    // Preprocess matching files before serving them to the browser
    preprocessors: {
      './app/**/!(*.spec)+(.js)': ['webpack', 'coverage'],
      'webpack.tests.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: {
        colors: true,
        hash: false,
        version: true,
        timings: true,
        assets: false,
        chunks: false,
        source: true,
        errorDetails: true,
        chunkOrigins: true,
        children: false
      }
    },

    // Possible values: 'dots', 'progress', 'coverage'
    // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
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

    // Web server port
    port: 9876,

    // Enable / disable colors in the output (reporters and logs)
    colors: true,

    // Level of logging
    // Possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],
    browsers: [ 'PhantomJS' ],

    // Continuous Integration mode
    // If true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
