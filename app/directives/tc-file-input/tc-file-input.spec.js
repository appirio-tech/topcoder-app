/* jshint -W117, -W030 */
describe('Topcoder File Input Directive', function() {
  var scope, element, isolateScope, fileInput;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope');
    scope = $rootScope.$new();

    var html = '' +
      '<form>' +
        '<tc-file-input ' +
          'label-text="Preview Image"' +
          'field-id="DESIGN_COVER"' +
          'button-text="Add File"' +
          'file-type="jpg,jpeg,png"' +
          'placeholder="Image file as .jpg or .png"' +
          'mandatory="true"' +
          'set-file-reference="vm.setFileReference(file, fieldId)"' +
          'ng-model="vm.submissionForm.submissionZip"' +
        ' />' +
      '</form>';
    var form = angular.element(html);
    element = form.find('tc-file-input');
    var formElement = $compile(form)(scope);
    scope.$digest();

    isolateScope = element.isolateScope();
  });

  beforeEach(function() {
    fileInput = $(element).find('.none')[0];
  });

  afterEach(function() {
    scope.$destroy();
    fileInput = undefined;
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('selectFile', function() {
    it('triggers a click on the file input', function() {
      var mockClick = sinon.spy(fileInput, 'click');

      isolateScope.selectFile();
      scope.$digest();

      expect(mockClick).calledOnce;
    });
  });

  describe('a change event on the file input', function() {
    var fileNameInput, fileList, mockSetFileReference;

    beforeEach(function() {
      fileNameInput = $(element).find('input[type=text]')[0];
      fileList = {
        0: {
          name: 'test.png',
          size: 50,
          type: 'image/png'
        },
        length: 1,
        item: function (index) { return file; }
      };

      mockSetFileReference = sinon.spy(isolateScope, 'setFileReference');
    });

    afterEach(function() {
      fileNameInput = undefined;
      fileList = undefined;
      mockSetFileReference = undefined;
    });

    it('sets the value of the fileNameInput with the name of the file', function() {
      $(fileInput).triggerHandler({
        type: 'change',
        target: { files: fileList }
      });

      expect(fileNameInput.value).to.equal('test.png');
    });

    describe('with a valid file', function() {
      beforeEach(function() {
        $(fileInput).triggerHandler({
          type: 'change',
          target: { files: fileList }
        });
      });

      it('calls setFileReference', function() {
        expect(mockSetFileReference).calledOnce;
      });

      it('has ng-valid-filesize class', function() {
        expect($(fileInput).hasClass('ng-valid-filesize')).to.be.true;
      });

      it('has ng-valid-required class', function() {
        expect($(fileInput).hasClass('ng-valid-required')).to.be.true;
      });
    });

    describe('with a file that\'s greater than 500MB', function() {
      beforeEach(function() {
        fileList[0].size = 500000001;

        $(fileInput).triggerHandler({
          type: 'change',
          target: { files: fileList }
        });
      });

      it('does not call setFileReference', function() {
        expect(mockSetFileReference).not.calledOnce;
      });

      it('has ng-touched and ng-invalid-filesize classes', function() {
        expect($(fileInput).hasClass('ng-invalid-filesize')).to.be.true;
        expect($(fileInput).hasClass('ng-touched')).to.be.true;
      });
    });

    describe('with a file type that\'s not in the list of fileTypes given to the directive', function() {
      beforeEach(function() {
        fileList[0].type = 'application/zip';

        $(fileInput).triggerHandler({
          type: 'change',
          target: { files: fileList }
        });
      });

      it('does not call setFileReference', function() {
        expect(mockSetFileReference).not.calledOnce;
      });

      it('has ng-touched and ng-invalid-required classes', function() {
        expect($(fileInput).hasClass('ng-invalid-required')).to.be.true;
        expect($(fileInput).hasClass('ng-touched')).to.be.true;
      });
    });

  });
});
