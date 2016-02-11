import angular from 'angular'
import FooterController from './footer/footer.controller'

(function() {
  'use strict'

  angular
    .module('tc.layout', [])
    .controller('FooterController', FooterController)
})()
