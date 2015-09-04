(function() {
  'use strict';

  angular.module('tc.services').factory('ImageService', ImageService);

  ImageService.$inject = ['CONSTANTS', 'ApiService', '$q', '$log', '$rootScope'];

  function ImageService(CONSTANTS, ApiService, $q, $log, $rootScope) {
    var api = ApiService.restangularV3;

    var service = {
      createFileRecord: createFileRecord,
      getPresignedUrl: getPresignedUrl,
      uploadFileToS3: uploadFileToS3
    };
    return service;

    function createFileRecord(S3Response) {
      return api.one('members', S3Response.userHandle).customPUT(JSON.stringify(S3Response.body), 'photo', {}, {'Content-Type': S3Response.fileType})
      .then(function() {
        // Show notification that upload was successful
        $rootScope.$broadcast(CONSTANTS.EVENT_PROFILE_UPDATED);
        $log.info('Successfully made file record');

      })
      .catch(function(err) {
        $log.info('Error in creating file record');
        $log.error(err);
      });
    }

    function getPresignedUrl(userHandle, file) {
      var deferred = $q.defer();

      api.one('members', userHandle).customPOST(undefined, 'photoUploadUrl', {}, {'Content-Type': file.type})
      .then(function(response) {
        deferred.resolve({
          preSignedURL: response.preSignedURL,
          token: response.token,
          file: file,
          userHandle: userHandle
        });
      })
      .catch(function(err) {
        $log.info('Error getting presigned url');
        deferred.reject(err);
      });

      return deferred.promise;
    }

    function uploadFileToS3(response) {
      var deferred = $q.defer();
      var xhr = new XMLHttpRequest();
      var formData = new FormData();
      formData.append('userimage', response.file, response.file.name);

      xhr.open('PUT', response.preSignedURL, true);
      xhr.setRequestHeader('Content-Type', 'multipart/form-data');

      // xhr version of the success callback
      xhr.onreadystatechange = function() {
        var status = xhr.status;
        if (((status >= 200 && status < 300) || status === 304) && xhr.readyState === 4) {
          $log.info('Successfully uploaded file')
          deferred.resolve({
            userHandle: response.userHandle,
            body: { param: { token: response.token } },
            fileType: response.file.type
          });
        }
      };

      xhr.onerror = function(err) {
        $log.info('Error uploading to s3');
        deferred.reject(err);
      }

      xhr.send(formData);

      return deferred.promise;
    }
  };

})();
