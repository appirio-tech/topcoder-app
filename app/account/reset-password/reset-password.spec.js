/* jshint -W117, -W030 */
describe('Reset Password Controller', function() {
  var controller;
  var apiUrl = 'https://api.topcoder-dev.com/v3';

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.appModule('tc.profile');
    bard.inject(this, '$controller');

    controller = $controller('ResetPasswordController', {
      $scope: {},
      $state: {
        href: function() {
          return 'http://topcoder-dev.com/reset-password/';
        }
      },
      handle: 'rakesh',
      token: 'doesntmatter'
    });   
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(controller).to.be.defined;
  });

});
