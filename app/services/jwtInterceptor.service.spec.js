describe('JWT Interceptor Service', function() {
  var service;
  var apiUrl = 'https://api.topcoder-dev.com/';

  var fakeAuthTokenService = {
      getV3Token: sinon.spy(function() {
        return "v3Token";
      }),
      getV2Token: sinon.spy(function() {
        return "v2Token";
      }),
      setV3Token: sinon.spy(function(token) {
        return;
      }),
      refreshToken: function(idToken) {
        return idToken;
      }
    },
    fakeTcAuthService = {
      isAuthenticated: function() {
        return false;
      }
    },
    fakeState = {
      go: sinon.spy(function(param) {
        return;
      })
    },
    fakeJwtHelper = {
      isTokenExpired: function() {
        return true;
      }
    };

  beforeEach(function() {
    module('tc.services', function($provide) {
      $provide.value('AuthTokenService', fakeAuthTokenService);
      $provide.value('TcAuthService', fakeTcAuthService);
      $provide.value('$state', fakeState);
    });
    bard.inject(this, 'jwtHelper', 'AuthTokenService', '$state', 'JwtInterceptorService');
    service = JwtInterceptorService;
  });

  it("should not add token for .html files", function() {
    var config = {
      url: apiUrl + "/test.html"
    };
    expect(service.getToken(config)).to.not.exist;
  });

  describe("for un-authenticated users", function() {
    beforeEach(function() {
      bard.inject(this, 'TcAuthService');
      sinon.stub(TcAuthService, 'isAuthenticated').returns(false);
    });

    it("should not add token for /v3/challenges", function() {
      var config = {
        method: "get",
        url: apiUrl + "/v3/challenges/?filter=status%3Dactive"
      };
      expect(service.getToken(config)).to.not.exist;
      expect(TcAuthService.isAuthenticated).to.be.have.been.calledOnce;
    });

    it("should redirect to login page for other endpoints", function() {
      var config = {
        method: "get",
        url: apiUrl + "/v3/members/test"
      };
      service.getToken(config);
      expect($state.go).to.be.have.been.calledWith('login');
      expect(TcAuthService.isAuthenticated).to.be.have.been.calledOnce;
    });

    afterEach(function() {
      TcAuthService.isAuthenticated.restore();
    });
  });

/*
  describe("for authenticated users", function() {
    beforeEach(function() {
      bard.inject(this, 'TcAuthService');
      sinon.stub(TcAuthService, 'isAuthenticated').returns(true);
      $rootScope.$apply();
    });

    describe(" with an valid token ", function() {
      beforeEach(function() {
        bard.inject(this, 'jwtHelper');
        sinon.stub(jwtHelper, 'isTokenExpired').returns(false);
      });

      afterEach(function() {
        jwtHelper.isTokenExpired.restore();
      });

      it("should return v2 token for /v3/members/test/stats", function() {
        var config = {
          method: "get",
          url: apiUrl + "/v3/members/test/stats"
        };
        expect(service.getToken(config)).to.equal("v2Token");
        expect(TcAuthService.isAuthenticated).to.be.have.been.calledOnce;
        expect(jwtHelper.isTokenExpired).to.be.have.been.calledOnce;
      });

      it("should return v3 token for /v3/users/123", function() {
        var config = {
          method: "post",
          url: apiUrl + "/v3/users/123"
        };
        expect(service.getToken(config)).to.equal('v3Token');
        expect(TcAuthService.isAuthenticated).to.be.have.been.calledOnce;
        expect(jwtHelper.isTokenExpired).to.be.have.been.calledOnce;
      });

      it("should return v2 token for /v2/badges", function() {
        var config = {
          method: "GET",
          url: apiUrl + "/v2/badges"
        };
        expect(service.getToken(config)).to.equal('v2Token');
        expect(TcAuthService.isAuthenticated).to.be.have.been.calledOnce;
        expect(jwtHelper.isTokenExpired).to.be.have.been.calledOnce;
      });
    });

    describe(" with an invalid token and successful refreshToken call", function() {
      beforeEach(function() {
        bard.inject(this, 'jwtHelper', 'AuthTokenService', '$q');
        sinon.stub(jwtHelper, 'isTokenExpired').returns(true);
        sinon.stub(AuthTokenService, 'refreshToken', function(idToken) {
          var deferred = $q.defer();
          var resp = {
            data: {
              result: {
                content: {
                  token: "newV3Token"
                }
              }
            }
          };

          deferred.resolve(resp);
          return deferred.promise;
        });

      });
      afterEach(function() {
        jwtHelper.isTokenExpired.restore();
        AuthTokenService.refreshToken.restore();
      });

      it("should retrieve a valid refresh token", function() {
        var config = {
          method: "get",
          url: apiUrl + "/v3/users/123"
        };
        var retPromise = service.getToken(config);
        $rootScope.$digest();
        expect(retPromise.$$state.value).to.equal("newV3Token");
        expect(TcAuthService.isAuthenticated).to.be.have.been.calledOnce;
        expect(jwtHelper.isTokenExpired).to.be.have.been.calledOnce;
        expect(AuthTokenService.refreshToken).to.be.have.been.calledWith("v3Token");
        expect(AuthTokenService.setV3Token).to.be.have.been.calledWith("newV3Token");
      });
    });

    describe("with an invalid token and un-successful refreshToken call", function() {
      beforeEach(function() {
        bard.inject(this, 'jwtHelper', 'AuthTokenService', '$q');
        sinon.stub(jwtHelper, 'isTokenExpired').returns(true);
        sinon.stub(AuthTokenService, 'refreshToken', function(idToken) {
          var deferred = $q.defer();
          deferred.reject("bad request");
          return deferred.promise;
        });
      });

      afterEach(function() {
        jwtHelper.isTokenExpired.restore();
        AuthTokenService.refreshToken.restore();
      });

      it("should redirect to login", function() {
        var config = {
          method: "get",
          url: apiUrl + "/v3/users/123"
        };
        var retPromise = service.getToken(config);
        $rootScope.$digest();
        expect(retPromise.$$state.value).to.be.null;
        expect(TcAuthService.isAuthenticated).to.be.have.been.calledOnce;
        expect(jwtHelper.isTokenExpired).to.be.have.been.calledOnce;
        expect(AuthTokenService.refreshToken).to.be.have.been.calledWith("v3Token");
        expect($state.go).to.be.have.been.calledWith('login');
      });
    });

    afterEach(function() {
      TcAuthService.isAuthenticated.restore();
    });
  });
*/

});
