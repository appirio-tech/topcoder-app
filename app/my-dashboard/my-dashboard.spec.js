/* jshint -W117, -W030 */
describe('Dashboard Controller', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$controller');
  });

  bard.verifyNoOutstandingHttpRequests();

  beforeEach(function() {
    controller = $controller('MyDashboardController');
  });

  it('should exist', function() {
    expect(controller).to.exist;
  });
});
