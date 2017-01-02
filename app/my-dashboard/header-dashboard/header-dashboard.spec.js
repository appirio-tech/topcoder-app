/*eslint no-undef:0*/
const mockData = require('../../../tests/test-helpers/mock-data')

/* jshint -W117, -W030 */
describe('Header Dashboard Controller', function() {
  var profile = mockData.getMockProfile()

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this,
      '$controller',
      '$rootScope',
      '$q',
      'Helpers')
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('inialization', function() {
    var controller = null
    beforeEach( function(){
      controller = $controller('HeaderDashboardController', {
        profile: profile
      })
      $rootScope.$apply()
    })

    it('variables should be initialized to correct value', function() {
      expect(controller.profile).to.exist
      expect(controller.profile.handle).to.equal('albertwang')
    })
  })

  describe('inialization with null profile', function() {
    var controller = null
    beforeEach( function(){
      controller = $controller('HeaderDashboardController', {
        profile: null
      })
      $rootScope.$apply()
    })

    it('variables should be initialized to correct value', function() {
      expect(controller.profile).to.be.null
    })
  })

})
