(function() {
  'use strict';

  angular.module('topcoder').factory('authtoken', authtoken);

  authtoken.$inject = ['CONSTANTS', '$window', '$cookies', 'store'];

  function authtoken(CONSTANTS, $window, $cookies, store) {
    var v2TokenKey = 'tcjwt';
    var v3TokenKey = 'appiriojwt';

    var service = {
      setV2Token: setV2Token,
      setV3Token: setV3Token,
      getV2Token: getV2Token,
      getV3Token: getV3Token,
      removeTokens: removeTokens,
      refreshV3Token: refreshV3Token
    };
    return service;

    ///////////////

    function setV2Token(token) {
      $window.document.cookie = v2TokenKey + '=' + token + '; path=/; domain=.' + CONSTANTS.domain + '; expires=' + new Date(new Date().getTime() + 12096e5);
    }

    function setV3Token(token) {
      store.set(v3TokenKey, token);
    }

    function getV3Token() {
      return store.get(v3TokenKey);
    }
    function getV2Token() {
      return $cookies.get(v2TokenKey);
    }

    function removeTokens() {
      // remove tokens
      $window.document.cookie = v2TokenKey + '=; path=/; domain=.' + CONSTANTS.domain + '; expires=' + (new Date(0)).toUTCString();
      store.remove(v3TokenKey);
    }

    function refreshV3Token(token) {
      // TODO
      var newToken = '';
      return newToken
    }
  }

})();
