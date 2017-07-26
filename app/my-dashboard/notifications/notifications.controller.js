import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.myDashboard').controller('NotificationsController', NotificationsController)

  function NotificationsController () {
    var vm = this
    vm.news = []

    activate()

    function activate() {
      vm.news = require('./news.json')
    }
  }
})()
