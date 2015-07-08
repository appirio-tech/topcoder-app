/* jshint -W117, -W030 */
describe('Dashboard Controller', function() {
  var controller;
  var authService, profileService, userService;
  var userProfileResp;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$controller', '$rootScope', '$q', 'tcAuth', 'profile', 'UserService');
    authService = tcAuth;
    profileService = profile;
    userService = UserService;
    userProfileResp = mockData.getMockUserProfile();

    sinon.stub(profileService, 'getUserProfile', function() {
      var deferred = $q.defer();
      deferred.resolve(userProfileResp);
      return deferred.promise;
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('annonymous view', function() {
    beforeEach(function() {

      sinon.stub(authService, 'isAuthenticated', function() {
        return false;
      });

      controller = $controller('dashboard', {
        $scope: $rootScope.$new()
      });
      $rootScope.$apply();
    });

    it('should be created successfully', function() {
      expect(controller).to.exist;
    });

    it('should have correct page title', function() {
      expect(controller.title).to.exist;
      expect(controller.title).to.be.equal('My Dashboard');
    });

    it('should not have profile set', function() {
      expect(controller.profile).not.to.exist;
    });

    it('should have loggedIn to be false', function() {
      expect(controller.loggedIn).to.be.false;
    });
  });

  describe('logged in view', function() {
    beforeEach(function() {

      sinon.stub(authService, 'isAuthenticated', function() {
        return true;
      });

      controller = $controller('dashboard', {
        $scope: $rootScope.$new()
      });
      $rootScope.$apply();
    });

    it('should be created successfully', function() {
      expect(controller).to.exist;
    });

    it('should have correct page title', function() {
      expect(controller.title).to.exist;
      expect(controller.title).to.be.equal('My Dashboard');
    });

    it('should have profile set', function() {
      expect(profileService.getUserProfile.callCount).to.be.equal(1);
      expect(controller.profile).not.to.be.null;
    });

    it('should have loggedIn not to be false', function() {
      expect(controller.loggedIn).not.to.be.false;
    });

    describe('identity change listener', function() {
      var listener;
      beforeEach(function() {
        listener = sinon.stub();
        controller.addIdentityChangeListener('ut', listener);
      });

      it('should call identity change listener', function() {
        // simulate login event handler
        controller.activate();
        $rootScope.$apply();
        expect(listener.callCount).to.be.equal(1);
      });

      it('should remove call identity change listener', function() {
        controller.removeIdentityChangeListener('ut');
        // simulate login event handler
        controller.activate();
        $rootScope.$apply();
        expect(listener.callCount).to.be.equal(0);
      });
    });

  });

  describe('logged in view profile without photoLink', function() {
    beforeEach(function() {

      sinon.stub(authService, 'isAuthenticated', function() {
        return true;
      });
      userProfileResp.data.photoLink = '';

      controller = $controller('dashboard', {
        $scope: $rootScope.$new()
      });
      $rootScope.$apply();
    });

    it('should be created successfully', function() {
      expect(controller).to.exist;
    });

    it('should have profile set', function() {
      expect(profileService.getUserProfile.callCount).to.be.equal(1);
      expect(controller.profile).not.to.be.null;
    });

    it('should have default profile pic', function(){
      expect(controller.profile.photoLink).to.contain('nophoto_login.gif');
    });
  });

});
