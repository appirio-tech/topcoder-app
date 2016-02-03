const mockData = require('../../../tests/test-helpers/mock-data')

/* jshint -W117, -W030 */
describe('Challenges Widget Controller', function() {
  var controller
  var domain
  var authService, challengeService, userService
  var marathons = mockData.getMockMarathons()
  var challenges = mockData.getMockiOSChallenges()
  var marathons = mockData.getMockMarathons()

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this,
      '$controller',
      '$rootScope',
      '$q',
      'TcAuthService',
      'ChallengeService',
      'UserService',
      'CONSTANTS',
      'Helpers')

    domain = CONSTANTS.domain
    challengeService = ChallengeService
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

    // mock challenges api
    sinon.stub(challengeService, 'getUserChallenges', function(handle, params) {
      var deferred = $q.defer()
      var resp = null
      if (params.filter.status == 'active') {
        resp = JSON.parse(JSON.stringify(challenges))
      } else {
        resp = JSON.parse(JSON.stringify(challenges.slice(1)))
      }
      resp.pagination = {
        total: resp.length,
        pageIndex: 1,
        pageSize: 10
      }
      deferred.resolve(resp)
      return deferred.promise
    })

    sinon.stub(challengeService, 'getUserMarathonMatches', function(handle, params) {
      var deferred = $q.defer()
      deferred.resolve(marathons)
      return deferred.promise
    })

    sinon.stub(challengeService, 'checkChallengeParticipation', function() {
      var deferred = $q.defer()
      deferred.resolve(false)
      return deferred.promise
    })

  })

  bard.verifyNoOutstandingHttpRequests()

  var controller
  beforeEach( function(){
    controller = $controller('MyChallengesWidgetController', {
      ChallengeService: challengeService,
      UserService: userService,
      userIdentity: {handle: 'username'}
    })
    $rootScope.$apply()
  })

  describe('initialization', function() {
    it('vm.domain should be initialized to default value', function() {
      // default value for domain
      expect(controller.domain).to.equal(domain)
    })

    it('vm.userHasChallenges should be initialized to default value', function() {
      // default value for pageIndex
      expect(controller.userHasChallenges).to.equal(true)
    })

    it('controller.myChallenges should be initialized', function() {
      // default value for pageIndex
      expect(controller.myChallenges).to.exist
      expect(controller.myChallenges.length).to.equal(4)
    })
  })

  describe('functions', function() {
    it('toggleView should work', function() {
      controller.toggleView('foo')
      expect(controller.challengeView).to.equal('foo')
    })

  })

})
