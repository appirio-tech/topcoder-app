import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('SubmissionsService', SubmissionsService)

  SubmissionsService.$inject = ['CONSTANTS', 'ApiService', '$q', 'logger', 'toaster']

  function SubmissionsService(CONSTANTS, ApiService, $q, logger, toaster) {
    var api = ApiService.getApiServiceProvider('SUBMISSIONS')

    var service = {
      startSubmission: startSubmission,
      processSubmission: processSubmission
      // uploadSubmissionFileToS3: uploadSubmissionFileToS3,
      // updateSubmissionStatus: updateSubmissionStatus,
      // recordCompletedSubmission: recordCompletedSubmission
    }

    return service

    function startSubmission(body, progressCallback) {
      return api.all('submissions').customPOST(body)
      .then(function(response) {
        //progressCallback.call(progressCallback, 'PREPARE', 100)

        // uploadSubmissionFileToS3(response, response.data.files, files, progressCallback)

        logger.debug(response)

        processSubmission(response, progressCallback)
      })
      .catch(function(err) {
        logger.error('Could not get presigned url', err)

        progressCallback.call(progressCallback, 'ERROR', err)

        toaster.pop('error', 'Whoops!', 'There was an error uploading your submissions. Please try again later.')
      })
    }

    /**
    function uploadSubmissionFileToS3(presignedURLResponse, filesWithPresignedURL, files, progressCallback) {

      var promises = filesWithPresignedURL.map(function(fileWithPresignedURL) {
        var deferred = $q.defer()
        var xhr = new XMLHttpRequest()

        xhr.open('PUT', fileWithPresignedURL.preSignedUploadUrl, true)
        xhr.setRequestHeader('Content-Type', fileWithPresignedURL.mediaType)

        xhr.upload.addEventListener('progress', function(oEvent) {
          // Compute progress information only if the total size is known
          if (oEvent.lengthComputable) {
            var percentComplete = oEvent.loaded / oEvent.total

            if (progressCallback && typeof progressCallback === 'function') {
              progressCallback.call(progressCallback, 'UPLOAD', {
                file: fileWithPresignedURL.preSignedUploadUrl,
                progress: percentComplete*100
              })
            }
          }
        })

        xhr.onreadystatechange = function() {
          var status = xhr.status
          if (((status >= 200 && status < 300) || status === 304) && xhr.readyState === 4) {
            logger.info('Successfully uploaded file')

            deferred.resolve()

          } else if (status >= 400) {
            logger.error('Error uploading to S3 with status', status)

            toaster.pop('error', 'Whoops!', 'There was an error uploading your files. Please try again later.')

            deferred.reject({})
          }
        }

        xhr.onerror = function(err) {
          logger.error('Error uploading to s3', err)

          toaster.pop('error', 'Whoops!', 'There was an error uploading your files. Please try again later.')

          deferred.reject(err)
        }

        xhr.send(files[fileWithPresignedURL.type])

        return deferred.promise
      })

      return $q.all(promises)
        .then(function(response) {
          progressCallback.call(progressCallback, 'UPLOAD', 100)

          // Update and start processing
          updateSubmissionStatus(presignedURLResponse.plain(), progressCallback)

        })
        .catch(function(err) {
          progressCallback.call(progressCallback, 'ERROR', err)

          logger.error('Could not upload to S3', err)
        })
    }

    function updateSubmissionStatus(body, progressCallback) {
      // Pass data from upload to S3
      body.data.files.forEach(function(file) {
        file.status = 'UPLOADED'
      })

      return api.one('submissions', body.id).customPUT(body)
      .then(function(response) {
        logger.info('Successfully updated file statuses')

        recordCompletedSubmission(response.plain(), progressCallback)
      })
      .catch(function(err) {
        logger.error('Could not update file statuses', err)

        progressCallback.call(progressCallback, 'ERROR', err)
      })
    }
    */

    function processSubmission(body, progressCallback) {
      // Once all uploaded, make record and begin processing
      return api.one('submissions', body.id).customPOST(body, 'process')
      .then(function(response) {
        logger.info('Successfully made file record. Beginning processing')

        progressCallback.call(progressCallback, 'FINISH', 100)

        return response
      })
      .catch(function(err) {
        logger.error('Could not start processing', err)

        progressCallback.call(progressCallback, 'ERROR', err)
      })
    }
  }
})()
