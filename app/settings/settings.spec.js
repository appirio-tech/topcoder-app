/* jshint -W117, -W030 */
describe('Settings Controller', function() {
  var vm;

  beforeEach(function() {
    bard.appModule('tc.settings');
    bard.inject(this, '$controller', '$state');
    var mockState = { '$current' : {'name': 'test'}};
    vm = $controller('SettingsController', {
      '$state': mockState,
      'userHandle': 'test'
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(vm).to.exist;
  });
});
