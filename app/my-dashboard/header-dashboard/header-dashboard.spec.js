const mockData = require('../../../tests/test-helpers/mock-data')

/* jshint -W117, -W030 */
describe('Header Dashboard Controller', function() {
  var controller
  var domain
  var authService, notificationService, userService, profileService, identity
  var profile = mockData.getMockProfile()
  var stats = mockData.getMockStats()
  var financials = mockData.getMockUserFinancials()

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this,
      '$controller',
      '$rootScope',
      '$q',
      'TcAuthService',
      'NotificationService',
      'UserService',
      'ProfileService',
      'CONSTANTS',
      'Helpers')

    domain = CONSTANTS.domain
    notificationService = NotificationService
    authService = TcAuthService
    userService = UserService
    profileService = ProfileService

    identity = function() {
      return {
        handle: 'albertwang',
        userId: 123456
      }
    }

    // mock user api
    sinon.stub(userService, 'getUserIdentity', function() {
      return {
        userId: 1234567,
        handle: 'ut',
        email: 'ut@topcoder.com'
      }
    })

    // mock profile api
    sinon.stub(profileService, 'getUserProfile', function(handle) {
      var deferred = $q.defer()
      deferred.resolve(profile)
      return deferred.promise
    })
    sinon.stub(profileService, 'getUserStats', function(handle) {
      var deferred = $q.defer()
      deferred.resolve(stats)
      return deferred.promise
    })
    // sinon.stub(profileService, 'getRanks', function(handle) {
    //   var deferred = $q.defer()
    //   var resp = {eventId: 3445, userId: 12345}
    //   deferred.resolve(resp)
    //   return deferred.promise
    // })
    sinon.stub(profileService, 'getUserFinancials', function(handle) {
      var deferred = $q.defer()
      deferred.resolve(financials)
      return deferred.promise
    })

    // mock challenges api
    sinon.stub(notificationService, 'inform', function() {
      // do nothing
      // TODO may be it can be tested by mocking notifier
    })
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('inialization', function() {
    var controller = null
    beforeEach( function(){
      controller = $controller('HeaderDashboardController', {
        NotificationService : notificationService,
        UserService : userService,
        ProfileService: profileService,
        userIdentity: identity,
        profile: profile
      })
      $rootScope.$apply()
    })

    it('variables should be initialized to correct value', function() {
      expect(controller.profile).to.exist
      expect(controller.profile.handle).to.equal('albertwang')
    })
  })

  describe('inialization with profile api stats endpoint error', function() {
    var controller = null
    beforeEach( function(){
      profileService.getUserStats.restore()
      sinon.stub(profileService, 'getUserStats', function(handle) {
        var deferred = $q.defer()
        deferred.reject('failed')
        return deferred.promise
      })
      controller = $controller('HeaderDashboardController', {
        NotificationService : notificationService,
        UserService : userService,
        ProfileService: profileService,
        userIdentity: identity,
        profile: profile
      })
      $rootScope.$apply()
    })

    it('variables should be initialized to correct value', function() {
      expect(controller.profile).to.exist
      expect(controller.profile.handle).to.equal('albertwang')
    })
  })

  describe('inialization with profile api profile endpoint error', function() {
    var controller = null
    beforeEach( function(){
      profileService.getUserProfile.restore()
      sinon.stub(profileService, 'getUserProfile', function(handle) {
        var deferred = $q.defer()
        deferred.reject('failed')
        return deferred.promise
      })
      controller = $controller('HeaderDashboardController', {
        NotificationService : notificationService,
        UserService : userService,
        ProfileService: profileService,
        userIdentity: identity,
        profile: profileService.getUserProfile()
      })
      $rootScope.$apply()
    })

    it('variables should be initialized to correct value', function() {
      expect(controller.profile.$$state.status).to.equal(2)
      expect(controller.profile.$$state.value).to.equal('failed')
    })
  })

})
