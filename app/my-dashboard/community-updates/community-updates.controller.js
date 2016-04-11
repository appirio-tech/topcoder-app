import angular from 'angular'

(function () {
  'use strict'

  angular.module('tc.myDashboard').controller('CommunityUpdatesController', CommunityUpdatesController)

  CommunityUpdatesController.$inject = ['BlogService', '$log', 'logger']

  // Access and parses the blog RSS feed
  function CommunityUpdatesController(BlogService, $log, logger) {
    var vm = this
    vm.loading = true

    activate()

    function activate() {
      BlogService.getBlogFeed()
      .then(function(data) {
        vm.loading = false
        vm.blogPosts = data
      })
      .catch(function(err) {
        vm.loading = false

        logger.error('Could not fetch blog feed', err)
      })
    }
  }
})()
