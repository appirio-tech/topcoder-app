module.exports = function() {
  var app            = './app/';
  var assets         = './assets/';
  var report         = './report/';
  var specRunnerFile = 'specs.html';
  var temp           = './.tmp/';
  var wiredep        = require('wiredep');
  var bowerFiles     = wiredep({devDependencies: true})['js'];

  var config = {
    // File paths
    watchFiles: [
      temp + '**/*.{js,css,html}',
      app + '**/*.{js}'
    ],
    alljs: [
      app + '**/*.js',
      './*.js'
    ],
    build: './build/',
    app: app,
    assets: assets,
    css: temp + '**/*.css',
    fonts: assets + 'fonts/**/*.*',
    htmltemplates: [
      temp + '**/*.html',
      '!' + temp + 'index.html'
    ],
    images: assets + 'images/**/*.*',
    index: app + 'index.jade',
    indexHtml: temp + 'index.html',
    jade: app + '**/*.jade',
    js: [
      app + 'topcoder.module.js',
      app + 'topcoder.*.js',
      app + '**/*.module.js',
      app + '**/*.js',
      '!' + app + '**/*.spec.js'
    ],
    nonBowerScripts: assets + 'scripts/**/*.js',
    report: report,
    sass: assets + 'css/**/*.scss',
    temp: temp,

    // Optimized files
    optimized: {
      app: 'app.js',
      vendor: 'vendor.js'
    },

    // Template cache
    templateCache: {
      file: 'templates.js',
      options: {
        module: 'topcoder',
        standAlone: false
      }
    },

    // Bower and npm locations
    bower: {
      json: require('./bower.json'),
      directory: './bower_components/',
      ignorePath: '../..'
    },

    // specs.html: our HTML spec runner
    specRunner: app + specRunnerFile,
    specRunnerFile: specRunnerFile,
    testlibraries: [
      'node_modules/mocha/mocha.js',
      'node_modules/chai/chai.js',
      'node_modules/mocha-clean/index.js',
      'node_modules/sinon-chai/lib/sinon-chai.js'
    ],
    specs: [app + '**/*.spec.js'],

    // Karma and testing settings
    specHelpers: ['tests/test-helpers/*.js'],
    serverIntegrationSpecs: ['tests/server-integration/**/*.spec.js'],

    // AWS settings
    aws: {
      bucket: process.env.AWS_BUCKET,
      key: process.env.AWS_KEY,
      region: process.env.AWS_REGION,
      secret: process.env.AWS_SECRET
    },

    // Process.env variables
    production: process.env.ENVIRONMENT === 'production'
  };

  config.getWiredepDefaultOptions = function () {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  config.karma = getKarmaOptions();

  return config;

  ///////////////////

  function getKarmaOptions() {
    var options = {
      files: [].concat(
        bowerFiles,
        config.specHelpers,
        app + 'topcoder.module.js',
        app + 'topcoder.**.js',
        app + '**/*.module.js',
        app + '**/*.js',
        assets + 'scripts/**/*.js',
        temp + config.templateCache.file,
        config.serverIntegrationSpecs
      ),
      exclude: [],
      coverage: {
        dir: report + 'coverage',
        reports: [
          {type: 'html', subdir: 'report-html'},
          {type: 'lcov', subdir: 'report-lcov'},
          {type: 'text-summary'}
        ]
      },
      preprocessors: {}
    };
    options.preprocessors[app + '**/!(*.spec)+(.js)'] = ['coverage'];
    return options;
  }
};
