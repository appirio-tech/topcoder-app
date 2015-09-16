/* jshint -W117, -W030 */
describe('Dashboard Controller', function() {
  var controller, identity;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$controller');
  });

  identity = function() {
    return {
      handle: 'albertwang',
      userId: 123456
    };
  };

  bard.verifyNoOutstandingHttpRequests();

  beforeEach(function() {
    controller = $controller('MyDashboardController', {
      userIdentity: identity
    });
  });

  it('should exist', function() {
    expect(controller).to.exist;
  });
});
