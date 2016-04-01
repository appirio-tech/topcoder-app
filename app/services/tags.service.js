import angular from 'angular'
import _ from 'lodash'

(function() {
  'use strict'

  angular.module('tc.services').factory('TagsService', TagsService)

  TagsService.$inject = ['ApiService', 'CONSTANTS']

  function TagsService(ApiService, CONSTANTS) {
    var api = ApiService.restangularV3

    var service = {
      getApprovedSkillTags: getApprovedSkillTags,
      getSuggestions      : getSuggestions
    }

    return service

    /////////////////////////////

    function getApprovedSkillTags() {
      return api.all('tags')
        .withHttpConfig({skipAuthorization: true})
        .getList({filter: 'domain=SKILLS&status=APPROVED'})
    }

    function getSuggestions(term) {
      return ApiService.requestHandler(
        'GET',
        'https://internal-api.' + CONSTANTS.domain + '/v3/tags/_suggest/',
        {q: term}
      ).then(function(data) {
        const tags = _.get(data, 'data.result.content')
        return tags.map(tag => {
          return tag.text
        })
      })
    }
  }
})()
