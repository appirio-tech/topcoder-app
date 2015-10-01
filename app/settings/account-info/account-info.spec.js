/* jshint -W117, -W030 */
describe('Account Info Controller', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('tc.settings');
    bard.inject(this, '$controller', '$rootScope', '$q');

    var userService = {
      getUserIdentity: function() {
        return {handle: 'nicktest', email: 'nicktest@gmail.com'};
      },
      resetPassword: function() {
        return $q.when({});
      }
    };

    var userData = {
      handle: 'nicktest',
      email: 'nicktest@gmail.com',
      homeCountryCode: 'USA'
    };

    controller = $controller('AccountInfoController', {
      UserService: userService,
      userData: userData
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  // TODO: re-add tests!
//  it('should be created successfully', function() {
//    expect(controller).to.exist;
//  });
//
//  describe('updating a user\'s password', function() {
//    beforeEach(function() {
//      $rootScope.$apply();
//    });
//
//    xit('should update a user\'s password if the current password was entered correctly', function() {
//      controller.submitNewPassword();
//    });
//
//    xit('should return an error if the user entered an incorrect current password', function() {
//
//    });
//
//    xit('should return an error if there was a server error', function() {
//
//    });
//  });

});
