/* jshint -W117, -W030 */
describe('ExternalWebLinks service', function() {
  var service;
  var mockExternalLinks = mockData.getMockExternalWebLinksData();
  var apiUrl;


  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, 'ExternalWebLinksService', '$httpBackend', 'CONSTANTS');

    apiUrl  = CONSTANTS.API_URL;
    service = ExternalWebLinksService;

    // mock profile api
    $httpBackend
      .when('GET', apiUrl + '/members/test1/externalLinks/')
      .respond(200, {result: {content: mockExternalLinks}});
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be defined', function() {
    expect(service).to.be.defined;
  });

  it('should return linked external web links including pending', function() {
    service.getLinks('test1', true).then(function(data) {
      expect(data).to.have.length(3);
    });
    $httpBackend.flush();
  });

  it('should return linked external non-pending web links ', function() {
    service.getLinks('test1', false).then(function(data) {
      expect(data).to.have.length(2);
    });
    $httpBackend.flush();
  });

});
