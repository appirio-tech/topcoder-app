const mockData = require('../../tests/test-helpers/mock-data')

describe('My SRMs Controller', function() {
  var scope
  var srmService, userService, mockState
  var srms = mockData.getMockSRMs()

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this,
      '$controller',
      '$rootScope',
      '$q',
      'SRMService',
      'UserService',
      'CONSTANTS')

    srmService = SRMService
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
    sinon.stub(srmService, 'getUserSRMs', function(handle, params) {
      var deferred = $q.defer()
      var resp = null
      if (params.filter.indexOf('status=future') != -1) {
        resp = JSON.parse(JSON.stringify(srms))
      } else {
        resp = JSON.parse(JSON.stringify(srms.slice(1)))
      }
      resp.metadata = {
        totalCount: resp.length
      }
      deferred.resolve(resp)
      return deferred.promise
    })

    mockState = {
      '$current' : {'name': 'test'},
      go: function() {}
    }
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('intialization', function() {
    var mySRMs = null
    var spy
    beforeEach( function(){
      scope = $rootScope.$new()
      mySRMs = $controller('MySRMsController', {
        SRMService : srmService,
        UserService : userService,
        $state: mockState,
        $scope: scope
      })
      $rootScope.$apply()
      spy = sinon.spy(mySRMs, 'getSRMs')
    })

    it('controller should exist', function() {
      expect(mySRMs).to.exist
    })

    it('mySRMs.srms should be initialized', function() {
      // by default it should load upcoming SRMs
      expect(mySRMs.statusFilter).to.equal('past')
      expect(mySRMs.srms).to.exist
      expect(mySRMs.orderBy).to.equal('codingEndAt')
      expect(mySRMs.reverseOrder).to.be.true
      expect(mySRMs.srms.length).to.equal(srms.length - 1)
      expect(spy.withArgs(0).calledOnce)
    })
  })

  describe('upcoming/past filters', function() {
    var mySRMs = null
    var spy
    beforeEach( function(){
      scope = $rootScope.$new()
      mySRMs = $controller('MySRMsController', {
        SRMService : srmService,
        UserService : userService,
        $state: mockState,
        $stateParams: {'status': 'future'},
        $scope: scope
      })
      $rootScope.$apply()
      spy = sinon.spy(mySRMs, 'getSRMs')
    })

    it('controller should exist', function() {
      expect(mySRMs).to.exist
    })

    it('upcoming SRMs should be fetched', function() {
      expect(mySRMs.srms).to.exist
      expect(mySRMs.statusFilter).to.equal('future')
      expect(mySRMs.orderBy).to.equal('codingStartAt')
      expect(mySRMs.reverseOrder).to.be.false
      expect(mySRMs.srms).to.exist
      // should have one extra srm for past filter as per mocked method
      expect(mySRMs.srms.length).to.equal(srms.length)
      expect(spy.withArgs(0).calledOnce)

    })

    it('past SRMs should be fetched', function() {
      // apply past filter
      mySRMs.changeFilter('past')
      expect(mySRMs.statusFilter).to.equal('past')
      $rootScope.$apply()
      expect(mySRMs.srms).to.exist
      // should have one less srm for upcoming filter as per mocked method
      expect(mySRMs.srms.length).to.equal(srms.length - 1)
    })
  })

})
