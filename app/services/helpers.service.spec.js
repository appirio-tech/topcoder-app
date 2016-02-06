/*eslint no-undef:0*/
import angular from 'angular'
const mockData = require('../../tests/test-helpers/mock-data')

describe('Helper Service', function() {

  var fakeWindow = {
    location: {
      href: '/'
    },
    decodeURIComponent: function(param) {
      return decodeURIComponent(param)
    }
  }
  // sinon.spy(fakeWindow.location, 'href')
  var fakeLocation = {
    url: function(param) {
      return
    }
  }
  sinon.spy(fakeLocation, 'url')
  var fakeState = {
    go: function(name, params) {return}
  }
  sinon.spy(fakeState, 'go')

  beforeEach(function() {
    angular.mock.module('topcoder', function($provide) {
      $provide.value('$window', fakeWindow)
      $provide.value('$state', fakeState)
      $provide.value('$location', fakeLocation)
    })

    bard.inject(this, 'Helpers', '$rootScope', '$state', '$location', '$window', '$httpBackend')
  })

  describe('isEmail()', function() {
    it('should should return true for "test+12@appirio.com"', function() {
      expect(Helpers.isEmail('test+12@appirio.com')).to.be.true
    })

    it('should should return false for "test123"', function() {
      expect(Helpers.isEmail('test123')).to.be.false
    })
  })

  describe('redirectPostLogin()', function() {
    it('should redirect to the next param', function() {
      Helpers.redirectPostLogin(encodeURIComponent('http://www.topcoder-dev.com'))
      expect(fakeWindow.location.href).to.equal('http://www.topcoder-dev.com')
    })

    it('should redirect to the next param', function() {
      Helpers.redirectPostLogin(encodeURIComponent('www.google.com'))
      expect($state.go).to.have.been.calledWith('dashboard')
    })

    it('should redirect to the next param', function() {
      Helpers.redirectPostLogin(encodeURIComponent('/members/test1/'))
      expect($location.url).to.have.been.calledWith('/members/test1/')
    })
  })

  describe('getSocialUserData()', function() {
    var mockProfile
    beforeEach(function() {
      mockProfile = mockData.getMockAuth0Profile()
    })
    it('should get JSON for facebook user data ', function() {
      mockProfile.identities[0].connection = 'facebook'
      var socialData = Helpers.getSocialUserData(mockProfile, '')
      expect(socialData).to.exist.not.null
      expect(socialData.socialUserId).to.exist.to.equal('123456')
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.first_name + '.' + mockProfile.last_name)
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name)
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name)
      expect(socialData.email).to.exist.to.equal(mockProfile.email)
      expect(socialData.socialProvider).to.exist.to.equal('facebook')
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token)
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret)
    })

    it('should get JSON for github user data ', function() {
      mockProfile.identities[0].connection = 'github'
      var socialData = Helpers.getSocialUserData(mockProfile, '')
      expect(socialData).to.exist.not.null
      expect(socialData.socialUserId).to.exist.to.equal('123456')
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.nickname)
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name)
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name)
      expect(socialData.email).to.exist.to.equal(mockProfile.email)
      expect(socialData.socialProvider).to.exist.to.equal('github')
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token)
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret)
    })

    it('should get JSON for github user data without lastname ', function() {
      mockProfile.identities[0].connection = 'github'
      mockProfile.name = 'mock'
      var socialData = Helpers.getSocialUserData(mockProfile, '')
      expect(socialData).to.exist.not.null
      expect(socialData.socialUserId).to.exist.to.equal('123456')
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.nickname)
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name)
      expect(socialData.lastname).to.exist.to.equal('')
      expect(socialData.email).to.exist.to.equal(mockProfile.email)
      expect(socialData.socialProvider).to.exist.to.equal('github')
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token)
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret)
    })

    it('should get JSON for bitbucket user data ', function() {
      mockProfile.identities[0].connection = 'bitbucket'
      var socialData = Helpers.getSocialUserData(mockProfile, '')
      expect(socialData).to.exist.not.null
      expect(socialData.socialUserId).to.exist.to.equal('123456')
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.username)
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name)
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name)
      expect(socialData.email).to.exist.to.equal(mockProfile.email)
      expect(socialData.socialProvider).to.exist.to.equal('bitbucket')
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token)
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret)
    })

    it('should get JSON for stackoverflow user data ', function() {
      mockProfile.identities[0].connection = 'stackoverflow'
      var socialData = Helpers.getSocialUserData(mockProfile, '')
      expect(socialData).to.exist.not.null
      expect(socialData.socialUserId).to.exist.to.equal('123456')
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal('123456')
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name)
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name)
      expect(socialData.email).to.exist.to.equal(mockProfile.email)
      expect(socialData.socialProvider).to.exist.to.equal('stackoverflow')
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token)
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret)
    })

    it('should get JSON for dribbble user data ', function() {
      mockProfile.identities[0].connection = 'dribbble'
      var socialData = Helpers.getSocialUserData(mockProfile, '')
      expect(socialData).to.exist.not.null
      expect(socialData.socialUserId).to.exist.to.equal('123456')
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal('123456')
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name)
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name)
      expect(socialData.email).to.exist.to.equal(mockProfile.email)
      expect(socialData.socialProvider).to.exist.to.equal('dribbble')
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token)
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret)
    })

    it('should get JSON for twitter user data ', function() {
      mockProfile.identities[0].connection = 'twitter'
      mockProfile.screen_name = mockProfile.username
      var socialData = Helpers.getSocialUserData(mockProfile, '')
      expect(socialData).to.exist.not.null
      expect(socialData.socialUserId).to.exist.to.equal('123456')
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.username)
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name)
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name)
      // Twitter does not give email
      expect(socialData.email).to.exist.to.equal('')
      expect(socialData.socialProvider).to.exist.to.equal('twitter')
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token)
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret)
    })

    it('should get JSON for twitter user data without lastname ', function() {
      mockProfile.identities[0].connection = 'twitter'
      mockProfile.name = 'mock'
      mockProfile.screen_name = mockProfile.username
      var socialData = Helpers.getSocialUserData(mockProfile, '')
      expect(socialData).to.exist.not.null
      expect(socialData.socialUserId).to.exist.to.equal('123456')
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.username)
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name)
      expect(socialData.lastname).to.exist.to.equal('')
      // Twitter does not give email
      expect(socialData.email).to.exist.to.equal('')
      expect(socialData.socialProvider).to.exist.to.equal('twitter')
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token)
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret)
    })

    it('should get JSON for google-oauth2 user data ', function() {
      mockProfile.identities[0].connection = 'google-oauth2'
      var socialData = Helpers.getSocialUserData(mockProfile, '')
      expect(socialData).to.exist.not.null
      expect(socialData.socialUserId).to.exist.to.equal('123456')
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.nickname)
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name)
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name)
      expect(socialData.email).to.exist.to.equal(mockProfile.email)
      expect(socialData.socialProvider).to.exist.to.equal('google-oauth2')
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token)
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret)
    })
  })

  describe('getPageTitle()', function() {

    it('should get page title from state ', function() {
      var state = { data: {title: 'Mock Page'}}
      var title = Helpers.getPageTitle(state, null)
      expect(title).to.exist.to.equal('Mock Page | TopCoder')
    })

    it('should get default page title when state does not have page title ', function() {
      var state = {}
      var title = Helpers.getPageTitle(state, null)
      expect(title).to.exist.to.equal('TopCoder')
    })

    it('should get page title from state with dynamic data ', function() {
      var state = { data: {title: 'Mock Page {{a.b.c}}'}}
      var title = Helpers.getPageTitle(state, {locals : {resolve: {$$values : {a: {b : {c: 'Title'}}}}}})
      expect(title).to.exist.to.equal('Mock Page Title | TopCoder')
    })

    it('should get static page title from state with unknown expression for dynamic data ', function() {
      var state = { data: {title: 'Mock Page {a.b.c}'}}
      var title = Helpers.getPageTitle(state, {locals : {resolve: {$$values : {a: {b : {c: 'Title'}}}}}})
      expect(title).to.exist.to.equal('Mock Page {a.b.c} | TopCoder')
    })

    it('should replace dynamic data with empty value when not available in current state ', function() {
      var state = { data: {title: 'Mock Page {{a.b.c}}'}}
      var title = Helpers.getPageTitle(state, {locals : {resolve: {$$values : {a: {b : {}}}}}})
      expect(title).to.exist.to.equal('Mock Page  | TopCoder')
    })
  })

  describe('getParameterByName()', function() {

    it('should get params from the URL ', function() {
      var url = 'https://topcoder.com/challenges?paramA=123&paramB=234'
      var paramA = Helpers.getParameterByName('paramA', url)
      var paramB = Helpers.getParameterByName('paramB', url)
      expect(paramA).to.exist.to.equal('123')
      expect(paramB).to.exist.to.equal('234')
    })

    it('should get params with [ or ] in from the URL ', function() {
      var url = 'https://topcoder.com/challenges?[paramA]=123&[paramB]=234'
      var paramA = Helpers.getParameterByName('[paramA]', url)
      var paramB = Helpers.getParameterByName('[paramB]', url)
      expect(paramA).to.exist.to.equal('123')
      expect(paramB).to.exist.to.equal('234')
    })

    it('should get empty value for non existing param from the URL ', function() {
      var url = 'https://topcoder.com/challenges?paramA=123&paramB=234'
      var paramA = Helpers.getParameterByName('paramC', url)
      expect(paramA).to.exist.to.equal('')
    })
  })

  describe('peerReview module helpers ', function() {
    it('should store objects by id ', function() {
      var obj = {}
      var questions = [{id:1}, {id: 'bcd'}, {id: 'cde'}]
      Helpers.storeById(obj, questions)
      expect(obj['1']).to.exist
      expect(obj.bcd).to.exist
      expect(obj.cde).to.exist
    })

    it('should parse questions ', function() {
      var questions = [
        {id: 1, questionTypeId: 5, guideline: 'some guideline'},
        {id: 'bcd', questionTypeId: 4, guideline: 'some guideline\nsecond line'},
        {id: 'cde', questionTypeId: 5, guideline: 'some guideline\nsecond line\nthird line'}
      ]
      Helpers.parseQuestions(questions)
      expect(questions[0].guidelines).to.exist.to.have.length(1)
      expect(questions[1].guidelines).not.to.exist
      expect(questions[2].guidelines).to.exist.to.have.length(3)
    })

    it('should parse answers ', function() {
      var questions = {
        q1 : {id: 'q1', questionTypeId: 5, guideline: 'some guideline'},
        q2 : {id: 'q2', questionTypeId: 5, guideline: 'some guideline\nsecond line'},
        q3 : {id: 'q3', questionTypeId: 5, guideline: 'some guideline\nsecond line\nthird line'}
      }
      var answers = [
        {id: 'a1', scorecardQuestionId: 'q1', answer: 3, comments:[ {content: 'perfect'}]},
        {id: 'a2', scorecardQuestionId: 'q2', answer: 1, comments:[]},
        {id: 'a3', scorecardQuestionId: 'q3', answer: 2, comments:[ {content: 'good'}]}
      ]
      Helpers.parseAnswers(questions, answers)
      // validate q1
      expect(questions.q1.answer).to.exist.to.equal(3)
      expect(questions.q1.reviewItemId).to.exist.to.equal('a1')
      expect(questions.q1.comment).to.exist.to.equal('perfect')
      // validate q2
      expect(questions.q2.answer).to.exist.to.equal(1)
      expect(questions.q2.reviewItemId).to.exist.to.equal('a2')
      expect(questions.q2.comment).not.to.exist
      // validate q3
      expect(questions.q3.answer).to.exist.to.equal(2)
      expect(questions.q3.reviewItemId).to.exist.to.equal('a3')
      expect(questions.q3.comment).to.exist.to.equal('good')
    })

    it('should compile review items for first time creation ', function() {
      var questions = {
        '1' : {id: '1', questionTypeId: 5, guideline: 'some guideline'},
        '2' : {id: '2', questionTypeId: 5, guideline: 'some guideline\nsecond line'},
        '3' : {id: '3', questionTypeId: 5, guideline: 'some guideline\nsecond line\nthird line'}
      }
      var answers = [
        {id: 'a1', scorecardQuestionId: '1', answer: 3, comments:[ {content: 'perfect'}]},
        {id: 'a2', scorecardQuestionId: '2', answer: 1, comments:[]},
        {id: 'a3', scorecardQuestionId: '3', answer: 2, comments:[ {content: 'good'}]}
      ]
      // assumes parseAnswers to be working as expected
      Helpers.parseAnswers(questions, answers)

      var review = {id: 'rev1', resourceId: 'res1', uploadId: 'u1'}
      var reviewItems = Helpers.compileReviewItems(questions, review, false)
      expect(reviewItems).to.exist.to.have.length(3)
      expect(reviewItems[0].reviewId).to.exist.to.equal(review.id)
      expect(reviewItems[0].uploadId).to.exist.to.equal(review.uploadId)
      // expect(reviewItems[0].id).to.exist.to.equal(answers[0].id)
      expect(reviewItems[0].answer).to.exist.to.equal(answers[0].answer.toString())
      expect(reviewItems[0].scorecardQuestionId).to.exist.to.equal(parseInt(answers[0].scorecardQuestionId))
      expect(reviewItems[0].comments).to.exist.to.have.length(answers[0].comments.length)
    })

    it('should compile review items for updating existing review items ', function() {
      var questions = {
        '1' : {id: '1', questionTypeId: 5, guideline: 'some guideline', reviewItemId: 'revItem1'},
        '2' : {id: '2', questionTypeId: 5, guideline: 'some guideline\nsecond line', reviewItemId: 'revItem2'},
        '3' : {id: '3', questionTypeId: 5, guideline: 'some guideline\nsecond line\nthird line', reviewItemId: 'revItem3'}
      }
      var answers = [
        {id: 'a1', scorecardQuestionId: '1', answer: 3, comments:[ {content: 'perfect'}]},
        {id: 'a2', scorecardQuestionId: '2', answer: 1, comments:[]},
        {id: 'a3', scorecardQuestionId: '3', answer: 2, comments:[ {content: 'good'}]}
      ]
      // assumes parseAnswers to be working as expected
      Helpers.parseAnswers(questions, answers)

      var review = {id: 'rev1', resourceId: 'res1', uploadId: 'u1'}
      var reviewItems = Helpers.compileReviewItems(questions, review, true)
      expect(reviewItems).to.exist.to.have.length(3)
      expect(reviewItems[0].uploadId).to.exist.to.equal(review.uploadId)
      expect(reviewItems[0].id).to.exist.to.equal(answers[0].id)
      expect(reviewItems[0].answer).to.exist.to.equal(answers[0].answer.toString())
      expect(reviewItems[0].scorecardQuestionId).to.exist.to.equal(parseInt(answers[0].scorecardQuestionId))
      expect(reviewItems[0].comments).to.exist.to.have.length(answers[0].comments.length)
    })
  })

  describe('npad ', function() {
    it('should pad string with 0 ', function() {
      var padded = Helpers.npad('123', 5)
      expect(padded).to.exist.to.equal('00123')
    })

    it('should pad number with 0 ', function() {
      var padded = Helpers.npad(123, 5)
      expect(padded).to.exist.to.equal('00123')
    })

    it('should not pad string with 0 ', function() {
      var padded = Helpers.npad('12345', 5)
      expect(padded).to.exist.to.equal('12345')
    })
  })

  describe('setupLoginEventMetrics ', function() {
    it('should add object with identify key ', function() {
      $window._kmq = []
      Helpers.setupLoginEventMetrics('mockuser')
      expect($window._kmq).to.have.length(1)
      expect($window._kmq[0][0]).to.exist.to.equal('identify')
      expect($window._kmq[0][1]).to.exist.to.equal('mockuser')
    })
  })
})
