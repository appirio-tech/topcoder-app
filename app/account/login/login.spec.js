/* jshint -W117, -W030 */
describe('Login Controller', function() {
  var controller
  var scope

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject('$controller', '$rootScope')
  })

  beforeEach(function() {
    scope = $rootScope.$new()
    controller = $controller('LoginController', {
      $scope : scope
    })
    $rootScope.$apply()
  })

  bard.verifyNoOutstandingHttpRequests()

  it('should be created successfully', function() {
    expect(controller).to.be.defined
  })
})
