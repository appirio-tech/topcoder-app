import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tcUIComponents').directive('tcFpFileInput', ['$rootScope', 'CONSTANTS', 'logger', 'UserService', 'filepickerService', tcFPFileInput])

  function tcFPFileInput($rootScope, CONSTANTS, logger, UserService, filepickerService) {
    return {
      restrict: 'E',
      require: '^form',
      template: require('./tc-fp-file-input')(),
      scope: {
        labelText: '@',
        fieldId: '@',
        placeholder: '@',
        fileType: '@',
        showFileType: '=',
        mandatory: '=',
        maxFileSize: '@',
        fpServices: '@',
        buttonText: '@',
        setFileReference: '&',
        ngModel: '='
      },
      link: function(scope, element, attrs, formController) {
        // set filePath
        var userId = parseInt(UserService.getUserIdentity().userId)
        scope.filePath = scope.fieldId + '/'
        if (scope.fieldId.indexOf('ZIP') > -1) {
          scope.filePath += _.join([userId, scope.fieldId, (new Date()).valueOf()], '-') + '.zip'
        }
        // set extensions
        if (scope.fieldId.indexOf('ZIP') > -1) {
          scope.extensions = ".zip"
        } else if (scope.fieldId.indexOf('DESIGN_COVER') > -1) {
          scope.extensions = ".png,.jpeg,.jpg,.bmp"
        }

        // set default services
        scope.fpServices = scope.fpServices || "COMPUTER,GOOGLE_DRIVE,BOX,DROPBOX"
        scope.fpContainer = CONSTANTS.FILE_PICKER_SUBMISSION_CONTAINER_NAME || 'submission-staging-dev'

        // set max size
        scope.maxSize = 500*1024*1024

        var key, value;
        /*
         *pass original event
        */
        element.bind('change', function(event) {
            event.preventDefault()
            scope.onSuccess(event.originalEvent || event);
            $rootScope.$apply()
        });
        element = element.length ? element[0] : element;
        for (key in attrs.$attr){
            value = attrs.$attr[key]
            element.setAttribute(value, attrs[key])
        }
        filepickerService.constructWidget(element)

        scope.onSuccess = function (event) {
          debugger
          var fpFile = event.fpfile
          var _file = {
            name: scope.filename || fpFile.filename,
            container: fpFile.container || scope.fpContainer,
            path: fpFile.key,
            size: fpFile.size,
            mimetype: fpFile.mimetype
          }
          scope.ngModel = _file
          scope.setFileReference({file: _file, fieldId: scope.fieldId})
        }
      }
    }
  }
})()
