/*eslint no-undef:0*/
import angular from 'angular'

describe('Topcoder File Input Directive', function() {
  var scope, element, isolateScope, fileInput

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this, '$compile', '$rootScope', '$timeout')
    scope = $rootScope.$new()

    var html = '' +
      '<form>' +
        '<tc-file-input ' +
          'label-text="Submission"' +
          'field-id="SUBMISSION_ZIP"' +
          'button-text="Add File"' +
          'file-type="zip"' +
          'placeholder="Attach all visible files as a single .zip file"' +
          'mandatory="true"' +
          'set-file-reference="vm.setFileReference(file, fieldId)"' +
          'ng-model="vm.submissionForm.submissionZip"' +
        ' />' +
      '</form>'
    var form = angular.element(html)
    element = form.find('tc-file-input')
    $compile(form)(scope)
    scope.$digest()

    isolateScope = element.isolateScope()
  })

  beforeEach(function() {
    fileInput = $(element).find('.none')[0]
  })

  afterEach(function() {
    scope.$destroy()
    fileInput = undefined
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('selectFile', function() {
    it('triggers a click on the file input', function() {
      var mockClick = sinon.spy(fileInput, 'click')

      isolateScope.selectFile()
      scope.$digest()

      expect(mockClick).calledOnce
    })
  })

  describe('a change event on the file input', function() {
    var fileNameInput, fileList, mockSetFileReference

    beforeEach(function() {
      fileNameInput = $(element).find('input[type=text]')[0]
      fileList = {
        0: {
          name: 'test.zip',
          size: 50,
          type: 'application/zip'
        },
        length: 1,
        item: function (index) { return index }
      }

      mockSetFileReference = sinon.spy(isolateScope, 'setFileReference')
    })

    afterEach(function() {
      fileNameInput = undefined
      fileList = undefined
      mockSetFileReference = undefined
    })

    it('sets the value of the fileNameInput with the name of the file', function() {
      $(fileInput).triggerHandler({
        type: 'change',
        target: { files: fileList }
      })

      $timeout.flush()

      expect(fileNameInput.value).to.equal('test.zip')
    })

    describe('with a valid file', function() {
      beforeEach(function() {
        $(fileInput).triggerHandler({
          type: 'change',
          target: { files: fileList }
        })
        $timeout.flush()
      })

      it('calls setFileReference', function() {
        expect(mockSetFileReference).calledOnce
      })

      it('has ng-valid-filesize class', function() {
        expect($(fileInput).hasClass('ng-valid-filesize')).to.be.true
      })

      it('has ng-valid-required class', function() {
        expect($(fileInput).hasClass('ng-valid-required')).to.be.true
      })

      it('works with Windows file type application/x-zip', function(){
        fileList[0].type = 'application/x-zip'

        $(fileInput).triggerHandler({
          type: 'change',
          target: { files: fileList }
        })

        $timeout.flush()

        expect(mockSetFileReference).called
        expect($(fileInput).hasClass('ng-valid-filesize')).to.be.true
        expect($(fileInput).hasClass('ng-valid-required')).to.be.true
      })

      it('works with Windows file type application/x-zip-compressed', function(){
        fileList[0].type = 'application/x-zip-compressed'

        $(fileInput).triggerHandler({
          type: 'change',
          target: { files: fileList }
        })

        $timeout.flush()

        expect(mockSetFileReference).called
        expect($(fileInput).hasClass('ng-valid-filesize')).to.be.true
        expect($(fileInput).hasClass('ng-valid-required')).to.be.true
      })
    })

    describe('with a file type that\'s not in the list of fileTypes given to the directive', function() {
      beforeEach(function() {
        fileList[0].type = 'image/png'

        $(fileInput).triggerHandler({
          type: 'change',
          target: { files: fileList }
        })

        $timeout.flush()
      })

      it('does not call setFileReference', function() {
        expect(mockSetFileReference).not.calledOnce
      })

      it('has ng-touched and ng-invalid-required classes', function() {
        expect($(fileInput).hasClass('ng-invalid-required')).to.be.true
        expect($(fileInput).hasClass('ng-touched')).to.be.true
      })
    })

    describe('with a file extension that is not in the list of fileTypes given to the directive', function() {
      beforeEach(function() {
        fileList[0].name = 'submission.zip.jpg'

        $(fileInput).triggerHandler({
          type: 'change',
          target: { files: fileList }
        })

        $timeout.flush()
      })

      it('does not call setFileReference', function() {
        expect(mockSetFileReference).not.calledOnce
      })

      it('has ng-touched and ng-invalid-required classes', function() {
        expect($(fileInput).hasClass('ng-invalid-required')).to.be.true
        expect($(fileInput).hasClass('ng-touched')).to.be.true
      })
    })

    describe('with a file that\'s greater than 500MB', function() {
      beforeEach(function() {
        fileList[0].size = 524288001

        $(fileInput).triggerHandler({
          type: 'change',
          target: { files: fileList }
        })

        $timeout.flush()
      })

      it('does not call setFileReference', function() {
        expect(mockSetFileReference).not.calledOnce
      })

      it('has ng-touched and ng-invalid-filesize classes', function() {
        expect($(fileInput).hasClass('ng-invalid-filesize')).to.be.true
        expect($(fileInput).hasClass('ng-touched')).to.be.true
      })
    })
  })
})
