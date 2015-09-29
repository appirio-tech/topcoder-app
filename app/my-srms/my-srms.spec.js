/* jshint -W117, -W030 */
describe('My SRMs Controller', function() {
  var controller;
  var authService, srmService, userService;
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
      console.log(data.filter);
      if (data.filter.indexOf('status=future') != -1) {
        resp = JSON.parse(JSON.stringify(srms));
      } else {
        resp = JSON.parse(JSON.stringify(srms.slice(1)));
      }
      resp.pagination = {
        total: resp.length,
        pageIndex: 1,
        pageSize: 10
      };
      deferred.resolve(resp);
      return deferred.promise;
    });

    // mock srmResults api
    sinon.stub(srmService, 'getSRMResults', function(data) {
      var deferred = $q.defer();
      var resp = JSON.parse(JSON.stringify(results));
      resp.pagination = {
        total: resp.length,
        pageIndex: 1,
        pageSize: 10
      };
      deferred.resolve(resp);
      return deferred.promise;
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('inialization', function() {
    var mySRMs = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      mySRMs = $controller('MySRMsController', {
        SRMService : srmService,
        UserService : userService
      });
      $rootScope.$apply();
    });

    it('controller should exist', function() {
      expect(mySRMs).to.exist;
    });

    it('mySRMs.srms should be initialized', function() {
      // by default it should load upcoming SRMs
      expect(mySRMs.listType).to.equal('past');
      expect(mySRMs.srms).to.exist;
      expect(mySRMs.srms.length).to.equal(srms.length - 1);
    });
  });

  describe('upcoming/past filters', function() {
    var mySRMs = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      mySRMs = $controller('MySRMsController', {
        SRMService : srmService,
        UserService : userService
      });
      $rootScope.$apply();
    });

    it('controller should exist', function() {
      expect(mySRMs).to.exist;
    });

    it('upcoming SRMs should be fetched', function() {
      expect(mySRMs.listType).to.equal('past');
      expect(mySRMs.srms).to.exist;
      // should have one less srm for past filter as per mocked method
      expect(mySRMs.srms.length).to.equal(srms.length - 1);
      // apply upcoming filter
      mySRMs.viewUpcomingSRMs();
      $rootScope.$apply();
      expect(mySRMs.listType).to.equal('future');
      expect(mySRMs.srms).to.exist;
      // should have one extra srm for past filter as per mocked method
      expect(mySRMs.srms.length).to.equal(srms.length);
    });

    it('past SRMs should be fetched', function() {
      // apply past filter
      mySRMs.viewPastSRMs();
      expect(mySRMs.listType).to.equal('past');
      $rootScope.$apply();
      expect(mySRMs.srms).to.exist;
      // should have one less srm for upcoming filter as per mocked method
      expect(mySRMs.srms.length).to.equal(srms.length - 1);
    });
  });

});