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
              return _.get(l, 'synchronizedAt') === 0;
            });
          }
          // add provider type as weblink
          links = _(links).forEach(function(l) {
            l.provider = 'weblink';
          }).value();
          return links;
        });
    }

    function addLink(userHandle, url) {
      return memberApi.one('members', userHandle).customPOST({'url': url}, 'externalLinks')
        .then(function(resp) {
          var _newLink = {
            provider: 'weblink',
            data: resp
          };
          _newLink.data.status = 'pending';
          return _newLink;
        });
    }

    function removeLink(userHandle, key) {
      return memberApi.one('members', userHandle).one('externalLinks', key).remove();
    }

  }
})();
