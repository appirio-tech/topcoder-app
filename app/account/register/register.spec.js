/* jshint -W117, -W030 */
describe('Register Controller', function() {
  var controller

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject('$controller', '$rootScope', '$q')
  })

  var state = {
    href: function() {
      return 'http://topcoder-dev.com/register/'
    }
  }

  beforeEach(function() {
    var helperService = {
      getCountyObjFromIP: function() {
        return $q.when({name: "United States", alpha2: "US", alpha3: "USA", code: "840"})
      }
    }

    controller = $controller('RegisterController', {
      $state: state,
      Helpers: helperService
    })

    $rootScope.$apply()
  })

  bard.verifyNoOutstandingHttpRequests()

  it('should be created successfully', function() {
    expect(controller).to.be.defined
  })
})
