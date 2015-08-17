/* jshint -W117, -W030 */
describe('Helper Service', function() {

  var fakeWindow = {
    location: {
      href: "/"
    }
  };
  var fakeLocation = {
    url: function(param) {
      return;
    }
  };
  sinon.spy(fakeLocation, "url");
  var fakeState = {
    go: function(name, params) {return;}
  };
  sinon.spy(fakeState, "go");

  beforeEach(function() {
    module('tc.services', function($provide) {
      $provide.value('$window', fakeWindow);
      $provide.value('$state', fakeState);
      $provide.value('$location', fakeLocation);
    });

    bard.inject(this, 'Helpers', '$state', '$location');
  });

  describe("isEmail()", function() {
    it('should should return true for "test+12@appirio.com"', function() {
      expect(Helpers.isEmail("test+12@appirio.com")).to.be.true;
    });

    it('should should return false for "test123"', function() {
      expect(Helpers.isEmail("test123")).to.be.false;
    });
  });

  describe("redirectPostLogin()", function() {
    it("should redirect to the next param", function() {
      Helpers.redirectPostLogin(encodeURIComponent("www.topcoder-dev.com"));
      expect(fakeWindow.location.href).to.equal("www.topcoder-dev.com");
    });

    it("should redirect to the next param", function() {
      Helpers.redirectPostLogin(encodeURIComponent("www.google.com"));
      expect($state.go).to.have.been.calledWith("dashboard");
    });

    it("should redirect to the next param", function() {
      Helpers.redirectPostLogin(encodeURIComponent("/members/test1/"));
      expect($location.url).to.have.been.calledWith("/members/test1/");
    });
  });
});
