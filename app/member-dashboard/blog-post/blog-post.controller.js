(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('BlogPostController', BlogPostController);

  BlogPostController.$inject = ['BlogService', '$log'];

  // Accesss and parses the blog RSS feed
  function BlogPostController(BlogService, $log) {
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
