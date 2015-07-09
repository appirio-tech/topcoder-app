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

  BlogService.$inject = ['Restangular', '$q', '$http', 'CONSTANTS', '$sce'];

  /**
   * BlogService
   * @param Restangular to access the REST api
   * @param $q to manage promises
   * @param $http used to fetch the blog rss feed
   * @param CONSTANTS CONSTANTSironment object
   * @param $sce used to process the html of the blog post desciption
   * @constructor
   */
  function BlogService(Restangular, $q, $http, CONSTANTS, $sce) {

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
          // parse the blog rss feed using jquery
          var rss = $($.parseXML(data));

          var result = [];

          // create an array of a json objects with title, link, pubDate, and description
          // for each item found in the rss feed:
          angular.forEach(rss.find("item"), function(item) {
            result.push({
              title: $(item).find("title").text(),
              link: $(item).find("link").text(),
              pubDate: new Date($(item).find("pubDate").text()),
              description: $sce.trustAsHtml($(item).find("description").text())
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