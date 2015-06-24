(function() {
  'use strict';

  var dependencies = [
    'ui.router'
  ];

  angular
    .module('topcoder-account', dependencies)
    .run(appRun);

  appRun.$inject = ['$rootScope', '$state'];

  function appRun($rootScope, $state) {
    // Attaching $state to the $rootScope allows us to access the
    // current state in index.html (see div with ui-view on the index page)
    $rootScope.$state = $state;
  }

})();

(function() {
  'use strict';

  angular.module('topcoder-account').config(routes);

  routes.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  function routes($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'register/register.html'
      });

    $urlRouterProvider.otherwise('/login');
  }
})();

(function() {
  'use strict';

  angular.module('topcoder-account').controller('Login', Login);

  Login.$inject = ['$scope'];
  function Login($scope) {
    $scope.name = 'login';
  }
})();

(function() {
  'use strict';

  angular.module('topcoder-account').controller('Register', Register);

  Register.$inject = ['$scope'];
  function Register($scope) {
    $scope.name = 'Register';
  }
})();
