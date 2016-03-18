import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.search').directive('memberSearch', memberSearch)

  var memberSearchPage = require('topcoder-app-r/src/indexTest').default

  memberSearch.$inject = ['reactDirective']

  function memberSearch(reactDirective) {
    return reactDirective(memberSearchPage)
  }
})()
