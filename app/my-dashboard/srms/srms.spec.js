/* jshint -W117, -W030 */
describe('SRMs Widget Controller', function() {
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
      if (data.filter.indexOf('listType=past') != -1) {
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
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('inialization', function() {
    var mySRMs = null;
    beforeEach( function(){
      $scope = $rootScope.$new();
      mySRMs = $controller('SRMWidgetController', {
        SRMService : srmService,
        UserService : userService
      });
      $rootScope.$apply();
    });

    it('controller should exist', function() {
      expect(mySRMs).to.exist;
    });

    it('mySRMs.srms should be initialized', function() {
      expect(mySRMs.srms).to.exist;
      expect(mySRMs.srms.length).to.equal(srms.length - 1);
    });
  });

});