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

    function getPresignedURL(body, files) {
      console.log('body to get presigned url: ', body)

      return api.all('submissions').customPOST(JSON.stringify({param: body}))
      .then(function(response) {
        console.log('POST Response: ', response.plain());

        uploadSubmissionFileToS3(response.data.files, files);
      })
      .catch(function(err) {
        console.log(err);
        $log.info('Error getting presigned url');
        toaster.pop('error', 'Whoops!', 'There was an error uploading your submissions. Please try again later.');
      });
    }

    function uploadSubmissionFileToS3(filesWithPresignedURL, files) {
      var promises = filesWithPresignedURL.map(function(fileWithPresignedURL) {
        var S3RequestOptions = {
          url: fileWithPresignedURL.preSignedUploadUrl,
          method: 'PUT',
          // headers: {},

          // The file's type is the key, and the value is the actual file to upload
          data: files[filesWithPresignedURL.type]
        };

        return $http(S3RequestOptions);

      });

      return $q.all(promises)
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
