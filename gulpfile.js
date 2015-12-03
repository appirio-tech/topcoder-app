// Allows us to use the CoffeeScript gulpfile
require('./node_modules/appirio-gulp-tasks/node_modules/coffee-script/register');

var envFile     = require('./config.js')();
var envConfig   = envFile[process.env.ENVIRONMENT || 'development'];
var assetPrefix = envConfig.CONSTANTS.ASSET_PREFIX.length ? envConfig.CONSTANTS.ASSET_PREFIX : '/';

var config = {
  __dirname: __dirname
};

config.jade = {
  options: {
    pretty: true
  },
  data: envConfig,
  replace: {
    pattern: [/-->/g, ' -->']
  }
};

config.ngConstants = {
  defaultConstants: envConfig,
  destPath: 'app',
  fileName: 'topcoder.constants.js',
  options: {
    name: 'CONSTANTS'
  }
};

config.scss = {
  scssFiles: 'assets/css/**/*.scss',
  sourceOptions: {
    base: './'
  },
  autoprefixer: {
    browsers: ['last 2 version']
  },
  assetPrefix: assetPrefix + 'fonts',
  replace: /\/fonts/g
};

config.fonts = {
  srcFiles: [
    './assets/fonts/**/*.*',
    'bower_components/fontawesome/fonts/fontawesome-webfont.*'
  ]
};

config.images = {
  srcFiles: [
    './assets/images/**/*.*',
    '!./assets/images/skills/*.*'
  ],
  options: {
    optimizationLevel: 4
  }
};

config.templateCache = {
  files: [
    '.tmp/**/*.html',
    '!.tmp/index.html'
  ],
  fileName: 'templates.js',
  module: 'topcoder',
  standAlone: false,
  destPath: '.tmp',
  minifyHtml: {
    empty: true
  }
};

config.wiredep = {
  index: './app/index.jade',
  js: [
    './app/**/*.js',
    '!./app/**/*.spec.js'
  ],
  nonBowerScripts: './assets/scripts/**/*.js',
  destPath: './app/',
  css: '.tmp/**/*.css',
  specRunner: './app/specs.html',
  testLibraries: [
    'node_modules/appirio-gulp-tasks/node_modules/mocha/mocha.js',
    'node_modules/appirio-gulp-tasks/node_modules/chai/chai.js',
    'node_modules/appirio-gulp-tasks/node_modules/mocha-clean/index.js',
    'node_modules/appirio-gulp-tasks/node_modules/sinon-chai/lib/sinon-chai.js'
  ],
  specHelpers: [
    'tests/test-helpers/*.js',
    'app/blocks/logger/logEnhaner.js'
  ],
  specs: ['./app/**/*.spec.js'],
  templateCacheFile: '.tmp/' + config.templateCache.fileName
};

config.optimize = {
  assetPrefix: assetPrefix,
  writeSourceMaps: envConfig.CONSTANTS.ENVIRONMENT === 'development',
  userefOptions: {
    searchPath: ['.tmp', 'app', 'assets']
  },
  templateCacheFile: '.tmp/' + config.templateCache.fileName
};

config.karma = {
  serverIntegrationSpecs: ['tests/server-integration/**/*.spec.js']
};

config.serve = {
  dependencies: [
    'inject',
    'ng-constant'
  ],
  serveFolders: [
    '.tmp',
    './app/',
    './assets/'
  ],
  scssFiles: ['./assets/css/**/*.scss'],
  jadeFiles: ['./app/**/*.jade'],
  options: {
    port: 3141,
    reloadDelay: 1200,
    open: true,
    logPrefix: 'Topcoder-App',
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    files: [
      '.tmp/**/*.{js,css,html}',
      './app/**/*.js'
    ]
  },
  specOptions: {
    port: 3142,
    reloadDelay: 1200,
    open: true,
    logPrefix: 'Topcoder-App Specs',
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    startPath: 'app/specs.html',
    files: [
      '.tmp/**/*.{js,css,html}',
      './app/**/*.js'
    ]
  }
};

config.awsPublish = {
  bucket: process.env.AWS_BUCKET,
  key: process.env.AWS_KEY,
  region: process.env.AWS_REGION,
  secret: process.env.AWS_SECRET,
  files: ['build/**/*', '!build/index.html'],
  index: 'build/index.html',
  sync: envConfig.CONSTANTS.ENVIRONMENT !== 'production'

};

var loadTasksModule = require(__dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee');

loadTasksModule.loadTasks(config);
