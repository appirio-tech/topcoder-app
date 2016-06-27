/*eslint no-undef:0*/
describe('Submit Develop Files Controller', function() {
  var controller, vm, scope

  var mockChallenge = {
    challenge: {
      name: 'Challenge Name',
      track: 'DEVELOP',
      id: 30049240
    }
  }

  var userService = {
    getUserIdentity: function() {
      return {
        userId: 123456
      }
    }
  }

  var submissionsService = {
    getPresignedURL: function() {}
  }

  var mockWindow = {
    location: {
      reload: function(val) { return val }
    }
  }

  beforeEach(function() {
    bard.appModule('tc.submissions')
    bard.inject(this, '$controller', '$rootScope')

    scope = $rootScope.$new()
  })

  bard.verifyNoOutstandingHttpRequests()

  beforeEach(function() {
    controller = $controller('SubmitDevelopFilesController', {
      $scope: scope,
      UserService: userService,
      challengeToSubmitTo: mockChallenge,
      SubmissionsService: submissionsService,
      $window: mockWindow
    })
    vm = controller
  })

  it('exists', function() {
    expect(vm).to.exist
  })

  it('sets the right track for the method', function() {
    controller = $controller('SubmitDevelopFilesController', {
      $scope: scope,
      UserService: userService,
      challengeToSubmitTo: {
        challenge: {
          name: 'Challenge Name',
          track: 'DEVELOP',
          id: 30049240
        }
      },
      SubmissionsService: submissionsService,
      $window: mockWindow
    })
    vm = controller
    scope.$digest()

    expect(vm.submissionsBody.data.method).to.equal('DEVELOP_CHALLENGE_ZIP_FILE')
  })

  describe('setFileReference', function() {
    var file, fieldId

    beforeEach(function() {
      // TODO: change to be more relevant to develop
      file = {
        name: 'Dashboard 2.png',
        size: 575548,
        type: 'image/png'
      }
      fieldId = 'DESIGN_COVER'

      vm.setFileReference(file, fieldId)
      scope.$digest()
    })

    afterEach(function() {
      file = undefined
      fieldId = undefined
    })

    it('adds a file object to the submissions body', function() {
      expect(vm.submissionsBody.data.files).to.have.length(1)
    })

    it('replaces a file object with a new one if it has the same fieldId', function() {
      expect(vm.submissionsBody.data.files).to.have.length(1)

      // TODO: change to be more relevant to develop submissions
      var newFile = {
        name: 'different_image.png',
        size: 4321,
        type: 'image/png'
      }

      vm.setFileReference(newFile, fieldId)
      scope.$digest()

      expect(vm.submissionsBody.data.files).to.have.length(1)
      expect(vm.submissionsBody.data.files[0].name).to.equal('different_image.png')
    })

    it('sets the correct mediaTypes on the fileObject', function() {
      // TODO: change to be more relevant to develop
      expect(vm.submissionsBody.data.files[0].mediaType).to.equal('image/png')

      var newFile = {
        name: 'submission.zip',
        size: 43121,
        type: 'application/zip'
      }
      var newFieldId = 'SUBMISSION_ZIP'

      vm.setFileReference(newFile, newFieldId)
      scope.$digest()

      expect(vm.submissionsBody.data.files[1].mediaType).to.equal('application/octet-stream')

      var newFile2 = {
        name: 'source.zip',
        size: 2314,
        type: 'application/zip'
      }
      var newFieldId2 = 'SOURCE_ZIP'

      vm.setFileReference(newFile2, newFieldId2)
      scope.$digest()

      expect(vm.submissionsBody.data.files[2].mediaType).to.equal('application/octet-stream')
    })
  })

  describe('uploadSubmission', function() {
    it('adds comments to the submissions body', function() {
      vm.comments = 'test comments'
      scope.$digest()

      vm.uploadSubmission()
      scope.$digest()

      expect(vm.submissionsBody.data.submitterComments).to.equal('test comments')
    })

    it('calls the submission service', function() {
      var mockAPICall = sinon.spy(submissionsService, 'getPresignedURL')

      vm.uploadSubmission()
      scope.$digest()

      expect(mockAPICall).calledOnce
    })
  })

  describe('refreshPage', function() {
    it('reloads the page', function() {
      var mockRefresh = sinon.spy(mockWindow.location, 'reload')

      vm.refreshPage()
      scope.$digest()

      expect(mockRefresh).calledWith(true)
      expect(mockRefresh).calledOnce
    })
  })

  describe('cancelRetry', function() {
    it('sets showProgress to false', function() {
      vm.showProgress = true
      scope.$digest()
      expect(vm.showProgress).to.be.true

      vm.cancelRetry()
      scope.$digest()
      expect(vm.showProgress).to.be.false
    })
  })
})
