/* jshint -W117, -W030 */
describe('Helper Service', function() {

  var fakeWindow = {
    location: {
      href: "/"
    }
  };

  beforeEach(function() {
    bard.appModule('tc.services', function($provide) {
      $provide.value('$window', fakeWindow);
    });

    bard.inject(this, 'Helpers');
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
  });
});
