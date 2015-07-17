/**
 * Copyright (C) 2014 TopCoder Inc., All Rights Reserved.
 * @author mdesiderio
 * @version 1.0
 *
 * BlogService. Factory to access topcoder blog RSS feed and parse it into json
 */
(function () {

  angular
    .module('tc.myDashboard')
    .factory('blog', BlogService);

  BlogService.$inject = ['Restangular', '$q', '$http', 'CONSTANTS', '$sce', 'x2js'];

  /**
   * BlogService
   * @param Restangular to access the REST api
   * @param $q to manage promises
   * @param $http used to fetch the blog rss feed
   * @param CONSTANTS CONSTANTSironment object
   * @param $sce used to process the html of the blog post desciption
   * @constructor
   */
  function BlogService(Restangular, $q, $http, CONSTANTS, $sce, x2js) {

    var service = Restangular.withConfig(function(RestangularConfigurer) {
    });

    /**
     * getBlogFeed fetches blog feed and parses into json, returns promise
     */
    service.getBlogFeed = function() {
      // prepare the promise
      var deferred = $q.defer();

      // fetch blog rss feed
      $http.get(CONSTANTS.BLOG_LOCATION)
        .success(function(data) {
          // parse the blog rss feed using x2js
          var rss = x2js.xml_str2json(data).rss;

          var result = rss.channel.item;

          // updates html in description field to be safe for display
          result.forEach(function(item) {
            item.description = $sce.trustAsHtml(item.description.toString());
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