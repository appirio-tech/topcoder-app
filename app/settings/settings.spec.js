/* jshint -W117, -W030 */
describe('Settings Controller', function() {
  var vm;

  beforeEach(function() {
    bard.appModule('tc.settings');
    bard.inject(this, '$controller');

    vm = $controller('SettingsController');
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(vm).to.exist;
  });
});
