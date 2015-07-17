// Accesses topcoder blog RSS feed and parse it into json
(function () {
  'use strict';

  angular.module('tc.services').factory('BlogService', BlogService);

  BlogService.$inject = ['Restangular', '$q', '$http', 'CONSTANTS', '$sce', 'x2js'];

  function BlogService(Restangular, $q, $http, CONSTANTS, $sce, x2js) {

    var service = Restangular.withConfig(function(RestangularConfigurer) {
    });

    // getBlogFeed fetches blog feed and parses into json, returns promise
    service.getBlogFeed = function() {
      var deferred = $q.defer();

      // fetch blog rss feed
      $http.get(CONSTANTS.BLOG_LOCATION)
        .success(function(data) {
          // parse the blog rss feed using x2js
          var rss = x2js.xml_str2json(data).rss;

          var result = rss.channel.item;

          // updates html in description field to be safe for display
          result.forEach(function(item) {
          });
        });

        deferred.resolve(result);
      })
      .error(function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    return service;
  }
})();
