(function() {
  'use strict';

  angular.module('topcoder').filter('listRoles', listRoles);

  function listRoles() {
    return function(roles) {
      if (!roles) {
        return "No assigned role.";
      }

      var rolesString = roles.join(', ');

      if (rolesString.length > 60) {
        return rolesString.slice(0, 57) + '...';
      } else {
        return rolesString;
      }
    };
  }

})();
