/*eslint no-undef:0*/
describe('TcAuthToken Service', function() {
  var apiUrl = 'https://api.topcoder-dev.com/v3'
  var service

  var fakeStore = {
      get: sinon.spy(function(name) {
        return 'value'
      }),
      set: sinon.spy(function(name, value) {
        return ''
      }),
      remove: sinon.spy(function(name) {
        return ''
      })
    },
    fakeCookies = {
      get: sinon.spy(function(name) {
        return 'value'
      }),
      remove: sinon.spy(function(name) {
        return
      })
    },
    fakeJwtHelper = {
      decodeToken: sinon.spy(function(token) {
        return 'decodedToken'
      })
    }

  beforeEach(function() {
    bard.appModule('tc.services', function($provide) {
      $provide.value('store', fakeStore)
      $provide.value('$cookies', fakeCookies)
      $provide.value('jwtHelper', fakeJwtHelper)
    })
    bard.inject(this, '$httpBackend', '$window', 'CONSTANTS', '$cookies', 'store', '$http', 'jwtHelper', 'AuthTokenService')
    service = AuthTokenService
  })

  describe('AuthToken Service ', function() {

    it('should retrieve token from cookie', function() {
      expect(service.getV2Token()).to.equal('value')
      expect($cookies.get).to.be.have.been.calledWith('tcjwt')
    })

    it('should remove tokens from store & cookie', function() {
      service.removeTokens()
      expect($cookies.remove).to.have.been.calledWith('tcjwt')
      expect($cookies.remove).to.have.been.calledWith('tcsso')
      expect(store.remove).to.be.have.been.calledWith('appiriojwt')
    })

  })

  describe('Auth service ', function() {
    beforeEach(function() {
      $httpBackend
        .whenPOST(apiUrl + '/authorizations', {})
        .respond(200, {
          result: {
            content: {
              token: 'newToken'
            }
          }
        }
      )

      $httpBackend.whenPOST(
        apiUrl + '/authorizations',
        {
          param: {
            refreshToken: 'refreshToken',
            externalToken: 'idToken'
          }
        })
      .respond(200, {
        result: {
          content: {
            token: 'newToken'
          }
        }
      })

      $httpBackend.whenGET(apiUrl + '/authorizations/1')
      .respond(200, {
        result: {
          content: {
            token: 'newToken'
          }
        }
      })
    })
  })
})
