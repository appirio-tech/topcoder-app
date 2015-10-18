/* jshint -W117, -W030 */
describe('My SRMs Controller', function() {
  var controller;
  var authService, srmService, userService, mockState;
  var srms = mockData.getMockSRMs();
  var results = mockData.getMockSRMResults();


  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this,
      '$controller',
      '$rootScope',
      '$q',
      'TcAuthService',
      'SRMService',
      'UserService',
      'CONSTANTS',
      'Helpers');

    srmService = SRMService;
    authService = TcAuthService;
    userService = UserService;

    // mock user api
    sinon.stub(userService, 'getUserIdentity', function() {
      return {
        userId: 1234567,
        handle: 'ut',
        email: 'ut@topcoder.com'
      };
    });

    // mock srms api
    sinon.stub(srmService, 'getSRMs', function(data) {
      var deferred = $q.defer();
      var resp = null;
      if (data.filter.indexOf('status=future') != -1) {
        resp = JSON.parse(JSON.stringify(srms));
      } else {
        resp = JSON.parse(JSON.stringify(srms.slice(1)));
      }
      resp.metadata = {
        totalCount: resp.length
      };
      deferred.resolve(resp);
      return deferred.promise;
    });

    sinon.stub(srmService, 'getPastSRMs', function(data) {
      var deferred = $q.defer();
      var resp = JSON.parse(JSON.stringify(srms.slice(1)));
      resp.metadata = {
        totalCount: resp.length,
      };
      deferred.resolve(resp);
      return deferred.promise;
    });

    mockState = { '$current' : {'name': 'test'}};
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('intialization', function() {
    var mySRMs = null;
    var spy;
    beforeEach( function(){
      $scope = $rootScope.$new();
      mySRMs = $controller('MySRMsController', {
        SRMService : srmService,
        UserService : userService,
        $state: mockState
      });
      $rootScope.$apply();
      spy = sinon.spy(mySRMs, 'getSRMs');
    });

    it('controller should exist', function() {
      expect(mySRMs).to.exist;
    });

    it('mySRMs.srms should be initialized', function() {
      // by default it should load upcoming SRMs
      expect(mySRMs.statusFilter).to.equal('past');
      expect(mySRMs.srms).to.exist;
      expect(mySRMs.orderBy).to.equal('endDate');
      expect(mySRMs.reverseOrder).to.be.true;
      expect(mySRMs.srms.length).to.equal(srms.length - 1);
      expect(spy.withArgs(0).calledOnce);
    });

    it('more past SRMs should be fetched', function() {
      mySRMs.loadMore();
      expect(spy.withArgs(1).calledOnce);
    });

  });

  describe('upcoming/past filters', function() {
    var mySRMs = null;
    var spy;
    beforeEach( function(){
      $scope = $rootScope.$new();
      mySRMs = $controller('MySRMsController', {
        SRMService : srmService,
        UserService : userService,
        $state: mockState,
        $stateParams: {'status': 'future'}
      });
      $rootScope.$apply();
      spy = sinon.spy(mySRMs, 'getSRMs');
    });

    it('controller should exist', function() {
      expect(mySRMs).to.exist;
    });

    it('upcoming SRMs should be fetched', function() {
      expect(mySRMs.srms).to.exist;
      expect(mySRMs.statusFilter).to.equal('future');
      expect(mySRMs.orderBy).to.equal('startDate');
      expect(mySRMs.reverseOrder).to.be.false;
      expect(mySRMs.srms).to.exist;
      // should have one extra srm for past filter as per mocked method
      expect(mySRMs.srms.length).to.equal(srms.length);
      expect(spy.withArgs(0).calledOnce);

    });

    it('past SRMs should be fetched', function() {
      // apply past filter
      mySRMs.changeFilter('past');
      expect(mySRMs.statusFilter).to.equal('past');
      $rootScope.$apply();
      expect(mySRMs.srms).to.exist;
      // should have one less srm for upcoming filter as per mocked method
      expect(mySRMs.srms.length).to.equal(srms.length - 1);
    });
  });

});
