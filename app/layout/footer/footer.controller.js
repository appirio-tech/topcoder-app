import angular from 'angular'
import moment from 'moment'

(function() {
  'use strict'

  angular.module('tc.layout').controller('FooterController', FooterController)

  FooterController.$inject = []

  function FooterController() {
    var vm = this

    vm.currentYear = moment().format('YYYY')
  }
})()
