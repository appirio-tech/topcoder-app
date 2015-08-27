/* jshint -W117, -W030 */
describe('Edit Profile Controller', function() {
  var vm;
  var mockProfile = mockData.getMockProfile();

  beforeEach(function() {
    bard.appModule('tc.settings');
    bard.inject(this, '$controller', '$rootScope', '$q');

    mockProfile.plain = function() {
      return this;
    };

    vm = $controller('EditProfileController', {
      userData: mockProfile,
      userHandle: 'albertwang'
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(vm).to.exist;
  });

  describe('user data', function() {
    var user;

    beforeEach(function() {
      user = vm.userData;
    })

    it('should have a userData object when the controller is loaded', function() {
      expect(user).to.be.an('object');
    });

    it('should have the tracks that the user is interested in', function() {
      expect(user.tracks).to.contain('DATA_SCIENCE');
    });

    it('should store the tracks in an object after processing', function() {
      expect(vm.tracks['develop']).to.be.false;
      expect(vm.tracks['data_science']).to.be.true;
      expect(vm.tracks['design']).to.be.false;
    })
  });

  describe('updating a user\'s information', function() {
    beforeEach(function() {
      $rootScope.$apply();
    });

    it('should have an updateProfile method', function() {
      expect(vm.updateProfile).to.be.a('function');
    });
  });

  describe('updating a profile image', function() {
    it('should get a presigned url', function() {

    });

    it('should make a request to something', function() {

    });
  });

});
