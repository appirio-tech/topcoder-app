(function() {
  'use strict';

  angular.module('tc.services').factory('ProfileService', ProfileService);

  ProfileService.$inject = ['CONSTANTS', 'ApiService', 'UserService', '$q'];

  function ProfileService(CONSTANTS, ApiService, UserService, $q) {

    var restangular = ApiService.restangularV3;

    var service = {
      getUserProfile: getUserProfile,
      getUserStats: getUserStats,
      getUserFinancials: getUserFinancials
    };
    return service;

    ///////////////

    function getUserProfile() {
      var userId = UserService.getUserId();
      return restangular.one('members', userId).one('profile').get();
    }

    function getUserStats() {
      var userId = UserService.getUserId();
      return restangular.one('members', userId).one('stats').get();
    }

    function getUserFinancials() {
      var userId = UserService.getUserId();
      return restangular.one('members', userId).one('financial').get();
    }
  }

})();
