/* jshint -W117, -W030 */
describe('Review Status Controller', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$controller', '$rootScope', '$q');

    controller = $controller('ReviewStatusController');
    $rootScope.$apply();
  });

  // bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(controller).to.be.defined;
  });

  it('should have a submissionDownloadPath property set', function() {
    expect(controller.submissionDownloadPath).to.equal('/review/actions/DownloadContestSubmission?uid=');
  });

  it('should have a domain property', function() {
    expect(controller.domain).to.be.defined;
  });
  it('should have a loaded property', function() {
    expect(controller.loaded).to.be.defined;
  });
  it('should have a challengeId property', function() {
    expect(controller.challengeId).to.be.defined;
  });

  it('should have challenge set to null', function() {
    expect(controller.challenge).to.be.null;
  });
});
