/*eslint no-undef:0*/
describe('TcAuthService', function() {
  var service

  beforeEach(function() {
    bard.appModule('tc.services')
    bard.inject(this, 'AuthTokenService', 'TcAuthService')

    service = TcAuthService
  })

  bard.verifyNoOutstandingHttpRequests()

  it('should exist', function() {
    expect(service).to.exist
  })

  describe('isAuthenticated - invalid v2 token', function() {
    beforeEach(function() {
      bard.mockService(AuthTokenService, {
        getV2Token: function() {
          return
        },
        getV3Token: function() {
          return 'v3Token'
        },
        getTCSSOToken: function() {
          return 'tcssoToken'
        }
      })
    })

    it('should return false', function() {
      expect(service.isAuthenticated()).to.be.false
    })
  })

  describe('isAuthenticated - invalid v3 token', function() {
    beforeEach(function() {
      bard.mockService(AuthTokenService, {
        getV2Token: function() {
          return 'v2Token'
        },
        getV3Token: function() {
          return
        },
        getTCSSOToken: function() {
          return 'tcssoToken'
        }
      })
    })

    it('should return false', function() {
      expect(service.isAuthenticated()).to.be.false
    })
  })

  describe('isAuthenticated - invalid v2 tcsso token', function() {
    beforeEach(function() {
      bard.mockService(AuthTokenService, {
        getV2Token: function() {
          return 'v2Token'
        },
        getV3Token: function() {
          return 'v3Token'
        },
        getTCSSOToken: function() {
          return
        }
      })
    })

    it('should return false', function() {
      expect(service.isAuthenticated()).to.be.false
    })
  })

  describe('isAuthenticated - valid tokens', function() {
    beforeEach(function() {
      bard.mockService(AuthTokenService, {
        getV2Token: function() {
          return 'v2Token'
        },
        getV3Token: function() {
          return 'V3Token'
        },
        getTCSSOToken: function() {
          return 'tcssoToken'
        }
      })
    })

    it('should return true', function() {
      expect(service.isAuthenticated()).to.be.true
    })
  })
})
