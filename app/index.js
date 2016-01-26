require('angular')
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
require('angular-ellipsis')
require('moment')
require('restangular')
require('lodash')
require('angucomplete-alt')
require('angularjs-toaster')
require('ng-dialog')
require('ng-notifications-bar')
require('ngsticky')

window.X2JS = require('../assets/scripts/xml2json')
require('angular-xml')

require('angular-intro.js')

require('appirio-tech-ng-ui-components')

require('../bower_components/appirio-tech-ng-iso-constants/dist/ng-iso-constants')
require('../bower_components/ng-busy/build/angular-busy')
require('../bower_components/angular-img-fallback/angular.dcb-img-fallback')

// Vendor styles
require('../node_modules/angular-carousel/dist/angular-carousel.css')


const requireContextFiles = function(files) {
  const paths = files.keys()

  return paths.map((path) => {
    return files(path)
  })
}

// Require all SCSS files
requireContextFiles(require.context('../assets/css/', true, /^(.*\.(scss$))[^.]*$/igm))

// Require non-npm scripts
requireContextFiles(require.context('../assets/scripts/', true, /^(.*\.(js$))[^.]*$/igm))

// Require Angular modules first
requireContextFiles(require.context('./', true, /^.*\.module\.js$/igm))

// Require JS files that aren't tests
requireContextFiles(require.context('./', true, /^(?:(?!\.spec\.js$).)*\.js$/igm))
