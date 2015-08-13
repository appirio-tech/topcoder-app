/* jshint -W117, -W030 */
describe('Helper Service', function() {

  var service;


  beforeEach(function() {
    bard.appModule('tc.services', bard.fakeStateProvider);
    bard.inject(this, '$window',  '$location', 'Helpers');

    bard.mockService($window, {
      location: {
        href: "/"
      }
    });

    service = Helpers;
  });

  describe("Verify isEmail()", function() {
    it('should should return true for "test+12@appirio.com"', function() {
      expect(service.isEmail("test+12@appirio.com")).to.be(true);
    });

    it('should should return false for "test123"', function() {
      expect(service.isEmail("test123")).to.be(false);
    });
  });

  describe("Verify redirectPostLogin()", function() {
    it("should redirect to my-dashboard", function() {
      service.redirectPostLogin(encodeURIComponent("http://www.topcoder-dev.com"));
      expect($window.location.href).to.equal("http://www.topcoder-dev.com");
    });
  });

});
