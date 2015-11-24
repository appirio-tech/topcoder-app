/* jshint -W117, -W030 */
describe('ExternalWebLinks service', function() {
  var service;
  var mockExternalLinks = mockData.getMockExternalWebLinksData();
  var apiUrl;
  var linksGet, linksPost, linksDelete;


  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, 'ExternalWebLinksService', 'JwtInterceptorService', '$httpBackend', 'CONSTANTS', '$q');
    bard.mockService(JwtInterceptorService, {
        getToken: $q.when('token'),
        _default:    $q.when([])
    });

    apiUrl  = CONSTANTS.API_URL;
    service = ExternalWebLinksService;

    // mock profile api
    linksGet = $httpBackend.when('GET', apiUrl + '/members/test1/externalLinks/');
    linksGet.respond(200, {result: {content: mockExternalLinks}});

    // mock profile api [POST]
    linksPost = $httpBackend.when('POST', apiUrl + '/members/test1/externalLinks/');
    linksPost.respond(200, {result: {content: mockExternalLinks[0]}});

    // mock profile api [DELETE]
    linksDelete = $httpBackend.when('DELETE', apiUrl + '/members/test1/externalLinks/testkey/');
    linksDelete.respond(200, {result: {}});
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

  it('should add external link', function() {
    // call addLink method with valid params, should succeed
    service.addLink('test1', "http://google.com").then(function(newLink) {
      expect(newLink).to.be.exist;
      expect(newLink.provider).to.exist.to.equal('weblink');
      expect(newLink.data).to.exist;
      expect(newLink.data.status).to.exist.to.equal('PENDING');
    });
    $httpBackend.flush();
  });

  it('should fail with already existing link', function() {
    var errorMessage = "web link exists";
    linksPost.respond(400, {result:  { status: 400, content: errorMessage } });
    // call linkExternalAccount method, having user service throw already exist
    service.addLink('test1', "http://google.com").then(function(data) {
      sinon.assert.fail('should not be called');
    }, function(error) {
      expect(error).to.be.defined;
      expect(error.status).to.exist.to.equal('WEBLINK_ALREADY_EXISTS');
      expect(error.msg).to.exist.to.equal(errorMessage);
    });
    $httpBackend.flush();
  });

  it('should remove external link', function() {
    // call removeLink method with valid params, should succeed
    service.removeLink('test1', "testkey").then(function(newLink) {
    }).catch(function(error) {
      sinon.assert.fail('should not be called');
    });
    $httpBackend.flush();
  });

});
