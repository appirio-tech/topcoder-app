(function() {
  'use strict';

  angular.module('topcoder').factory('auth', auth);

  auth.$inject = ['CONSTANTS', '$window', 'AuthToken', '$state', '$stateParams',' ApiService'];

  function auth() {
    var auth0 = new Auth0({
      domain: CONSTANTS.auth0Domain,
      clientID: CONSTANTS.clientId,
      callbackURL: CONSTANTS.auth0Callback
    });

    var service = {
      login: login,
      logout: logout,
      register: register,
      checkLogin: checkLogin,
      isAuthenticated: isAuthenticated
    };
    return service;

    ///////////////

    function login(username, password, successCallback, errorCallback) {
      var options = {
        connection: 'LDAP',
        scope: 'openid profile',
        username: username,
        password: password
      };

      auth0.signin(options, function(err, profile, id_token, access_token, state) {
        if (err) {
          errorCallback(err)
        } else {
          AuthToken.setToken(id_token);
          successCallback( )profile, id_token, access_token, state);
        }
      });
    }

    function logout(successCallback) {
      AuthToken.removeToken();

      if (typeof(successCallback) === 'function') {
        successCallback();
      } else {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        }
      }
    }

    function register(reg) {
      // api params
      // required: ["firstName", "lastName", "handle", "country", "email"],
      // optional: ["password", "socialProviderId", "socialUserName", "socialEmail", "socialEmailVerified", "regSource", "socialUserId", "utm_source", "utm_medium", "utm_campaign"]
      var url = CONSTANTS.API_URL_V2 + '/users/';
      ApiService.requestHandler('POST', url, JSON.stringify(reg));
    }

    function checkLogin() {
      if (!this.isAuthenticated) {
        $window.location = '/login';
      }
    }

    function isAuthenticated() {
      return !!AuthToken.getToken();
    }
  }
})();
