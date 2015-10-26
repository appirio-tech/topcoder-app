/* jshint -W117, -W030 */
describe('ExternalAccount Service', function() {
  var service;
  var mockAccountsData = mockData.getMockLinkedExternalAccountsData();
  var mockUserLinksData = mockData.getMockLinkedExternalAccounts();
  var apiUrl;


  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, 'ExternalAccountService', '$httpBackend', '$q', 'CONSTANTS', 'JwtInterceptorService');
    bard.mockService(JwtInterceptorService, {
        getToken: $q.when('token'),
        _default:    $q.when([])
    });

    apiUrl  = CONSTANTS.API_URL;
    service = ExternalAccountService;

    $httpBackend
      .when('GET', apiUrl + '/members/test1/externalAccounts/')
      .respond(200, {result: {content: mockAccountsData}});
    $httpBackend
      .when('GET', apiUrl + '/users/111/?fields=profiles')
      .respond(200, {result: {content: mockUserLinksData}});

  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('service should be defined', function() {
    expect(service).to.be.defined;
  });

  it('should return linked external accounts', function() {
    service.getLinkedAccounts(111).then(function(data) {
      expect(data).to.have.length(5);
    });
    $httpBackend.flush();
  });

  it('should return linked external accounts data', function() {
    service.getAccountsData('test1').then(function(data) {
      data = data.plain();
      expect(data).to.be.defined;
      expect(_.keys(data)).to.include.members(['dribbble', 'github', 'behance', 'bitbucket', 'linkedin', 'stackoverflow', 'twitter']);
    });
    $httpBackend.flush();
  });

  it('should return all non-pending external links', function() {
    // spy
    service.getAllExternalLinks('test1', 111, false).then(function(data) {
      expect(data).to.be.defined;
      expect(_.pluck(data, 'provider')).to.include.members(['dribbble', 'github','bitbucket', 'stackoverflow']);
      expect(_.all(_.pluck(data, 'data'))).to.be.truthy;
    });
    $httpBackend.flush();
  });

  it('should return all external links including pending', function() {
    // spy
    service.getAllExternalLinks('test1', 111, true).then(function(data) {
      expect(data).to.be.defined;
      expect(_.pluck(data, 'provider')).to.include.members(['dribbble', 'github', 'behance', 'bitbucket','stackoverflow']);
      expect(data).to.have.length(5);
      var nullAccounts = _.remove(data, function(n) {return n.data.status === 'PENDING'});
      expect(nullAccounts).to.have.length(1);
    });
    $httpBackend.flush();
  });

});
