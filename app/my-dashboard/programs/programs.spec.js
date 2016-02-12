/*eslint no-undef:0*/
const mockData = require('../../../tests/test-helpers/mock-data')

describe('Programs Controller', function() {
  var domain
  var challengeService, userService, memberCertService
  var challenges = mockData.getMockiOSChallenges()

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this,
      '$controller',
      '$rootScope',
      '$q',
      'ChallengeService',
      'UserService',
      'MemberCertService',
      'CONSTANTS')

    domain = CONSTANTS.domain
    challengeService = ChallengeService
    userService = UserService
    memberCertService = MemberCertService

    // mock user api
    sinon.stub(userService, 'getUserIdentity', function() {
      return {
        userId: 1234567,
        handle: 'ut',
        email: 'ut@topcoder.com'
      }
    })

    // mock member cert api
    sinon.stub(memberCertService, 'getMemberRegistration', function(handle, params) {
      var deferred = $q.defer()
      var resp = {eventId: 3445, userId: 12345}
      deferred.resolve(resp)
      return deferred.promise
    })

    sinon.stub(memberCertService, 'registerMember', function() {
      var deferred = $q.defer()
      var resp = {eventId: 3445, userId: 12345}
      deferred.resolve(resp)
      return deferred.promise
    })


    // mock challenges api
    sinon.stub(challengeService, 'getChallenges', function() {
      var deferred = $q.defer()
      var resp = JSON.parse(JSON.stringify(challenges))
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

  describe('inialization with registered member', function() {
    var controller = null
    beforeEach( function(){
      controller = $controller('ProgramsController', {
        ChallengeService : challengeService,
        UserService : userService,
        MemberCertService: memberCertService
      })
      $rootScope.$apply()
    })

    it('variables initialized to correct value', function() {
      // default value for domain
      expect(controller.domain).to.equal(domain)
      // default value for registered
      expect(controller.registered).to.equal(true)
      // default value for loading
      expect(controller.loading).to.equal(false)
      // default value for challenges
      expect(controller.challenges).to.exist
      expect(controller.challenges.length).to.equal(challenges.length)
    })

    describe('functions', function() {
      beforeEach(function() {
        controller.registerUser()
        $rootScope.$apply()
      })

      it('registerUser should work', function() {
        expect(controller.registered).to.be.equal(true)
      })
    })
  })

  describe('inialization with unregistered memeber', function() {
    var controller = null
    beforeEach( function(){
      memberCertService.getMemberRegistration.restore()
      // mock member cert api
      sinon.stub(memberCertService, 'getMemberRegistration', function(handle, params) {
        var deferred = $q.defer()
        deferred.resolve(null)
        return deferred.promise
      })
      controller = $controller('ProgramsController', {
        ChallengeService : challengeService,
        UserService : userService,
        MemberCertService: memberCertService
      })
      $rootScope.$apply()
    })

    it('variables initialized to correct value', function() {
      // default value for domain
      expect(controller.domain).to.equal(domain)
      // default value for registered
      expect(controller.registered).to.equal(false)
      // default value for loading
      expect(controller.loading).to.equal(false)
      // default value for challenges
      expect(controller.challenges).to.exist
      expect(controller.challenges.length).to.equal(0)
    })
  })

  describe('inialization failure with member api error', function() {
    var controller = null
    beforeEach( function(){
      memberCertService.getMemberRegistration.restore()
      // mock member cert api
      sinon.stub(memberCertService, 'getMemberRegistration', function(handle, params) {
        var deferred = $q.defer()
        deferred.reject('failed')
        return deferred.promise
      })
      controller = $controller('ProgramsController', {
        ChallengeService : challengeService,
        UserService : userService,
        MemberCertService: memberCertService
      })
      $rootScope.$apply()
    })

    it('variables should be initialized to correct value', function() {
      // default value for domain
      expect(controller.domain).to.equal(domain)
      // default value for registered
      expect(controller.registered).to.equal(false)
      // default value for loading
      expect(controller.loading).to.equal(false)
      // default value for challenges
      expect(controller.challenges).to.exist
      expect(controller.challenges.length).to.equal(0)
    })
  })

})
