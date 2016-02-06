const mockData = require('../../tests/test-helpers/mock-data')

describe('Profile Controller', function() {
  var controller
  var userService
  var mockProfile = mockData.getMockProfile()
  var mockV2Profile = mockData.getMockUserProfile()
  var mockStats = mockData.getMockStats()
  var mockSkills = mockData.getMockSkills()
  var mockExternalLinksData = mockData.getMockLinkedExternalAccountsData()

  beforeEach(function() {
    bard.appModule('tc.profile')
    bard.inject(this, '$controller', 'CONSTANTS', '$rootScope', '$q', 'ProfileService', 'ExternalAccountService', 'UserService')

    userService = UserService

    var profileService = {
      getUserStats: function() {
        return $q.when({result: {content: mockStats}})
      },
      getUserSkills: function() {
        return $q.when({result: {content: mockSkills}})
      },
      getUserHandleColor: function() {
        return 'something'
      },
      getRanks: ProfileService.getRanks,
      getTracks: function() { return ['DEVELOP'] }
    }
    // mock user api
    sinon.stub(userService, 'getV2UserProfile', function() {
      var deferred = $q.defer()
      deferred.resolve(mockV2Profile.data)
      return deferred.promise
    })

    var externalAccountService = {
      getLinkedExternalLinksData: function() {
        return $q.when(mockExternalLinksData)
      }
    }
    controller = $controller('ProfileCtrl', {
      userHandle: 'rakesh',
      profile: mockProfile,
      ProfileService: profileService,
      userService: userService,
      ExternalAccountService: externalAccountService
    })
  })

  bard.verifyNoOutstandingHttpRequests()

  it('should be defined', function() {
    expect(controller).to.be.defined
  })

  describe('after activation', function() {
    beforeEach(function() {
      $rootScope.$apply()
    })

    it('should have some properties', function() {
      expect(controller.userHandle).to.be.equal('rakesh')
      expect(controller.status).to.be.defined
      expect(controller.statsPromise).to.be.defined
      expect(controller.skillsPromise).to.be.defined
      expect(controller.externalLinksPromise).to.be.defined
    })

    it('should have default status', function() {
      expect(controller.status.badges).to.equal(CONSTANTS.STATE_LOADING)
      expect(controller.status.stats).to.equal(CONSTANTS.STATE_READY)
      expect(controller.status.skills).to.equal(CONSTANTS.STATE_READY)
      expect(controller.status.externalLinks).to.equal(CONSTANTS.STATE_LOADING)
    })
  })
})
