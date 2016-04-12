import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('ImageService', ImageService)

  ImageService.$inject = ['CONSTANTS', 'ApiService', '$q', 'logger', '$rootScope', 'toaster']

  function ImageService(CONSTANTS, ApiService, $q, logger, $rootScope, toaster) {
    var api = ApiService.restangularV3

    var service = {
      createFileRecord: createFileRecord,
      getPresignedUrl: getPresignedUrl,
      uploadFileToS3: uploadFileToS3
    }
    return service

    function createFileRecord(S3Response) {
      return api.one('members', S3Response.userHandle).customPUT(S3Response.body, 'photo')
      .then(function(newPhotoURL) {
        $rootScope.$broadcast(CONSTANTS.EVENT_PROFILE_UPDATED)
        logger.info('Successfully made file record')
        toaster.pop('success', 'Success!', 'Your profile image has been updated.')
        return newPhotoURL
      })
      .catch(function(err) {
        logger.error('Error in creating file record for image', err)

        toaster.pop('error', 'Whoops!', 'There was an error uploading your profile image. Please try again later.')
      })
    }

    function getPresignedUrl(userHandle, file) {
      var deferred = $q.defer()

      api.one('members', userHandle).post('photoUploadUrl', {contentType: file.type})
      .then(function(response) {
        deferred.resolve({
          preSignedURL: response.preSignedURL,
          token: response.token,
          file: file,
          userHandle: userHandle
        })
      })
      .catch(function(err) {
        logger.error('Error getting presigned url for image', err)

        toaster.pop('error', 'Whoops!', 'There was an error uploading your profile image. Please try again later.')

        deferred.reject(err)
      })

      return deferred.promise
    }

    function uploadFileToS3(response) {
      var deferred = $q.defer()
      var xhr = new XMLHttpRequest()

      xhr.open('PUT', response.preSignedURL, true)
      xhr.setRequestHeader('Content-Type', response.file.type)

      xhr.onreadystatechange = function() {
        var status = xhr.status
        if (((status >= 200 && status < 300) || status === 304) && xhr.readyState === 4) {
          logger.info('Successfully uploaded file')

          deferred.resolve({
            userHandle: response.userHandle,
            body: {
              token: response.token,
              contentType: response.file.type
            }
          })
        } else if (status >= 400) {
          logger.error('Could not upload image to S3', status)

          toaster.pop('error', 'Whoops!', 'There was an error uploading your profile image. Please try again later.')

          deferred.reject({})
        }
      }

      xhr.onerror = function(err) {
        logger.error('Could not upload image to S3', err)

        toaster.pop('error', 'Whoops!', 'There was an error uploading your profile image. Please try again later.')

        deferred.reject(err)
      }

      xhr.send(response.file)

      return deferred.promise
    }
  }

})()
