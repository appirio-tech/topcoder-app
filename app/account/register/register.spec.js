/* jshint -W117, -W030 */
describe('Register Controller', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject('$controller', '$rootScope');
  });

  var state = {
    href: function() {
      return 'http://topcoder-dev.com/register/';
    }
  }

  beforeEach(function() {
    controller = $controller('RegisterController', {
      $state: state
    });
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be created successfully', function() {
    expect(controller).to.be.defined;
  });

});
