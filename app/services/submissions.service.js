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
        var deferred = $q.defer();
        var xhr = new XMLHttpRequest();

        xhr.open('PUT', fileWithPresignedURL.preSignedUploadUrl, true);
        xhr.setRequestHeader('Content-Type', fileWithPresignedURL.mediaType);

        // xhr version of the success callback
        xhr.onreadystatechange = function() {
          var status = xhr.status;
          if (((status >= 200 && status < 300) || status === 304) && xhr.readyState === 4) {
            $log.info('Successfully uploaded file');
            console.log(xhr.responseText);
            var xhrResponse = xhr.responseText;
            deferred.resolve(xhrResponse);

          } else if (status >= 400) {
            $log.error('Error uploading to S3 with status: ' + status);
            toaster.pop('error', 'Whoops!', 'There was an error uploading your files. Please try again later.');
            deferred.reject(err);
          }
        };

        xhr.onerror = function(err) {
          $log.info('Error uploading to s3');
          toaster.pop('error', 'Whoops!', 'There was an error uploading your files. Please try again later.');
          deferred.reject(err);
        }

        xhr.send(files[fileWithPresignedURL.type]);

        return deferred.promise;
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
