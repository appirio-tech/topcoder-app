/* jshint -W117, -W030 */
describe.only('Submissions Controller', function() {
  var controller;
  var vm;

  // var mockSubmissions = mockData.getMockSubmissions();

  beforeEach(function() {
    bard.appModule('tc.submissions');
    bard.inject(this, '$controller');
  });

  bard.verifyNoOutstandingHttpRequests();

  beforeEach(function() {
    controller = $controller('SubmissionsController', {});
    vm = controller;
  });

  it('should exist', function() {
    expect(vm).to.exist;
    expect(vm.testValue).to.equal('testValue');
  });
});
