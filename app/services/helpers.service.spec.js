/* jshint -W117, -W030 */
describe('Helper Service', function() {

  var fakeWindow = {
    location: {
      href: "/"
    }
  };
  // sinon.spy(fakeWindow.location, "href");
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
      Helpers.redirectPostLogin(encodeURIComponent("http://www.topcoder-dev.com"));
      expect(fakeWindow.location.href).to.equal("http://www.topcoder-dev.com");
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

  describe("getSocialUserData()", function() {
    var mockProfile;
    beforeEach(function() {
      mockProfile = mockData.getMockAuth0Profile();
    });
    it("should get JSON for facebook user data ", function() {
      mockProfile.identities[0].connection = 'facebook'; 
      var socialData = Helpers.getSocialUserData(mockProfile, "");
      expect(socialData).to.exist.not.null;
      expect(socialData.socialUserId).to.exist.to.equal('123456');
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.first_name + '.' + mockProfile.last_name);
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name);
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name);
      expect(socialData.email).to.exist.to.equal(mockProfile.email);
      expect(socialData.socialProvider).to.exist.to.equal('facebook');
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token);
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret);
    });

    it("should get JSON for github user data ", function() {
      mockProfile.identities[0].connection = 'github'; 
      var socialData = Helpers.getSocialUserData(mockProfile, "");
      expect(socialData).to.exist.not.null;
      expect(socialData.socialUserId).to.exist.to.equal('123456');
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.nickname);
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name);
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name);
      expect(socialData.email).to.exist.to.equal(mockProfile.email);
      expect(socialData.socialProvider).to.exist.to.equal('github');
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token);
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret);
    });

    it("should get JSON for github user data without lastname ", function() {
      mockProfile.identities[0].connection = 'github'; 
      mockProfile.name = 'mock';
      var socialData = Helpers.getSocialUserData(mockProfile, "");
      expect(socialData).to.exist.not.null;
      expect(socialData.socialUserId).to.exist.to.equal('123456');
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.nickname);
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name);
      expect(socialData.lastname).to.exist.to.equal('');
      expect(socialData.email).to.exist.to.equal(mockProfile.email);
      expect(socialData.socialProvider).to.exist.to.equal('github');
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token);
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret);
    });

    it("should get JSON for bitbucket user data ", function() {
      mockProfile.identities[0].connection = 'bitbucket'; 
      var socialData = Helpers.getSocialUserData(mockProfile, "");
      expect(socialData).to.exist.not.null;
      expect(socialData.socialUserId).to.exist.to.equal('123456');
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.username);
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name);
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name);
      expect(socialData.email).to.exist.to.equal(mockProfile.email);
      expect(socialData.socialProvider).to.exist.to.equal('bitbucket');
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token);
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret);
    });

    it("should get JSON for stackoverflow user data ", function() {
      mockProfile.identities[0].connection = 'stackoverflow'; 
      var socialData = Helpers.getSocialUserData(mockProfile, "");
      expect(socialData).to.exist.not.null;
      expect(socialData.socialUserId).to.exist.to.equal('123456');
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal('123456');
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name);
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name);
      expect(socialData.email).to.exist.to.equal(mockProfile.email);
      expect(socialData.socialProvider).to.exist.to.equal('stackoverflow');
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token);
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret);
    });

    it("should get JSON for dribbble user data ", function() {
      mockProfile.identities[0].connection = 'dribbble'; 
      var socialData = Helpers.getSocialUserData(mockProfile, "");
      expect(socialData).to.exist.not.null;
      expect(socialData.socialUserId).to.exist.to.equal('123456');
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal('123456');
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name);
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name);
      expect(socialData.email).to.exist.to.equal(mockProfile.email);
      expect(socialData.socialProvider).to.exist.to.equal('dribbble');
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token);
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret);
    });

    it("should get JSON for twitter user data ", function() {
      mockProfile.identities[0].connection = 'twitter'; 
      mockProfile.screen_name = mockProfile.username;
      var socialData = Helpers.getSocialUserData(mockProfile, "");
      expect(socialData).to.exist.not.null;
      expect(socialData.socialUserId).to.exist.to.equal('123456');
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.username);
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name);
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name);
      // Twitter does not give email
      expect(socialData.email).to.exist.to.equal('');
      expect(socialData.socialProvider).to.exist.to.equal('twitter');
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token);
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret);
    });

    it("should get JSON for twitter user data without lastname ", function() {
      mockProfile.identities[0].connection = 'twitter'; 
      mockProfile.name = 'mock';
      mockProfile.screen_name = mockProfile.username;
      var socialData = Helpers.getSocialUserData(mockProfile, "");
      expect(socialData).to.exist.not.null;
      expect(socialData.socialUserId).to.exist.to.equal('123456');
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.username);
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name);
      expect(socialData.lastname).to.exist.to.equal('');
      // Twitter does not give email
      expect(socialData.email).to.exist.to.equal('');
      expect(socialData.socialProvider).to.exist.to.equal('twitter');
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token);
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret);
    });

    it("should get JSON for google-oauth2 user data ", function() {
      mockProfile.identities[0].connection = 'google-oauth2'; 
      var socialData = Helpers.getSocialUserData(mockProfile, "");
      expect(socialData).to.exist.not.null;
      expect(socialData.socialUserId).to.exist.to.equal('123456');
      // TODO cross check population of username for all networks
      expect(socialData.username).to.exist.to.equal(mockProfile.nickname);
      expect(socialData.firstname).to.exist.to.equal(mockProfile.first_name);
      expect(socialData.lastname).to.exist.to.equal(mockProfile.last_name);
      expect(socialData.email).to.exist.to.equal(mockProfile.email);
      expect(socialData.socialProvider).to.exist.to.equal('google-oauth2');
      expect(socialData.accessToken).to.exist.to.equal(mockProfile.identities[0].access_token);
      expect(socialData.accessTokenSecret).to.exist.to.equal(mockProfile.identities[0].access_token_secret);
    });
  });

  describe("getPageTitle()", function() {

    it("should get page title from state ", function() {
      var state = { data: {title: 'Mock Page'}};
      var title = Helpers.getPageTitle(state, null);
      expect(title).to.exist.to.equal('Mock Page | TopCoder');
    });

    it("should get default page title when state does not have page title ", function() {
      var state = {};
      var title = Helpers.getPageTitle(state, null);
      expect(title).to.exist.to.equal('TopCoder');
    });

    it("should get page title from state with dynamic data ", function() {
      var state = { data: {title: 'Mock Page {{a.b.c}}'}};
      var title = Helpers.getPageTitle(state, {locals : {resolve: {$$values : {a: {b : {c: 'Title'}}}}}});
      expect(title).to.exist.to.equal('Mock Page Title | TopCoder');
    });

    it("should get static page title from state with unknown expression for dynamic data ", function() {
      var state = { data: {title: 'Mock Page {a.b.c}'}};
      var title = Helpers.getPageTitle(state, {locals : {resolve: {$$values : {a: {b : {c: 'Title'}}}}}});
      expect(title).to.exist.to.equal('Mock Page {a.b.c} | TopCoder');
    });

    it("should replace dynamic data with empty value when not available in current state ", function() {
      var state = { data: {title: 'Mock Page {{a.b.c}}'}};
      var title = Helpers.getPageTitle(state, {locals : {resolve: {$$values : {a: {b : {}}}}}});
      expect(title).to.exist.to.equal('Mock Page  | TopCoder');
    });
  });
});
