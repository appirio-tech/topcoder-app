(function() {
  'use strict';

  angular.module('tc.services').factory('SubmissionsService', SubmissionsService);

  SubmissionsService.$inject = ['CONSTANTS', 'ApiService', '$q', '$log', 'toaster'];

  function SubmissionsService(CONSTANTS, ApiService, $q, $log, toaster) {
    var api = ApiService.restangularV3;

    var service = {
      getPresignedURL: getPresignedURL
    };

    return service;

    function getPresignedURL(body) {
      // var deferred = $q.defer();

      // return api.all('submissions').post('photoUploadUrl', {contentType: file.type})
      return api.all('submissions').customPOST(JSON.stringify(body))
      .then(function(response) {
        console.log('POST Response: ', response);
        // deferred.resolve({
        //   preSignedURL: response.preSignedURL,
        //   token: response.token,
        //   file: file,
        //   userHandle: userHandle
        // });
      })
      .catch(function(err) {
        console.log(err);
        $log.info('Error getting presigned url');
        toaster.pop('error', 'Whoops!', 'There was an error uploading your profile image. Please try again later.');
        // deferred.reject(err);
      });

      // return deferred.promise;
    }
  };
})();
