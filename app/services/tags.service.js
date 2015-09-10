(function () {
  'use strict';

  angular.module('tc.services').factory('TagsService', TagsService);

  TagsService.$inject = ['ApiService', '$q'];

  function TagsService(ApiService, $q) {
    var api = ApiService.restangularV3;

    var service = {
      getApprovedSkillTags: function() {
        return api.all("tags")
          .withHttpConfig({skipAuthorization: true})
          .getList({filter: 'domain=SKILLS&status=APPROVED'});
      }
    };

    return service;
  }
})();
