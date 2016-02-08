/*eslint no-undef:0*/
describe('Account Info Controller', function() {
  var controller
  var vm
  var credential = {hasPassword: true}
  var deferred
  var fakeStateGo

  beforeEach(function() {
    bard.appModule('tc.settings')
    bard.inject(this, '$controller', '$rootScope', '$q')

    deferred = $q.defer()

    var userService = {
      getUserIdentity: function() {
        return {handle: 'nicktest', email: 'nicktest@gmail.com'}
      },
      resetPassword: function() {
        return $q.when({})
      },
      getUserProfile: function() {
        return deferred.promise
      }
    }

    var userData = {
      handle: 'nicktest',
      email: 'nicktest@gmail.com',
      homeCountryCode: 'USA',
      clone: function() {
        return angular.copy(this)
      }
    }

    var state = {
      go: function(transitionTo) {
        return transitionTo
      }
    }

    fakeStateGo = sinon.spy(state, 'go')

    controller = $controller('AccountInfoController', {
      UserService: userService,
      userData: userData,
      $scope: $rootScope.$new(),
      $state: state
    })

    vm = controller
  })

  bard.verifyNoOutstandingHttpRequests()

  it('should be created successfully', function() {
    expect(controller).to.exist
  })

  describe('updating a user\'s password', function() {
    // beforeEach(function() {
    //   $rootScope.$apply()
    // })

    xit('should return an error if the user entered an incorrect current password', function() {

    })
  })

  describe('vm.isSocialRegistrant', function() {
    it('should be false if a user has a password', function() {
      deferred.resolve({credential: credential})

      $rootScope.$apply()

      expect(vm.isSocialRegistrant).to.be.false
    })

    it('should be true if a user does not have a password', function() {
      credential.hasPassword = false

      deferred.resolve({credential: credential})

      $rootScope.$apply()

      expect(vm.isSocialRegistrant).to.be.true
    })

    it('should go to the edit page on error', function() {
      deferred.reject()

      $rootScope.$apply()

      expect(fakeStateGo).to.have.been.calledWith('settings.profile')
    })
  })

  describe('get address', function() {
    it('should return a correct address', function() {
      vm.homeAddress = {}
      expect(vm.getAddr().length).to.be.equal(0)
      vm.homeAddress = {streetAddr1: 'a', city: 'b', zip: 21}
      expect(vm.getAddr().length).to.be.equal(1)
    })
  })
})
