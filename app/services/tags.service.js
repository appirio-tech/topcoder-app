import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('TagsService', TagsService)

  TagsService.$inject = ['ApiService']

  function TagsService(ApiService) {
    var api = ApiService.restangularV3

    var service = {
      getApprovedSkillTags: getApprovedSkillTags
    }

    return service

    /////////////////////////////

    function getApprovedSkillTags() {
      return api.all('tags')
        .withHttpConfig({skipAuthorization: true})
        .getList({filter: 'domain=SKILLS&status=APPROVED'})
    }
  }
})()
