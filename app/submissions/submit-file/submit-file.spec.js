/* jshint -W117, -W030 */
describe('Submit File Controller', function() {
  var controller;
  var vm;

  beforeEach(function() {
    bard.appModule('tc.submissions');
    bard.inject(this, '$controller');
  });

  bard.verifyNoOutstandingHttpRequests();

  beforeEach(function() {
    controller = $controller('SubmitFileController', {});
    vm = controller;
  });

  it('should exist', function() {
    expect(vm).to.exist;
    expect(vm.submitFile).to.be.true;
  });
});
