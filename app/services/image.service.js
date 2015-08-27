(function() {
  'use strict';

  angular.module('tc.services').factory('ImageService', ImageService);

  ImageService.$inject = ['CONSTANTS', 'ApiService'];

  function ImageService(CONSTANTS, ApiService) {
    var api = ApiService.restangularV3;

    var service = {
      createFileRecord: createFileRecord,
      getPresignedUrl: getPresignedUrl
    };
    return service;

    function createFileRecord(username, body) {
      return api.one('members', username).one('photo').customPUT(JSON.stringify(body));
    }

    function getPresignedUrl(username) {
      return api.one('members', username).one('photoUploadUrl').post();
    }
  };

})();
