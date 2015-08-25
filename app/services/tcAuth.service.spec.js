/* jshint -W117, -W030 */
describe('TcAuthService', function() {
  var service;

  beforeEach(function() {
    bard.appModule('tc.services');
    bard.inject(this, 'AuthTokenService', 'TcAuthService');

    service = TcAuthService;
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should exist', function() {
    expect(service).to.exist;
  });

  describe("isAuthenticated", function() {
    beforeEach(function() {
      bard.mockService(AuthTokenService, {
        getV2Token: function() {
          return
        },
        getV3Token: function() {
          return "v3Token";
        },
      });
    });
    it('should return false for invalid v2token', function() {
      expect(service.isAuthenticated()).to.be.false;
    });
  });

  describe("isAuthenticated", function() {
    beforeEach(function() {
      bard.mockService(AuthTokenService, {
        getV2Token: function() {
          return "v2Token";
        },
        getV3Token: function() {
          return ;
        },
      });
    });
    it('should return false for invalid v3token', function() {
      expect(service.isAuthenticated()).to.be.false;
    });
  });

  describe("isAuthenticated", function() {
    beforeEach(function() {
      bard.mockService(AuthTokenService, {
        getV2Token: function() {
          return "v2Token";
        },
        getV3Token: function() {
          return "V3Token";
        },
      });
    });
    it('should return true for valid tokens', function() {
      expect(service.isAuthenticated()).to.be.true;
    });
  });
  describe("isAuthenticated", function() {
    beforeEach(function() {
      bard.mockService(AuthTokenService, {
        getV2Token: function() {
          return ;
        },
        getV3Token: function() {
          return ;
        },
      });
    });
    it('should return false for invalid tokens', function() {
      expect(service.isAuthenticated()).to.be.false;
    });
  });
});
// describe.only('TCAuthService', function() {
//   beforeEach(function() {
//       var service;
//     bard.appModule('tc.services');
//     bard.inject(this, '$httpBackend', 'AuthTokenService', 'TcAuthService');
//     bard.mockService(AuthTokenService, {
//       getV2Token(): function() {return;},
//       getV3Token(): function() {return "v3token";}
//     });
//     service = TcAuthService;
//     $rootScope.$apply();
//   });

//   // bard.verifyNoOutstandingHttpRequests();

//   it('should exist', function() {
//     expect(service).to.exist;
//   });

// describe('isAuthenticated', function() {
//   it('should return false for invalid v3 token', function() {
//     expect(service.isAuthenticated()).to.be.false;
//   });
// });
// });
