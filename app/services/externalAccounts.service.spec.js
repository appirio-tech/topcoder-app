///*eslint no-undef:0*/
//import _ from 'lodash'
//const mockData = require('../../tests/test-helpers/mock-data')
//
//describe('ExternalAccount Service', function() {
//  var service
//  var mockAccountsData = mockData.getMockLinkedExternalAccountsData()
//  var mockUserLinksData = mockData.getMockLinkedExternalAccounts()
//  var mockAuth0Profile = mockData.getMockAuth0Profile()
//  var mockProfile = mockData.getMockProfile()
//  var apiUrl, authApiUrl
//  var auth0, userService
//  var profileGet, profilePost, profileDelete
//
//  beforeEach(function() {
//    bard.appModule('topcoder')
//    bard.inject(this, 'ExternalAccountService', '$httpBackend', '$q', 'CONSTANTS', 'JwtInterceptorService', 'auth', 'UserService')
//    bard.mockService(JwtInterceptorService, {
//      getToken: $q.when('token'),
//      _default:    $q.when([])
//    })
//
//    apiUrl  = CONSTANTS.API_URL
//    authApiUrl = CONSTANTS.AUTH_API_URL
//    service = ExternalAccountService
//    auth0 = auth
//    userService = UserService
//
//    // mock user api
//    sinon.stub(auth0, 'signin', function(params, successCallback, failureCallback) {
//      if (params && params.state == 'failure') {
//        failureCallback.call(failureCallback, 'MOCK_ERROR')
//      }
//      successCallback.call(
//        successCallback,
//        mockAuth0Profile,
//        'mockAuth0IdToken',
//        'mockAuth0AccessToken',
//        params.state,
//        null
//      )
//    })
//
//    // mock user service
//    sinon.stub(userService, 'getUserIdentity', function() {
//      return {userId: 111, handle: mockProfile.handle }
//    })
//
//    $httpBackend
//      .when('GET', apiUrl + '/members/test1/externalAccounts/')
//      .respond(200, {result: {content: mockAccountsData}})
//
//    profileGet = $httpBackend.when('GET', authApiUrl + '/users/111/?fields=profiles')
//    profileGet.respond(200, {result: {content: mockUserLinksData}})
//
//    profilePost = $httpBackend.when('POST', authApiUrl + '/users/111/profiles/')
//    profilePost.respond(200, {result: {content: mockProfile}})
//
//    profileDelete = $httpBackend.when('DELETE', authApiUrl + '/users/111/profiles/stackoverflow/')
//    profileDelete.respond(200, {result: {content: mockProfile}})
//
//  })
//
//  afterEach(function() {
//    $httpBackend.verifyNoOutstandingExpectation()
//    $httpBackend.verifyNoOutstandingRequest()
//  })
//
//  it('service should be defined', function() {
//    expect(service).to.be.defined
//  })
//
//  it('should return linked external accounts', function() {
//    service.getLinkedAccounts(111).then(function(data) {
//      expect(data).to.have.length(5)
//    })
//    $httpBackend.flush()
//  })
//
//  it('should return linked external accounts data', function() {
//    service.getAccountsData('test1').then(function(data) {
//      data = data.plain()
//      expect(data).to.be.defined
//      expect(_.keys(data)).to.include.members(['dribbble', 'github', 'behance', 'bitbucket', 'linkedin', 'stackoverflow', 'twitter'])
//    })
//    $httpBackend.flush()
//  })
//
//  it('should return all non-pending external links', function() {
//    // spy
//    service.getAllExternalLinks('test1', 111, false).then(function(data) {
//      expect(data).to.be.defined
//      expect(_.map(data, 'provider')).to.include.members(['dribbble', 'github','bitbucket', 'stackoverflow'])
//      expect(_.every(_.map(data, 'data'))).to.be.truthy
//    })
//    $httpBackend.flush()
//  })
//
//  it('should return all external links including pending', function() {
//    // spy
//    service.getAllExternalLinks('test1', 111, true).then(function(data) {
//      expect(data).to.be.defined
//      expect(_.map(data, 'provider')).to.include.members(['dribbble', 'github', 'behance', 'bitbucket','stackoverflow'])
//      expect(data).to.have.length(5)
//      var nullAccounts = _.remove(data, function(n) {return n.data.status === 'PENDING'})
//      expect(nullAccounts).to.have.length(1)
//    })
//    $httpBackend.flush()
//  })
//
//  it('should not return unsupported links even if they are returned by the API', function() {
//    var profiles = JSON.parse(JSON.stringify(mockUserLinksData))
//    profiles.profiles.push({providerType: 'unsupported'})
//    profileGet.respond(200, {result: {content: profiles}})
//    // spy
//    service.getAllExternalLinks('test1', 111, true).then(function(data) {
//      expect(data).to.be.defined
//      expect(_.map(data, 'provider')).to.include.members(['dribbble', 'github','bitbucket', 'stackoverflow'])
//      expect(_.every(_.map(data, 'data'))).to.be.truthy
//    })
//    $httpBackend.flush()
//  })
//
//  it('should fail in returning links', function() {
//    var errorMessage = 'bad request'
//    // mocks the GET call to respond with 400 bad request
//    profileGet.respond(400, {result:  { status: 400, content: errorMessage } })
//    // calls getAllExternalLinks method with valid params
//    service.getAllExternalLinks('test1', 111, true).then(function(data) {
//      sinon.assert.fail('should not be called')
//    }).catch(function(resp) {
//      expect(resp).to.exist
//      expect(resp.status).to.exist.to.equal(400)
//    })
//    $httpBackend.flush()
//  })
//
//  it('should link external account', function() {
//    // call linkExternalAccount method with supporte network, should succeed
//    service.linkExternalAccount('stackoverflow', 'callback').then(function(data) {
//      expect(data).to.be.defined
//      // console.log(data)
//      expect(data.status).to.exist.to.equal('SUCCESS')
//      expect(data.linkedAccount).to.exist
//      expect(data.linkedAccount.provider).to.exist.to.equal('stackoverflow')
//      expect(data.linkedAccount.data).to.exist
//      expect(data.linkedAccount.data.status).to.exist.to.equal('PENDING')
//    })
//    $httpBackend.flush()
//  })
//
//  it('should fail with unsupported network', function() {
//    // call linkExternalAccount method with unsupported network, should fail
//    service.linkExternalAccount('unsupported', 'callback').then(function(data) {
//      expect(data).to.be.defined
//      expect(data.status).to.exist.to.equal('failed')
//      expect(data.error.to.contain('unsupported'))
//    })
//  })
//
//  it('should fail with already existing profile', function() {
//    var errorMessage = 'social profile exists'
//    profilePost.respond(400, {result:  { status: 400, content: errorMessage } })
//    // call linkExternalAccount method, having user service throw already exist
//    service.linkExternalAccount('stackoverflow', 'callback').then(function(data) {
//      sinon.assert.fail('should not be called')
//    }, function(error) {
//      expect(error).to.be.defined
//      expect(error.status).to.exist.to.equal('SOCIAL_PROFILE_ALREADY_EXISTS')
//      expect(error.msg).to.exist.to.equal(errorMessage)
//    })
//    $httpBackend.flush()
//  })
//
//  it('should fail with auth0 error', function() {
//    // call linkExternalAccount method with auth0 throwing error
//    service.linkExternalAccount('stackoverflow', 'failure').then(function(data) {
//      sinon.assert.fail('should not be called')
//    }, function(error) {
//      expect(error).to.be.exist.to.equal('MOCK_ERROR')
//    })
//    $httpBackend.flush()
//  })
//
//  it('should fail, with fatal error, in linking external account', function() {
//    var errorMessage = 'endpoint not found'
//    profilePost.respond(404, {result:  { status: 404, content: errorMessage } })
//    // call unlinkExternalAccount method with supporte network, should succeed
//    service.linkExternalAccount('stackoverflow', 'callback').then(function(data) {
//      sinon.assert.fail('should not be called')
//    }).catch(function(error) {
//      expect(error).to.be.defined
//      expect(error.status).to.exist.to.equal('FATAL_ERROR')
//      expect(error.msg).to.exist.to.equal(errorMessage)
//    })
//    $httpBackend.flush()
//  })
//
//  it('should unlink external account', function() {
//    var errorMessage = 'social profile exists'
//    profilePost.respond(400, {result:  { status: 400, content: errorMessage } })
//    // call unlinkExternalAccount method with supporte network, should succeed
//    service.unlinkExternalAccount('stackoverflow').then(function(data) {
//      expect(data).to.be.defined
//      // console.log(data)
//      expect(data.status).to.exist.to.equal('SUCCESS')
//    })
//    $httpBackend.flush()
//  })
//
//  it('should fail, with profile does not exist, in unlinking external account', function() {
//    var errorMessage = 'social profile does not exists'
//    profileDelete.respond(404, {result:  { status: 404, content: errorMessage } })
//    // call unlinkExternalAccount method with supporte network, should succeed
//    service.unlinkExternalAccount('stackoverflow').then(function(data) {
//      sinon.assert.fail('should not be called')
//    }).catch(function(error) {
//      expect(error).to.be.defined
//      expect(error.status).to.exist.to.equal('SOCIAL_PROFILE_NOT_EXIST')
//      expect(error.msg).to.exist.to.equal(errorMessage)
//    })
//    $httpBackend.flush()
//  })
//
//  it('should fail, with fatal error, in unlinking external account', function() {
//    var errorMessage = 'bad request'
//    profileDelete.respond(400, {result:  { status: 400, content: errorMessage } })
//    // call unlinkExternalAccount method with supporte network, should succeed
//    service.unlinkExternalAccount('stackoverflow').then(function(data) {
//      sinon.assert.fail('should not be called')
//    }).catch(function(error) {
//      expect(error).to.be.defined
//      expect(error.status).to.exist.to.equal('FATAL_ERROR')
//      expect(error.msg).to.exist.to.equal(errorMessage)
//    })
//    $httpBackend.flush()
//  })
//
//})
