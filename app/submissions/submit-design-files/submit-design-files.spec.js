/* jshint -W117, -W030 */
describe('Submit Design Files Controller', function() {
  var controller, vm, scope;

  var mockChallenge = {
    challenge: {
      name: 'Challenge Name',
      track: 'DESIGN',
      id: 30049240
    }
  };

  var userService = {
    getUserIdentity: function() {
      return {
        userId: 123456
      };
    }
  };

  var submissionsService = {
    getPresignedURL: function() {}
  };

  var mockWindow = {
    location: {
      reload: function(val) { return val; }
    }
  };

  beforeEach(function() {
    bard.appModule('tc.submissions');
    bard.inject(this, '$controller', '$rootScope');

    scope = $rootScope.$new();
  });

  bard.verifyNoOutstandingHttpRequests();

  beforeEach(function() {
    controller = $controller('SubmitDesignFilesController', {
      $scope: scope,
      UserService: userService,
      challengeToSubmitTo: mockChallenge,
      SubmissionsService: submissionsService,
      $window: mockWindow
    });
    vm = controller;
  });

  it('should exist', function() {
    expect(vm).to.exist;
  });

  describe('setRankTo1', function() {
    it('returns 1 if the input is blank', function() {
      expect(vm.setRankTo1('')).to.equal(1);
    });

    it('returns the input value if not blank', function() {
      var inputText = 'sample input text';
      var result = vm.setRankTo1(inputText);

      expect(result).to.equal(inputText);
    });
  });


  describe('setFileReference', function() {
    var file, fieldId;

    beforeEach(function() {
      file = {
        name: 'Dashboard 2.png',
        size: 575548,
        type: 'image/png'
      };
      fieldId = 'DESIGN_COVER';

      vm.setFileReference(file, fieldId);
      scope.$digest();
    });

    afterEach(function() {
      file = undefined;
      fieldId = undefined;
    });

    it('adds a file object to the submissions body', function() {
      expect(vm.submissionsBody.data.files).to.have.length(1);
    });

    it('replaces a file object with a new one if it has the same fieldId', function() {
      expect(vm.submissionsBody.data.files).to.have.length(1);

      var newFile = {
        name: 'different_image.png',
        size: 4321,
        type: 'image/png'
      };

      vm.setFileReference(newFile, fieldId);
      scope.$digest();

      expect(vm.submissionsBody.data.files).to.have.length(1);
      expect(vm.submissionsBody.data.files[0].name).to.equal('different_image.png');
    });

    it('sets the correct mediaTypes on the fileObject', function() {
      expect(vm.submissionsBody.data.files[0].mediaType).to.equal('image/png');

      var newFile = {
        name: 'submission.zip',
        size: 43121,
        type: 'application/zip'
      };
      var newFieldId = 'SUBMISSION_ZIP';

      vm.setFileReference(newFile, newFieldId);
      scope.$digest();

      expect(vm.submissionsBody.data.files[1].mediaType).to.equal('application/octet-stream');

      var newFile2 = {
        name: 'source.zip',
        size: 2314,
        type: 'application/zip'
      };
      var newFieldId2 = 'SOURCE_ZIP';

      vm.setFileReference(newFile2, newFieldId2);
      scope.$digest();

      expect(vm.submissionsBody.data.files[2].mediaType).to.equal('application/octet-stream');
    });
  });

  describe('uploadSubmission', function() {
    it('adds comments to the submissions body', function() {
      vm.comments = 'test comments';
      scope.$digest();

      vm.uploadSubmission();
      scope.$digest();

      expect(vm.submissionsBody.data.submitterComments).to.equal('test comments');
    });

    it('adds the rank to the submissions body', function() {
      vm.submissionForm.submitterRank = 3;
      scope.$digest();

      vm.uploadSubmission();
      scope.$digest();

      expect(vm.submissionsBody.data.submitterRank).to.equal(3);
    });

    it('calls the submission service', function() {
      var mockAPICall = sinon.spy(submissionsService, 'getPresignedURL');

      vm.uploadSubmission();
      scope.$digest();

      expect(mockAPICall).calledOnce;
    });

    describe('processes the stockart and', function() {
      it('returns an empty array if no stockart given', function() {
        vm.formStockarts = [];
        scope.$digest();

        vm.uploadSubmission();
        scope.$digest();

        expect(vm.submissionsBody.data.stockArts).to.deep.equal([]);
      });

      it('removes the required properties and id from each stockart', function() {
        vm.formStockarts = [
          {
            id: 0,
            description: 'first stockart',
            sourceUrl: 'url.com',
            fileNumber: '123',
            isPhotoDescriptionRequired: false,
            isPhotoURLRequired: false,
            isFileNumberRequired: false
          },
          {
            id: 1,
            description: 'second stockart',
            sourceUrl: 'url2.com',
            fileNumber: '234',
            isPhotoDescriptionRequired: false,
            isPhotoURLRequired: false,
            isFileNumberRequired: false
          }
        ];
        var processedStockart = [
          {
            description: 'first stockart',
            sourceUrl: 'url.com',
            fileNumber: '123',
          },
          {
            description: 'second stockart',
            sourceUrl: 'url2.com',
            fileNumber: '234',
          }
        ];
        scope.$digest();

        vm.uploadSubmission();
        scope.$digest();
        expect(vm.submissionsBody.data.stockArts).to.deep.equal(processedStockart);

      });
    });
    describe('processes the fonts and', function() {
      it('returns an empty array if no fonts given', function() {
        vm.formFonts = [];
        scope.$digest();

        vm.uploadSubmission();
        scope.$digest();

        expect(vm.submissionsBody.data.fonts).to.deep.equal([]);
      });

      it('removes the required properties and id from each font', function() {
        vm.formFonts = [
          {
            id: 0,
            source: 'STUDIO_STANDARD_FONTS_LIST',
            name: 'my font',
            isFontUrlRequired: false,
            isFontUrlDisabled: true,
            isFontNameRequired: false,
            isFontNameDisabled: true,
            isFontSourceRequired: false
          },
          {
            id: 1,
            source: 'FONTS_DOT_COM',
            name: 'my other font',
            sourceUrl: 'fontsource.com',
            isFontUrlRequired: false,
            isFontUrlDisabled: true,
            isFontNameRequired: false,
            isFontNameDisabled: true,
            isFontSourceRequired: false
          }
        ];
        var processedFonts = [
          {
            source: 'STUDIO_STANDARD_FONTS_LIST',
            name: 'my font',
          },
          {
            source: 'FONTS_DOT_COM',
            name: 'my other font',
            sourceUrl: 'fontsource.com',
          }
        ];
        scope.$digest();

        vm.uploadSubmission();
        scope.$digest();
        expect(vm.submissionsBody.data.fonts).to.deep.equal(processedFonts);
      });
    });
  });

  describe('refreshPage', function() {
    it('reloads the page', function() {
      var mockRefresh = sinon.spy(mockWindow.location, 'reload');

      vm.refreshPage();
      scope.$digest();

      expect(mockRefresh).calledWith(true);
      expect(mockRefresh).calledOnce;
    });
  });

  describe('cancelRetry', function() {
    it('sets showProgress to false', function() {
      vm.showProgress = true;
      scope.$digest();
      expect(vm.showProgress).to.be.true;

      vm.cancelRetry();
      scope.$digest();
      expect(vm.showProgress).to.be.false;
    });
  });
});
