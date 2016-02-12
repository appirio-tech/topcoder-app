require('jquery')
require('angular')

require('phantomjs-polyfill')
require('angular-mocks')
require('./node_modules/bardjs/dist/bard.js')

require('auth0-js')
require('auth0-angular')
require('angular-ui-router')
require('angular-cookies')
require('angular-storage')
require('angular-sanitize')
require('angular-messages')
require('angular-touch')
require('angular-jwt')
require('angular-filter')
require('angular-carousel')
require('angular-intro.js')
require('angular-img-fallback')
require('tc-angular-ellipsis')
require('d3')
require('lodash')
require('zepto/zepto.min.js')
require('restangular')
require('angucomplete-alt')
require('angularjs-toaster')
require('ng-dialog')
require('xml2js')

require('appirio-tech-ng-ui-components')
require('appirio-tech-ng-iso-constants')

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
