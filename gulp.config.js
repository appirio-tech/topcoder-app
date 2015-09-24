module.exports = function() {
  var app            = './app/';
  var assets         = './assets/';
  var report         = './report/';
  var specRunnerFile = 'specs.html';
  var temp           = './.tmp/';
  var wiredep        = require('wiredep');
  var bowerFiles     = wiredep({devDependencies: true})['js'];
  var e2e            ='./tests/e2e/';
  var curEnv         = process.env.ENVIRONMENT || 'development';

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
      app + '**/*.js',
      '!' + app + '**/*.spec.js'
    ],
    nonBowerScripts: assets + 'scripts/**/*.js',
    report: report,
    sass: assets + 'css/**/*.scss',
    temp: temp,
    curEnv : curEnv,
    e2e : e2e,
    e2eApp : e2e + 'app',
    e2eTests:[ e2e+'**/**/*.data.js',
               e2e + '**/**/*.object.js',
               e2e + '**/**/*.spec.js',
               e2e + '/conf.js',
               '!' + e2e + '**/**/*.development.data.js',
               '!' + e2e + '**/**/*.qa.data.js',
               '!' + e2e + '**/**/*.production.data.js'
               ],
    //process.env.ENVIRONMENT || 'development',           
    e2eTestsDataFiles : e2e +'app/**/*.'+ curEnv +'.data.js',
    e2eTemp : temp + 'tests/e2e',
    e2eTempFiles : ['.tmp/tests/e2e/app/*.js'],

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
      exclude: ['package.js'],
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
    specHelpers: ['tests/test-helpers/*.js', 'app/blocks/logger/logEnhaner.js'],
    serverIntegrationSpecs: ['tests/server-integration/**/*.spec.js'],

    // AWS settings
    aws: {
      bucket: process.env.AWS_BUCKET,
      key: process.env.AWS_KEY,
      region: process.env.AWS_REGION,
      secret: process.env.AWS_SECRET
    },

    // Process.env variables
    production: process.env.ENVIRONMENT === 'production',
    qa: process.env.ENVIRONMENT === 'qa'
  };

  config.getWiredepDefaultOptions = function () {
    var options = {
      bowerJson: config.bower.json,
      exclude: config.bower.exclude,
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
      exclude: ['package.js'],
      coverage: {
        dir: report + 'coverage',
        reporters: [
          {type: 'html', subdir: 'report-html'},
          {type: 'lcov', subdir: '.', file: 'lcov.info'},
          {type: 'text-summary'}
        ]
      },
      preprocessors: {}
    };
    options.preprocessors[app + '**/!(*.spec)+(.js)'] = ['coverage'];
    return options;
  }
};
