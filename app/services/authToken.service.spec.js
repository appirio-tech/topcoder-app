/* jshint -W117, -W030 */
describe('TcAuthToken Service', function() {
  var apiUrl = 'https://api.topcoder-dev.com/v3';
  var service;

  var fakeStore = {
      get: sinon.spy(function(name) {
        return "value";
      }),
      set: sinon.spy(function(name, value) {
        return "";
      }),
      remove: sinon.spy(function(name) {
        return "";
      })
    },
    fakeCookies = {
      get: sinon.spy(function(name) {
        return "value";
      }),
      remove: sinon.spy(function(name) {
        return;
      })
    },
    fakeJwtHelper = {
      decodeToken: sinon.spy(function(token) {
        return "decodedToken"
      })
    };

  beforeEach(function() {
    bard.appModule('tc.services', function($provide) {
      $provide.value('store', fakeStore);
      $provide.value('$cookies', fakeCookies);
      $provide.value('jwtHelper', fakeJwtHelper);
    });
    bard.inject(this, '$httpBackend', '$window', 'CONSTANTS', '$cookies', 'store', '$http', 'jwtHelper', 'AuthTokenService');
    service = AuthTokenService;
  });

  describe("AuthToken Service ", function() {

    it('should call store to get v3 token"', function() {
      expect(service.getV3Token()).to.equal("value");
      expect(store.get).to.be.have.been.calledWith('appiriojwt');
    });

    it('should call store to set v3 token"', function() {
      service.setV3Token("test");
      expect(store.set).to.be.have.been.calledWith('appiriojwt', "test");
    });

    it('should retrieve token from cookie"', function() {
      expect(service.getV2Token()).to.equal('value');
      expect($cookies.get).to.be.have.been.calledWith('tcjwt');
    });

    it('should remove tokens from store & cookie"', function() {
      service.removeTokens();
      expect($cookies.remove).to.have.been.calledWith('tcjwt');
      expect(store.remove).to.be.have.been.calledWith('appiriojwt');
    });

    it('should use jwtHelper to decode token"', function() {
      expect(service.decodeToken("test")).to.equal("decodedToken");
      expect(jwtHelper.decodeToken).to.be.have.been.calledWith("test");
    });

  });

  describe("Auth service ", function() {
    beforeEach(function() {
      $httpBackend
        .whenPOST(apiUrl + '/authorizations', {})
        .respond(200, {
          result: {
            content: {
              token: "newToken"
            }
          }
        }
      );

      $httpBackend
        .whenPOST(
          apiUrl + '/authorizations',
          {
            param: {
              refreshToken: "refreshToken",
              externalToken: "idToken"
            }
          })
        .respond(200, {
          result: {
            content: {
              token: "newToken"
            }
          }
        });
        $httpBackend
        .whenGET(apiUrl + '/authorizations/1')
        .respond(200, {
          result: {
            content: {
              token: "newToken"
            }
          }
        });
    });

    it('should make a POST request to /authorizations', function() {
      service.getTokenFromAuth0Code("test");
      $httpBackend.expectPOST(
        apiUrl + '/authorizations', {}, {
          'Content-Type': 'application/json',
          'Authorization': 'Auth0Code test'
        }
      );
    });

    it("should make a POST request to exchange V2 token for V3 token", function() {
      service.exchangeToken("refreshToken", "idToken");
      $httpBackend.expectPOST(
        apiUrl + '/authorizations',
        {
          param: {
            refreshToken: "refreshToken",
            externalToken: "idToken"
          }
        },
        {
          withCredentials: true
        }
      );
    });

    it("should make a GET request to refresh V3 token", function() {
      service.exchangeToken("refreshToken", "idToken");
      $httpBackend.expectGET(
        apiUrl + '/authorizations/1',
        {},
        {
          "Authorization": "Bearer token"
        }
      );
    });
  });
});
