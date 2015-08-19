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

    controller = $controller('AccountInfoController', {
      UserService: userService
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(controller).to.exist;
  });

  it('should have a defaultPlaceholder property', function() {
    expect(controller.defaultPlaceholder).to.exist;
  });
  it('should have a submitNewPassword method', function() {
    expect(controller.submitNewPassword).to.exist;
  });
  it('should get the username from local storage', function() {
    expect(controller.username).to.equal('nicktest');
  });

  it('should get the user\'s email from local storage', function() {
    expect(controller.email).to.equal('nicktest@gmail.com');
  });

  describe('updating a user\'s password', function() {
    beforeEach(function() {
      $rootScope.$apply();
    });

    xit('should update a user\'s password if the current password was entered correctly', function() {
      controller.submitNewPassword();
    });

    xit('should return an error if the user entered an incorrect current password', function() {

    });

    xit('should return an error if there was a server error', function() {

    });
  });

});
