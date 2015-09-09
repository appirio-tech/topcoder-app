(function () {
  'use strict';

  angular.module('tc.services').factory('TagsService', TagsService);

  TagsService.$inject = ['ApiService'];

  function TagsService(ApiService) {
    var api = ApiService.restangularV3;
    
    var service = {
      getApprovedSkillTags: function() {
        return api.one("tags").get({filter: 'domain=SKILLS&status=APPROVED'});
      }
    };

    return service;
  }
})();
