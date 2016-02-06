const mockData = require('../../../tests/test-helpers/mock-data')

describe('SubTrack Controller', function() {
  var profileCtrl, controller
  var challengeService, profileService
  var mockProfile = mockData.getMockProfile()
  var mockStats = mockData.getMockStats()
  var mockSkills = mockData.getMockSkills()
  var mockChallenges = mockData.getMockiOSChallenges()
  var mockHistory = mockData.getMockHistory()
  var mockExternalLinksData = mockData.getMockLinkedExternalAccountsData()
  var apiUrl
  var track = 'develop', subTrack = 'development'
  var profileScope, scope

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.appModule('tc.profile')
    bard.inject(this,
      '$httpBackend',
      '$controller',
      'CONSTANTS',
      '$rootScope',
      '$q',
      '$state',
      'ChallengeService',
      'ProfileService'
    )

    apiUrl = CONSTANTS.API_URL
    challengeService = ChallengeService
    profileService = ProfileService

    profileScope = $rootScope.$new()
    profileCtrl = $controller('ProfileCtrl', {
      $scope: profileScope,
      userHandle: 'rakesh',
      profile: mockProfile
    })
    profileScope.profileVm = profileCtrl


    // mock challenges api
    sinon.stub(challengeService, 'getUserChallenges', function(handle, data) {
      var deferred = $q.defer()
      var resp = null
      if (data.filter.subTrack.toLowerCase() == 'design') {
        resp = JSON.parse(JSON.stringify(mockChallenges.slice(1)))
      } else {
        resp = JSON.parse(JSON.stringify(mockChallenges))
      }
      resp.metadata = {
        totalCount: resp.length
      }
      deferred.resolve(resp)
      return deferred.promise
    })
    // mock stats
    $httpBackend
      .when('GET', apiUrl + '/members/rakesh/stats/')
      .respond(200, {result: {content: mockStats}})
    // mock skills
    $httpBackend
      .when('GET', apiUrl + '/members/albertwang/stats/history/')
      .respond(200, mockHistory)
    // mock history
    $httpBackend
      .when('GET', apiUrl + '/members/rakesh/skills/')
      .respond(200, {result: {content: mockSkills}})
    $httpBackend
      .when('GET', apiUrl + '/members/rakesh/externalAccounts/')
      .respond(200, {result: { content: mockExternalLinksData}})

    // mock profile api
    sinon.stub(profileService, 'getDistributionStats', function(track, subTrack) {
      var deferred = $q.defer()
      var resp = {distribution: []}
      deferred.resolve(resp)
      return deferred.promise
    })

    sinon.stub(profileService, 'getHistoryStats', function(handle) {
      var deferred = $q.defer()
      var resp = {}
      deferred.resolve(resp)
      return deferred.promise
    })
  })

  afterEach(function() {
    $httpBackend.flush()
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  })


  bard.verifyNoOutstandingHttpRequests()

  xdescribe('default values', function() {

    beforeEach( function(){
      scope = profileScope.$new()
      controller = $controller('ProfileSubtrackController', {
        $scope: scope,
        $stateParams: {
          track: track,
          subTrack: subTrack
        },
        userHandle: 'rakesh'
      })
    })

    it('should be defined', function() {
      expect(controller).to.be.defined
    })

    it('should have some properties', function() {
      expect(controller.status).to.be.defined
      expect(controller.track).to.be.defined
      expect(controller.subTrack).to.be.defined
    })

    it('should have default status', function() {
      expect(controller.status.challenges).to.be.equal(CONSTANTS.STATE_LOADING)
    })

    it('should have correct track and subTrack', function() {
      expect(controller.track).to.be.equal(track)
      expect(controller.subTrack).to.be.equal(subTrack)
    })

    it('should have challenges inialized to empty array', function() {
      expect(controller.challenges).to.exist
      expect(controller.challenges.length).to.be.equal(0)
    })

  })

  xdescribe('inialization', function() {

    beforeEach( function(){
      scope = profileScope.$new()
      controller = $controller('ProfileSubtrackController', {
        $scope: scope,
        $stateParams: {
          track: track,
          subTrack: subTrack
        },
        userHandle: 'rakesh'
      })
      profileScope.$apply()
    })

    it('should be defined', function() {
      expect(controller).to.be.defined
    })

    it('should have updated status', function() {
      expect(controller.status.challenges).to.be.equal(CONSTANTS.STATE_READY)
    })

    it('should have correct track and subTrack', function() {
      expect(controller.track).to.be.equal(track)
      expect(controller.subTrack).to.be.equal(subTrack)
    })

    it('should have challenges loaded', function() {
      expect(controller.challenges).to.exist
      expect(controller.challenges.length).to.be.equal(3)
    })

  })

  xdescribe('change sub track', function() {
    var goCallCount = 0
    var argState = null
    var argParams = null
    var changeTo = 'DESIGN'
    beforeEach( function(){
      scope = profileScope.$new()
      controller = $controller('ProfileSubtrackController', {
        $scope: scope,
        $stateParams: {
          track: track,
          subTrack: subTrack
        },
        $state: {
          go: function(state, params) {
            goCallCount++
            argState = state
            argParams = params
          }
        },
        userHandle: 'rakesh'
      })
      profileScope.$apply()
    })

    it('subTrack should be changed', function() {
      expect(controller.challenges).to.exist
      expect(controller.challenges.length).to.equal(mockChallenges.length)
      // change subTrack
      controller.selectSubTrack(changeTo)
      profileScope.$apply()
      expect(goCallCount).to.equal(1)
      expect(argState).to.equal('profile.subtrack')
      expect(argParams).not.to.null
      expect(argParams.track).to.exist
      expect(argParams.track).to.equal(track)
      expect(argParams.subTrack).to.exist
      expect(argParams.subTrack).to.equal(changeTo)
    })
  })

})
