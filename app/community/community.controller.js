(function() {
  'use strict';
  angular.module('tc.community').controller('BaseCommunityController', BaseCommunityController);

  BaseCommunityController.$inject = ['$state'];

  function BaseCommunityController($state) {

    // provide default redirect to a child state
    if ($state.$current.name === 'community') {
      $state.go('community.members');
    }
  }
})();


