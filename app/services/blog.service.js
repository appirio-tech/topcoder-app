import angular from 'angular'
import X2JS from 'xml2js'

// Accesses topcoder blog RSS feed and parse it into json
(function () {
  'use strict'

  angular.module('tc.services').factory('BlogService', BlogService)

  BlogService.$inject = ['Restangular', '$q', '$http', 'CONSTANTS', '$sce']

  function BlogService(Restangular, $q, $http, CONSTANTS, $sce) {

    var service = Restangular.withConfig(function(RestangularConfigurer) {})

    // getBlogFeed fetches blog feed and parses into json, returns promise
    service.getBlogFeed = function() {
      var deferred = $q.defer()

      // fetch blog rss feed
      $http.get(CONSTANTS.BLOG_LOCATION)
        .then(function(data) {
          // parse the blog rss feed using x2js
          var parseString = X2JS.parseString
          parseString(data.trim(), function (err, res) {
            var rss = res.rss

            var result = rss.channel[0].item

            // updates html in description field to be safe for display
            result.forEach(function(item) {
              item.title = $sce.trustAsHtml(item.title.toString())
              item.description = $sce.trustAsHtml(item.description.toString())
              if (item.link && Array.isArray(item.link) && item.link.length) {
                item.link = item.link[0]
              }
            })

            deferred.resolve(result)
          })
        }, function(error) {
          deferred.reject(error)
        })

      return deferred.promise
    }

    return service
  }
})()
