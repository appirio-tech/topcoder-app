import angular from 'angular'

(function () {
  'use strict'

  angular.module('blocks.logger').factory('logger', logger)

  logger.$inject = ['$log']

  /* @ngInject */
  function logger($log) {
    var service = {
      showToasts: false,

      error: error,
      info: info,
      success: success,
      warning: warning,

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
        var err = new Error(message)

        window.NREUM.noticeError(err)
      }
    }

    function info(message, data, title) {
      $log.info('Info: ' + message, data)
    }

    function success(message, data, title) {
      $log.info('Success: ' + message, data)
    }

    function warning(message, data, title) {
      $log.warn('Warning: ' + message, data)
    }
  }
}())
