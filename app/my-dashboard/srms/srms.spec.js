const mockData = require('../../../tests/test-helpers/mock-data')

/* jshint -W117, -W030 */
describe('SRMs Widget Controller', function() {
  var controller
  var authService, srmService, userService
  var srms = mockData.getMockSRMs()
  var results = mockData.getMockSRMResults()

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this,
      '$controller',
      '$rootScope',
      '$q',
      'TcAuthService',
      'SRMService',
      'UserService',
      'CONSTANTS',
      'Helpers')

    srmService = SRMService
    authService = TcAuthService
    userService = UserService

    // mock user api
    sinon.stub(userService, 'getUserIdentity', function() {
      return {
        userId: 1234567,
        handle: 'ut',
        email: 'ut@topcoder.com'
      }
    })

    // mock srms api
    sinon.stub(srmService, 'getSRMs', function(params) {
      var deferred = $q.defer()
      var resp = null
      resp = JSON.parse(JSON.stringify(srms))
      resp.pagination = {
        total: resp.length,
        pageIndex: 1,
        pageSize: 10
      }
      deferred.resolve(resp)
      return deferred.promise
    })

    // mock srms api
    sinon.stub(srmService, 'getUserSRMs', function(handle, params) {
      var deferred = $q.defer()
      // TODO remove add more tests case for scenario when user has some registered SRMs
      var resp = []
      resp.pagination = {
        total: resp.length,
        pageIndex: 1,
        pageSize: 10
      }
      deferred.resolve(resp)
      return deferred.promise
    })
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('inialization', function() {
    var controller = null
    beforeEach( function(){
      controller = $controller('SRMWidgetController', {
        SRMService : srmService,
        UserService : userService
      })
      $rootScope.$apply()
    })

    it('controller should exist', function() {
      expect(controller).to.exist
    })

    it('controller.srms should be initialized', function() {
      expect(controller.srms).to.exist
      expect(controller.srms.length).to.equal(srms.length)
    })
  })

})
