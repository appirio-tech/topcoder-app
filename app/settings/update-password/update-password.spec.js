/* jshint -W117, -W030 */
describe('Update Password Controller', function() {
  var vm;
  var mockProfile = mockData.getMockProfile();

  beforeEach(function() {
    bard.appModule('tc.settings');
    bard.inject(this, '$controller', '$rootScope', '$q');

    mockProfile.plain = function() {
      return this;
    };

    vm = $controller('UpdatePasswordController', {
      UserService: {
        getUserIdentity: function() {
          return {
            handle: 'foo',
            email: 'bar'
          };
        }
      }
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(vm).to.exist;
  });

  // describe('user data', function() {
  //   var user;

  //   beforeEach(function() {
  //     user = vm.userData;
  //   })

  //   it('should have a userData object when the controller is loaded', function() {
  //     expect(user).to.be.an('object');
  //   });

  //   it('should have the tracks that the user is interested in', function() {
  //     expect(user.tracks).to.contain('DATA_SCIENCE');
  //   });

  //   it('should store the tracks in an object after processing', function() {
  //     expect(vm.tracks['develop']).to.be.false;
  //     expect(vm.tracks['data_science']).to.be.true;
  //     expect(vm.tracks['design']).to.be.false;
  //   })
  // });

});
