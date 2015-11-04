/* jshint -W117, -W030 */
describe('Logout Controller', function() {
  var controller;
  var fakeWindow = {
    location: {
      href: ''
    }
  };


  beforeEach(function() {
    bard.appModule('topcoder');
    bard.appModule('tc.account');
    module('tc.account', function($provide) {
      $provide.value('$window', fakeWindow);
    });

    bard.inject(this, '$controller', 'TcAuthService', '$window', '$q', 'CONSTANTS');

    bard.mockService(TcAuthService, {
      logout: $q.when({}),
      _default: $q.when({})
    });

    controller = $controller('LogoutController');
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be defined', function() {
    expect(controller).to.be.defined;
  });

  it('should be successfully logged out', function() {
    expect(TcAuthService.logout).to.have.been.calledOnce;
    expect($window.location.href).to.equal(CONSTANTS.MAIN_URL);
  });

});
