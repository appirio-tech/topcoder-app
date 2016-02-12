/*eslint no-undef:0*/
const mockData = require('../../../tests/test-helpers/mock-data')

describe('Review Status Controller', function() {
  var controller
  var challenge = mockData.getMockChallenge()
  var challengeDates = mockData.getMockChallengeDates()
  var userReviews = mockData.getMockUsersPeerReviews()

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this, '$controller', '$rootScope', '$q')

    var challengeService = {
      getChallengeDetails: function() {
        return $q.when(challenge)
      },
      getPhase: function() {
        return $q.when(challengeDates)
      }
    }

    var reviewService = {
      getUsersPeerReviews: function() {
        userReviews.plain = function() { return this }
        return $q.when(userReviews)
      }
    }

    var stateParams = {
      challengeId: 123
    }

    controller = $controller('ReviewStatusController', {
      ChallengeService: challengeService,
      ReviewService: reviewService,
      $stateParams: stateParams
    })
  })

  bard.verifyNoOutstandingHttpRequests()

  it('should be created successfully', function() {
    expect(controller).to.exist
  })

  it('should have a domain property', function() {
    expect(controller.domain).to.exist
  })
  it('should have a loaded property', function() {
    expect(controller.loaded).to.exist
  })
  it('should have a challengeId property', function() {
    expect(controller.challengeId).to.exist
  })

  it('should have challenge set to null', function() {
    expect(controller.challenge).to.be.null
  })

  describe('after activation', function() {
    beforeEach(function() {
      $rootScope.$apply()
    })

    it('should get a challenge', function() {
      expect(controller.challenge).to.exist
      expect(controller.challenge.challengeName).to.equal(challenge.challengeName)
    })

    it('should have a user\'s reviews', function() {
      expect(controller.reviews).to.exist
      expect(controller.reviews).to.have.length(5)
    })

    it('should know when the reviews are due', function() {
      expect(controller.reviewsDue).to.exist
      expect(controller.reviewsDue).to.equal('2015-05-01T04:00Z')
    })
  })
})
