const mockData = require('../../../tests/test-helpers/mock-data')

/* jshint -W117, -W030 */
describe('Dashboard Subtrack Stats Controller', function() {
  var controller
  var profileService, userStatsService
  var stats = mockData.getMockStats()
  var userIdentity = {
    userId: 1234567,
    handle: 'ut',
    email: 'ut@topcoder.com'
  }

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this,
      '$controller',
      '$rootScope',
      '$q',
      'ProfileService',
      'UserStatsService',
      'CONSTANTS',
      'Helpers')

    profileService = ProfileService
    userStatsService = UserStatsService

    sinon.stub(profileService, 'getUserStats', function() {
      var deferred = $q.defer()
      deferred.resolve(stats)
      return deferred.promise
    })

  })

  bard.verifyNoOutstandingHttpRequests()

  describe('controller', function() {
    var controller = null
    beforeEach( function(){
      controller = $controller('SubtrackStatsController', {
        ProfileService : profileService,
        UserStatsService : userStatsService,
        userIdentity: userIdentity
      })
      $rootScope.$apply()
    })

    describe('initialization', function() {
      it('should load data', function() {
        expect(controller.loading).to.be.equal(false)
      })

      it('should have ranks', function() {
        expect(controller.subtrackRanks.length).to.be.equal(10)
        expect(controller.hasRanks).to.be.equal(true)
      })
    })

  })

})
