/* jshint -W117, -W030 */
describe('Skill Picker Controller', function() {
  var vm;

  beforeEach(function() {
    bard.appModule('tc.settings');
    bard.inject(this, '$controller', '$rootScope', '$q');

    vm = $controller('SkillPickerController', {
      userData: userData
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(vm).to.exist;
  });

  describe('user data', function() {

  });

});
