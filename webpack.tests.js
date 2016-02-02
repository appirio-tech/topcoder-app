require('jquery')
require('angular')

require('phantomjs-polyfill')
require('angular-mocks')
require('./node_modules/bardjs/dist/bard.js')

require('angular-ui-router')
require('angular-cookies')
require('angular-storage')
require('angular-sanitize')
require('angular-messages')
require('angular-touch')
require('angular-jwt')
require('angular-filter')
require('angular-carousel')
require('angular-dropdowns')
require('angular-intro.js')
require('tc-angular-ellipsis')
require('moment')
require('d3')
require('lodash')
require('zepto/zepto.min.js')
require('restangular')
require('angucomplete-alt')
require('angularjs-toaster')
require('ng-dialog')
require('ng-notifications-bar')
require('xml2js')

require('appirio-tech-ng-ui-components')
require('./bower_components/appirio-tech-ng-iso-constants/dist/ng-iso-constants')

require('./bower_components/ng-busy/build/angular-busy')
require('./bower_components/angular-img-fallback/angular.dcb-img-fallback')

// Require Angular modules first
requireContextFiles(require.context('./app/', true, /^.*\.module\.js$/igm))
requireContextFiles(require.context('./app/', true, /^(?!index\.js$)(.*\.js)$/igm))

requireContextFiles(require.context('./tests/test-helpers/', true, /^(.*\.(js$))[^.]*$/igm))

// Require non-npm scripts
requireContextFiles(require.context('./assets/scripts/', true, /^(.*\.(js$))[^.]*$/igm))

function requireContextFiles(files) {
  const paths = files.keys()

  return paths.map(function(path) {
    return files(path)
  })
}