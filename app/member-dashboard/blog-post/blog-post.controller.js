/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 * @author mdesiderio
 * @version 1.0
 *
 * Controller for the blog post widget
 */
(function () {

  /**
   * Create blog post controller controller
   */
  angular
    .module('tc.myDashboard')
    .controller('BlogPostCtrl', BlogPostCtrl);

  /**
   * Inject dependencies
   * @type {string[]}
   */
  BlogPostCtrl.$inject = ['$scope', 'tcAuth', 'blog'];

  /**
   * BlogPost Controller implementation
   *
   * @param $scope
   * @param blog service to access and parse blog RSS feed
   * @constructor
   */
  function BlogPostCtrl($scope, tcAuth, blog) {
    var vm = this;

    // activate controller
    if (tcAuth.isAuthenticated() === true) {
      activate();
    } else {
      return false;
    }

    function activate() {
      return blog.getBlogFeed()
        .then(function(data) {
          vm.blogPosts = data;
      });
    }
  }

})();