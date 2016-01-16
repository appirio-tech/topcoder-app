/* jshint -W117, -W030 */
describe.only('Topcoder File Input Directive', function() {
  var scope, element, isolateScope;

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

  bard.verifyNoOutstandingHttpRequests();

  describe('selectFile', function() {
    it('triggers a click on the file input', function() {
      var fileInput = $(element).find('.none')[0];
      var mockClick = sinon.spy(fileInput, 'click');

      isolateScope.selectFile();
      scope.$digest();

      expect(mockClick).calledOnce;
    });
  });

  describe('change events on the file input', function() {
    it('do things', function() {
      expect(false).to.be.true;
    });

    it('do other things', function() {
      expect(false).to.be.true;
    });

    it('yet some more things', function() {
      expect(false).to.be.true;
    });
  });
});
