/* jshint -W117, -W030 */
describe.only('Logout Controller', function() {
  var controller;
  var fakeLocation = {
    path: function(param) {
      return;
    }
  };
  sinon.spy(fakeLocation, "path");

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.appModule('tc.account');
    module('tc.account', function($provide) {
      $provide.value('$location', fakeLocation);
    });

    bard.inject(this, '$controller', 'TcAuthService', '$location', '$q');

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
    expect($location.path).to.have.been.calledWith('/');
  });

});
