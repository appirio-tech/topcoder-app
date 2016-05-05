import angular from 'angular'

(function () {
  'use strict'

  angular.module('blocks.logger').factory('logger', logger)

  logger.$inject = ['$log']

  /* @ngInject */
  function logger($log) {
    var service = {
      showToasts: false,

      error  : error,
      info   : info,
      success: success,
      warning: warning,
      debug  : debug,

      // straight to console bypass toastr
      log: $log.log
    }

    return service
    /////////////////////

    function error(message, data, title) {
      if (data) {
        message = `${message} ${JSON.stringify(data)}`
      }

      $log.error(message)

      if (window.NREUM) {
        window.NREUM.noticeError(message)
      }
    }

    function info(message, data, title) {
      $log.info('Info: ' + message, data ? data : '')
    }

    function success(message, data, title) {
      $log.info('Success: ' + message, data ? data : '')
    }

    function debug(message, data, title) {
      $log.debug('Debug: ' + message, data ? data : '')
    }

    function warning(message, data, title) {
      $log.warn('Warning: ' + message, data ? data : '')
    }
  }
}())
