const mockData = require('../../tests/test-helpers/mock-data')

/* jshint -W117, -W030 */
describe('My Challenges Controller', function() {
  var controller
  var scope
  var domain
  var authService, challengeService, userService, identity, mockState
  var marathons = mockData.getMockMarathons()
  var challenges = mockData.getMockiOSChallenges()

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this,
      '$controller',
      'JwtInterceptorService',
      '$rootScope',
      '$q',
      'TcAuthService',
      'ChallengeService',
      'UserService',
      'CONSTANTS',
      'Helpers')

    bard.mockService(JwtInterceptorService, {
      getToken: function() { return "v3Token" }
    })

    domain = CONSTANTS.domain
    challengeService = ChallengeService
    authService = TcAuthService
    userService = UserService

    identity = function() {
      return {
        handle: 'albertwang',
        userId: 123456
      }
    }

    mockState = {
      '$current' : {'name': 'test'},
      go: function() {}
    }

    // mock user api
    sinon.stub(userService, 'getUserIdentity', function() {
      return {
        userId: 1234567,
        handle: 'ut',
        email: 'ut@topcoder.com'
      }
    })

    // mock challenges api
    sinon.stub(challengeService, 'getUserChallenges', function(handle, data) {
      var deferred = $q.defer()
      var resp = null
      if (data.filter.status == 'active') {
        resp = JSON.parse(JSON.stringify(challenges))
      } else {
        resp = JSON.parse(JSON.stringify(challenges.slice(1)))
      }
      resp.metadata = {
        totalCount: resp.length
      }
      deferred.resolve(resp)
      return deferred.promise
    })
    // mock mms api
    sinon.stub(challengeService, 'getUserMarathonMatches', function(handle, data) {
      var deferred = $q.defer()
      var resp = null
      if (data.filter.status == 'active') {
        resp = JSON.parse(JSON.stringify(marathons))
      } else {
        resp = JSON.parse(JSON.stringify(marathons.slice(1)))
      }
      resp.metadata = {
        totalCount: resp.length
      }
      deferred.resolve(resp)
      return deferred.promise
    })
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('initialization', function() {
    var ctrl = null
    var spy
    beforeEach( function(){
      scope = $rootScope.$new()
      ctrl = $controller('MyChallengesController', {
        ChallengeService : challengeService,
        UserService : userService,
        $scope: scope,
        userIdentity: identity,
        $state: mockState
      })
      $rootScope.$apply()
      spy = sinon.spy(ctrl, 'getChallenges')
    })

    it('vm.domain should exist', function() {
      expect(ctrl.domain).to.equal(domain)
    })

    it('default values should be initialized', function() {
      // default value for pageIndex
      expect(ctrl.myChallenges).to.exist
      // expect(ctrl.myChallenges.length).to.equal(challenges.length)
      expect(ctrl.totalCount).to.equal(3)
      expect(ctrl.statusFilter).to.equal('active')
      expect(ctrl.view).to.equal('tile')
      expect(ctrl.loading).to.equal('ready')
      expect(spy.withArgs(0).calledOnce)
    })
  })

  describe('active/past filters', function() {
    var ctrl = null
    var spy
    beforeEach( function(){
      scope = $rootScope.$new()
      ctrl = $controller('MyChallengesController', {
        ChallengeService : challengeService,
        UserService : userService,
        $scope: scope,
        userIdentity: identity,
        $state: mockState,
        $stateParams: {'status': 'completed'}
      })
      $rootScope.$apply()
      spy = sinon.spy(ctrl, 'getChallenges')
    })

    it('past challenges should be fetched', function() {
      expect(ctrl.myChallenges).to.exist
      // should have one less challenge for past filter as per mocked method
      expect(ctrl.myChallenges.length).to.equal(challenges.length)
      expect(spy.withArgs(0).calledOnce)
      expect(ctrl.statusFilter).to.equal('completed')
      expect(ctrl.loading).to.equal('ready')
    })
  })

})
