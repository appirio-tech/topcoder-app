(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('CommunityUpdatesController', CommunityUpdatesController);

  CommunityUpdatesController.$inject = ['BlogService', '$log'];

  // Access and parses the blog RSS feed
  function CommunityUpdatesController(BlogService, $log) {
    var vm = this;

    activate();

    function activate() {
      BlogService.getBlogFeed()
      .then(function(data) {
        vm.blogPosts = data;
      })
      .catch(function(err) {
        $log.debug(err);
      });
    }
  }

})();
