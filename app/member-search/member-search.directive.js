import angular from 'angular'
import { MemberSearchApp } from 'topcoder-app-r/src/indexTest'

(function() {
  'use strict'

  angular.module('tc.search').directive('memberSearch', memberSearch)

  memberSearch.$inject = ['reactDirective']

  function memberSearch(reactDirective) {
    return reactDirective(MemberSearchApp)
  }
})()
