(function () {
  'use strict';

  angular.module('tc.settings').controller('AccountInfoController', AccountInfoController);

  AccountInfoController.$inject = ['userData', 'UserService', 'ProfileService', '$log', 'ISO3166'];

  function AccountInfoController(userData, UserService, ProfileService, $log, ISO3166) {
    var vm = this;
    vm.saveAccountInfo = saveAccountInfo;
    vm.updateCountry   = updateCountry;

    activate();

    function activate() {
      processData();
      vm.userData = userData;

      vm.countries = ISO3166.getAllCountryObjects();
      vm.countryObj = ISO3166.getCountryObjFromAlpha3(userData.homeCountryCode);
    }

    function updateCountry(angucompleteCountryObj) {
      var countryCode = _.get(angucompleteCountryObj, 'originalObject.alpha3', undefined);

      var isValidCountry = _.isUndefined(countryCode) ? false : true;
      vm.updateAccountInfo.country.$setValidity('required', isValidCountry);
    }

    function saveAccountInfo() {
      ProfileService.updateUserProfile(userData);
    }

    function processData() {
      vm.homeAddress = _.find(userData.addresses, {type: 'HOME'}) || {};
    }
  }
})();
