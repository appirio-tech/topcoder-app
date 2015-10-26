(function() {
  'use strict';

  angular.module('tc.services').factory('ExternalWebLinksService', ExternalWebLinksService);

  ExternalWebLinksService.$inject = ['$log', 'CONSTANTS', 'ApiService'];

  function ExternalWebLinksService($log, CONSTANTS, ApiService) {
    $log = $log.getInstance("ExternalWebLinksService");

    var memberApi = ApiService.getApiServiceProvider('MEMBER');

    var service = {
      getLinks: getLinks,
      addLink: addLink,
      removeLink: removeLink
    };
    return service;

    /////////////////////////

    function getLinks(userHandle, includePending) {
      return memberApi.one('members', userHandle)
        .withHttpConfig({skipAuthorization: true})
        .customGET('externalLinks')
        .then(function(links) {
          links = links.plain();
          if (!includePending) {
            _.remove(links, function(l) {
              return l.status && l.status.toLowerCase() === 'pending';
            });
          }
          links = _(links).forEach(function(l) {
            l.provider = 'weblink';
          }).value();
          // add provider type as link
          return links;
        });
    }

    function addLink(userHandle, url) {
      return memberApi.one('members', userHandle).customPOST({'url': url}, 'externalLinks');
    }

    function removeLink(userHandle, key) {
      return memberApi.one('members', userHandle).one('externalLinks', key).delete();
    }

  }
})();
