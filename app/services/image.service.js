(function() {
  'use strict';

  angular.module('tc.services').factory('ImageService', ImageService);

  ImageService.$inject = ['CONSTANTS', 'ApiService'];

  function ImageService(CONSTANTS, ApiService) {
    var api = ApiService.restangularV3;

    var service = {
    };
    return service;

    function getChallenges(params) {
      return api.all('challenges').getList(params);
    }
  };

})();
