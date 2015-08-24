/* jshint -W117, -W030 */
describe('Profile Badges Controller', function() {
  var controller;
  var profileService, userService;
  var scope;
  var mockUserProfile = mockData.getMockUserProfile();

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.appModule('tc.profile');
    bard.inject(this,
      '$httpBackend',
      '$rootScope',
      '$controller',
      'CONSTANTS',
      '$q',
      'ProfileService',
      'UserService'
    );

    profileService = ProfileService;
    userService = UserService;

    // mock user api
    sinon.stub(userService, 'getUserProfile', function() {
      var deferred = $q.defer();
      deferred.resolve(mockUserProfile.data);
      return deferred.promise;
    });
    sinon.stub(userService, 'getUserIdentity', function() {
      return {
        userId: 1234567,
        handle: 'ut',
        email: 'ut@topcoder.com'
      };
    });
    scope = $rootScope.$new();
    controller = $controller('BadgesController', {
      $scope: scope,
    });
    $rootScope.$apply();

  });

  bard.verifyNoOutstandingHttpRequests();

  describe('initialization', function() {

    it('$scope.coder', function() {
      expect(scope.coder).to.exist;
      expect(scope.coder.handle).to.equal('vikasrohit');
    });

    it('controller.achievementGroups', function() {
      expect(controller.achievementGroups).to.exist;
      expect(controller.achievementGroups).to.have.length.above(0);
    });
  });


});
