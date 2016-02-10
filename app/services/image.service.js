import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('ImageService', ImageService)

  ImageService.$inject = ['CONSTANTS', 'ApiService', '$q', '$log', '$rootScope', 'toaster']

  function ImageService(CONSTANTS, ApiService, $q, $log, $rootScope, toaster) {
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
        $log.info('Successfully made file record')
        toaster.pop('success', 'Success!', 'Your profile image has been updated.')
        return newPhotoURL
      })
      .catch(function(err) {
        $log.info('Error in creating file record')
        $log.error(err)
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
        $log.info('Error getting presigned url')
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

      // xhr version of the success callback
      xhr.onreadystatechange = function() {
        var status = xhr.status
        if (((status >= 200 && status < 300) || status === 304) && xhr.readyState === 4) {
          $log.info('Successfully uploaded file')
          deferred.resolve({
            userHandle: response.userHandle,
            body: {
              token: response.token,
              contentType: response.file.type
            }
          })
        } else if (status >= 400) {
          $log.error('Error uploading to S3 with status: ' + status)
          toaster.pop('error', 'Whoops!', 'There was an error uploading your profile image. Please try again later.')
          deferred.reject({})
        }
      }

      xhr.onerror = function(err) {
        $log.info('Error uploading to s3')
        toaster.pop('error', 'Whoops!', 'There was an error uploading your profile image. Please try again later.')
        deferred.reject(err)
      }

      xhr.send(response.file)

      return deferred.promise
    }
  }

})()
