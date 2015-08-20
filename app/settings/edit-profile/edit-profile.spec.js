/* jshint -W117, -W030 */
describe('Edit Profile Controller', function() {
  var vm;

  beforeEach(function() {
    bard.appModule('tc.settings');
    bard.inject(this, '$controller', '$rootScope', '$q');

    var userData = {
      location: 'China',
      aboutMe: 'I like algorithms and stuff.',
      image: 'path/to/image.svg',
      tracks: {
        'development': true,
        'design': false,
        'dataScience': true
      },
      skills: ['nunchuck skills', 'bow hunting skills', 'computer hacking skills'],
      externalLinks: ['github', 'stack overflow']
    };

    vm = $controller('EditProfileController', {
      userData: userData
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

    it('should have all userData fields from the resolve', function() {
      expect(user.location).to.equal('China');
      expect(user.aboutMe).to.equal('I like algorithms and stuff.');
      expect(user.tracks).to.be.an('object');
      expect(user.skills).to.be.an('array');
      expect(user.externalLinks).to.be.an('array');
      expect(user.image).to.exist;
    });

    it('should have the tracks that the user is interested in', function() {
      expect(user.tracks).to.have.all.keys(['development', 'design', 'dataScience']);
      expect(user.tracks['development']).to.be.true;
      expect(user.tracks['dataScience']).to.be.true;
      expect(user.tracks['design']).to.be.false;
    });

    it('should have the user\'s external links', function() {
      expect(user.externalLinks).to.contain('github');
    });
  });

  describe('updating a user\'s information', function() {
    beforeEach(function() {
      $rootScope.$apply();
    });

    it('should have an updateProfile method', function() {
      expect(vm.updateProfile).to.be.a('function');
    });

  });

});
