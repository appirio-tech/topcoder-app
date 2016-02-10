import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('SubmissionsService', SubmissionsService)

  SubmissionsService.$inject = ['CONSTANTS', 'ApiService', '$q', '$log', 'toaster']

  function SubmissionsService(CONSTANTS, ApiService, $q, $log, toaster) {
    var api = ApiService.getApiServiceProvider('SUBMISSIONS')

    var service = {
      getPresignedURL: getPresignedURL,
      uploadSubmissionFileToS3: uploadSubmissionFileToS3,
      updateSubmissionStatus: updateSubmissionStatus,
      recordCompletedSubmission: recordCompletedSubmission
    }

    return service

    function getPresignedURL(body, files, progressCallback) {
      $log.info('Body of request for presigned url: ')
      $log.info(body)

      return api.all('submissions').customPOST(body)
      .then(function(response) {
        $log.info('POST/Presigned URL Response: ')
        $log.info(response.plain())
        progressCallback.call(progressCallback, 'PREPARE', 100)
        uploadSubmissionFileToS3(response, response.data.files, files, progressCallback)
      })
      .catch(function(err) {
        $log.info(err)
        $log.info('Error getting presigned url')
        progressCallback.call(progressCallback, 'ERROR', err)
        toaster.pop('error', 'Whoops!', 'There was an error uploading your submissions. Please try again later.')
      })
    }

    function uploadSubmissionFileToS3(presignedURLResponse, filesWithPresignedURL, files, progressCallback) {

      var promises = filesWithPresignedURL.map(function(fileWithPresignedURL) {
        var deferred = $q.defer()
        var xhr = new XMLHttpRequest()

        xhr.open('PUT', fileWithPresignedURL.preSignedUploadUrl, true)
        xhr.setRequestHeader('Content-Type', fileWithPresignedURL.mediaType)

        xhr.upload.addEventListener('progress', function(oEvent) {
          if (oEvent.lengthComputable) {
            var percentComplete = oEvent.loaded / oEvent.total
            // console.log("Completed " + percentComplete)
            if (progressCallback && typeof progressCallback === 'function') {
              progressCallback.call(progressCallback, 'UPLOAD', {
                file: fileWithPresignedURL.preSignedUploadUrl,
                progress: percentComplete*100
              })
            }
            // ...
          } else {
            // Unable to compute progress information since the total size is unknown
          }
        })

        // xhr version of the success callback
        xhr.onreadystatechange = function() {
          var status = xhr.status
          if (((status >= 200 && status < 300) || status === 304) && xhr.readyState === 4) {
            $log.info('Successfully uploaded file')
            $log.info('xhr response: ', xhr.responseText)

            // updateSubmissionStatus and then resolve?
            deferred.resolve()

          } else if (status >= 400) {
            $log.error('Error uploading to S3 with status: ' + status)
            toaster.pop('error', 'Whoops!', 'There was an error uploading your files. Please try again later.')
            deferred.reject({})
          }
        }

        xhr.onerror = function(err) {
          $log.info('Error uploading to s3')
          toaster.pop('error', 'Whoops!', 'There was an error uploading your files. Please try again later.')
          deferred.reject(err)
        }

        xhr.send(files[fileWithPresignedURL.type])

        return deferred.promise
      })

      return $q.all(promises)
        .then(function(response) {
          $log.info('response from S3: ')
          $log.info(response)
          $log.info('response to use .save restnagular with: ')
          $log.info(presignedURLResponse)
          progressCallback.call(progressCallback, 'UPLOAD', 100)
          // Update and start processing
          updateSubmissionStatus(presignedURLResponse.plain(), progressCallback)

        })
        .catch(function(err) {
          progressCallback.call(progressCallback, 'ERROR', err)
          $log.info('error uploading to S3: ')
          $log.info(err)
        })
    }

    function updateSubmissionStatus(body, progressCallback) {
      // Pass data from upload to S3
      body.data.files.forEach(function(file) {
        file.status = 'UPLOADED'
      })

      return api.one('submissions', body.id).customPUT(body)
      .then(function(response) {
        $log.info('Successfully updated file statuses')
        recordCompletedSubmission(response.plain(), progressCallback)
      })
      .catch(function(err) {
        $log.info('Error updating file statuses')
        $log.error(err)
        progressCallback.call(progressCallback, 'ERROR', err)
      })
    }

    function recordCompletedSubmission(body, progressCallback) {
      // Once all uploaded, make record and begin processing
      return api.one('submissions', body.id).customPOST(body, 'process')
      .then(function(response) {
        $log.info('Successfully made file record. Beginning processing')
        $log.info('response from process call: ')
        $log.info(response)
        progressCallback.call(progressCallback, 'FINISH', 100)
      })
      .catch(function(err) {
        $log.info('Error in starting processing')
        $log.error(err)
        progressCallback.call(progressCallback, 'ERROR', err)
      })
    }
  }
})()
