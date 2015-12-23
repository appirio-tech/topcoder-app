(function() {
  'use strict';

  angular.module('tc.services').factory('SubmissionsService', SubmissionsService);

  SubmissionsService.$inject = ['CONSTANTS', 'ApiService', '$q', '$log', 'toaster'];

  function SubmissionsService(CONSTANTS, ApiService, $q, $log, toaster) {
    var api = ApiService.restangularV3;

    var service = {
      getPresignedURL: getPresignedURL,
      uploadSubmissionFileToS3: uploadSubmissionFileToS3,
      updateSubmissionStatus: updateSubmissionStatus,
      recordCompletedSubmission: recordCompletedSubmission
    };

    return service;

    function getPresignedURL(body) {
      // var deferred = $q.defer();
      console.log('body: ', body)
      // return api.all('submissions').post('photoUploadUrl', {contentType: file.type})

      return api.all('submissions').customPOST(JSON.stringify({param: body}))
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

    function uploadSubmissionFileToS3(/* something that has file*/) {
      var file;
      var S3RequestOptions = {
        url: 'preSignedURL',
        method: 'PUT',
        headers: {},
        data: 'File Object'
      };

      return $http(S3RequestOptions)
        .then(function(response) {
          console.log('response from S3: ', response);
        })
        .catch(function(err) {
          console.log('error uploading to S3: ', err);
        });
    }

    function updateSubmissionStatus() {

    }

    function recordCompletedSubmission() {

    }
  };
})();
