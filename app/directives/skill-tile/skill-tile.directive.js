(function() {
  'use strict';
  angular.module('tcUIComponents').directive('skillTile', function() {

    var _iconMap = {
      "c++": "devicon-cplusplus-plain",
      "c": "devicon-c-plain",
      "c#": "devicon-csharp-plain",
      "php": "devicon-php-plain",
      "ruby": "devicon-ruby-plain",
      "rails": "devicon-rails-plain",
      ".net": "devicon-dot-net-plain",
      "python": "devicon-python-plain",
      "django": "devicon-django-plain",
      "java": "devicon-java-plain",
      "j2ee": "devicon-java-plain",
      "javascript": "devicon-javascript-plain",
      "node": "devicon-nodejs-plain",
      "angular": "devicon-angularjs-plain",
      "backbone": "devicon-backbonejs-plain",
      "coffeescript": "devicon-coffeescript-original",
      "css3": "devicon-css3-plain",
      "css": "devicon-css3-plain",
      "bootstrap": "devicon-bootstrap-plain",
      "less": "devicon-less-plain",
      "mongodb": "devicon-mongodb-plain",
      "postgresql": "devicon-postgresql-plain",
      "mysql": "devicon-mysql-plain",
      "oracle": "devicon-oracle-original",
      "android": "devicon-android-plain",
      "ios": "devicon-apple-original",
      "swift": "devicon-apple-original",
      "html5": "devicon-html5-plain",
      "amazon": "devicon-amazonwebservices-original"
    };

    return {
      restrict: 'E',
      templateUrl: 'directives/skill-tile/skill-tile.directive.html',
      scope: {
        skill: '=skill'
      },
      controller: ['$scope', function($scope) {

        for (var key in _iconMap) {
          if ($scope.skill.tagName.trim().toLowerCase().indexOf(key) > -1) {
            $scope.icon = _iconMap[key];
            break;
          }
        }
      }]
    };
  });
})();
