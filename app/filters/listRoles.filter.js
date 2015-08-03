(function() {
  'use strict';

  angular.module('topcoder').filter('listRoles', listRoles);

  function listRoles() {
    return function(roles) {
      var rolesString = roles.join(', ');

      if (rolesString.length > 60) {
        return rolesString.slice(0, 57) + '...';
      } else {
        return rolesString;
      }
    };
  }

})();
