(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('BlogPostController', BlogPostController);

  BlogPostController.$inject = ['TcAuthService', 'BlogService'];

  // Accesss and parses the blog RSS feed
  function BlogPostController(TcAuthService, BlogService) {
    var vm = this;

    if (TcAuthService.isAuthenticated() === true) {
      activate();
    } else {
      return false;
    }

    function activate() {
      return BlogService.getBlogFeed()
        .then(function(data) {
          vm.blogPosts = data;
      });
    }
  }

})();
