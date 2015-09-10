(function() {
  'use strict';

  angular.module('tc.services').factory('TagsService', TagsService);

  TagsService.$inject = ['ApiService'];

  function TagsService(ApiService) {

    var api = ApiService.restangularV3;

    var service = {
      getTags: getTags,
    };
    return service;

    /////////////////////////////////////////

    function getTags() {
      return api.all('tags').getList();
    }
  }

})();
