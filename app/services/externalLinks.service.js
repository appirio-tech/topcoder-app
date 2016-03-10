import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tc.services').factory('ExternalWebLinksService', ExternalWebLinksService)

  ExternalWebLinksService.$inject = ['$log', 'CONSTANTS', 'ApiService', '$q']

  function ExternalWebLinksService($log, CONSTANTS, ApiService, $q) {
    $log = $log.getInstance('ExternalWebLinksService')

    var memberApi = ApiService.getApiServiceProvider('MEMBER')

    var service = {
      getLinks: getLinks,
      addLink: addLink,
      removeLink: removeLink
    }
    return service

    /////////////////////////

    function getLinks(userHandle, includePending) {
      return memberApi.one('members', userHandle)
        .withHttpConfig({skipAuthorization: true})
        .customGET('externalLinks')
        .then(function(links) {
          links = links.plain()
          if (!includePending) {
            _.remove(links, function(l) {
              return _.get(l, 'synchronizedAt') === 0
            })
          }
          // add provider type as weblink
          links.forEach(function(l, i, array) {
            array[i].provider = 'weblink'
            if (array[i].synchronizedAt === 0) {
              array[i].status = 'PENDING'
            }
          })
          return links
        })
    }

    function addLink(userHandle, url) {
      return $q(function(resolve, reject) {
        memberApi.one('members', userHandle).customPOST({'url': url}, 'externalLinks')
        .then(function(resp) {
          var _newLink = {
            provider: 'weblink',
            data: resp
          }
          _newLink.data.status = 'PENDING'
          resolve(_newLink)
        })
        .catch(function(resp) {
          var errorStatus = 'FATAL_ERROR'
          $log.error('Error adding weblink: ' + resp.data.result.content)
          if (resp.data.result && resp.data.result.status === 400) {
            errorStatus = 'WEBLINK_ALREADY_EXISTS'
          }
          reject({
            status: errorStatus,
            msg: resp.data.result.content
          })
        })
      })
    }

    function removeLink(userHandle, key) {
      return $q(function($resolve, $reject) {
        return memberApi.one('members', userHandle).one('externalLinks', key).remove()
        .then(function(resp) {
          $resolve(resp)
        })
        .catch(function(resp) {
          var errorStatus = 'FATAL_ERROR'
          $log.error('Error removing weblink: ' + resp.data.result.content)
          if (resp.data.result && resp.data.result.status === 400) {
            errorStatus = 'WEBLINK_NOT_EXIST'
          }
          $reject({
            status: errorStatus,
            msg: resp.data.result.content
          })
        })
      })
    }

  }
})()
