/* jshint -W117, -W030 */
describe('Topcoder Form Stockart Directive', function() {
  var scope, element, isolateScope;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope');
    scope = $rootScope.$new();
    scope.stockarts = [];

    var form = angular.element('<form><tc-form-stockart form-stockarts="stockarts" /></form>');
    element = form.find('tc-form-stockart');
    var formElement = $compile(form)(scope);
    scope.$digest();

    isolateScope = element.isolateScope();
  });

  afterEach(function() {
    scope.$destroy();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('is initialized with', function() {
    it('empty stockart data', function() {
      var initialStockart = isolateScope.formStockarts[0];

      expect(initialStockart.id).to.equal(0);
      expect(initialStockart.description).to.equal('');
      expect(initialStockart.sourceUrl).to.equal('');
      expect(initialStockart.fileNumber).to.equal('');
      expect(initialStockart.isPhotoDescriptionRequired).to.equal(false);
      expect(initialStockart.isPhotoURLRequired).to.equal(false);
      expect(initialStockart.isFileNumberRequired).to.equal(false);
    });

    it('a regular expression', function() {
      expect(isolateScope.urlRegEx).to.be.an.instanceof(RegExp);
    });
  });

  describe('createAdditionalStockartFieldset', function() {
    it('creates a new fieldset', function() {
      expect(Object.keys(isolateScope.formStockarts).length).to.equal(1);

      isolateScope.createAdditionalStockartFieldset();
      scope.$digest();

      expect(Object.keys(isolateScope.formStockarts).length).to.equal(2);
    });

    it('adds an incremented id to the new fieldset', function() {
      var id = isolateScope.formStockarts[0].id;

      isolateScope.createAdditionalStockartFieldset();
      scope.$digest();

      expect(isolateScope.formStockarts[1]).to.exist;
      expect(isolateScope.formStockarts[1].id).to.equal(id + 1);
    });
  })

  describe('deleteStockartFieldset', function() {
    it('deletes the selected stockart fieldset', function() {
      isolateScope.createAdditionalStockartFieldset();
      scope.$digest();

      expect(Object.keys(isolateScope.formStockarts).length).to.equal(2);

      isolateScope.deleteStockartFieldset(1);
      scope.$digest();

      expect(Object.keys(isolateScope.formStockarts).length).to.equal(1);
    });

    it('resets the stockart fieldset when it\'s the only one', function() {
      var stockart = isolateScope.formStockarts[0];

      expect(stockart.description).to.equal('');

      stockart.description = 'a funny cat picture';
      scope.$digest();

      expect(stockart.description).to.equal('a funny cat picture');

      isolateScope.deleteStockartFieldset(0);
      scope.$digest();

      expect(isolateScope.formStockarts[0].description).to.equal('');
    });
  });

  describe('isButtonDisabled', function() {
    var button;

    beforeEach(function() {
      button = $(element).find('.fieldset__button')[0];
    });

    afterEach(function() {
      button = undefined;
    });

    it('disables the button when no fields are filled out', function() {
      expect(button.disabled).to.be.true;
    });

    it('disables the button when 1 field is filled out', function() {
      isolateScope.formStockarts[0].description = 'test description';
      scope.$digest();

      expect(button.disabled).to.be.true;
    });

    it('disables the button when 2 fields are filled out', function() {
      isolateScope.formStockarts[0].description = 'test description';
      isolateScope.formStockarts[0].sourceUrl = 'url';
      scope.$digest();

      expect(button.disabled).to.be.true;
    });

    it('enables the button when all fields are filled out', function() {
      isolateScope.formStockarts[0].description = 'test description';
      isolateScope.formStockarts[0].sourceUrl = 'url';
      isolateScope.formStockarts[0].fileNumber = '123';
      scope.$digest();

      expect(button.disabled).to.be.false;
    });

    it('disables the button when any field in any fieldset is empty', function() {
      expect(button.disabled).to.be.true;

      // Fill out first fieldset
      isolateScope.formStockarts[0].description = 'test description';
      isolateScope.formStockarts[0].sourceUrl = 'url.com';
      isolateScope.formStockarts[0].fileNumber = '123';
      scope.$digest();

      expect(button.disabled).to.be.false;

      isolateScope.createAdditionalStockartFieldset();
      scope.$digest();

      expect(button.disabled).to.be.true;

      // Fill out second fieldset
      isolateScope.formStockarts[1].description = 'test description2';
      isolateScope.formStockarts[1].sourceUrl = 'url2.com';
      isolateScope.formStockarts[1].fileNumber = '1232';
      scope.$digest();

      expect(button.disabled).to.be.false;

      // Empty a field in the first fieldset
      isolateScope.formStockarts[0].fileNumber = '';
      scope.$digest();

      expect(button.disabled).to.be.true;
    });
  });

  describe('showMandatoryMessage', function() {
    describe('sets the stockart required properties to false when all fields are', function() {
      var stockart;

      beforeEach(function() {
        stockart = isolateScope.formStockarts[0];
        stockart.description = 'test description';
        stockart.sourceUrl = 'url.com';
        stockart.fileNumber = '123';
        scope.$digest();
      });

      afterEach(function() {
        stockart = undefined;
      });

      it('filled out', function() {
        expect(stockart.isPhotoDescriptionRequired).to.be.false;
        expect(stockart.isPhotoURLRequired).to.be.false;
        expect(stockart.isFileNumberRequired).to.be.false;
      });

      it('empty', function() {
        // Reset stockart fields
        stockart.description = '';
        stockart.sourceUrl = '';
        stockart.fileNumber = '';
        scope.$digest();

        expect(stockart.isPhotoDescriptionRequired).to.be.false;
        expect(stockart.isPhotoURLRequired).to.be.false;
        expect(stockart.isFileNumberRequired).to.be.false;
      });
    });


    describe('sets the stockart required properties to false when all fields are', function() {
      var stockart;

      beforeEach(function() {
        stockart = isolateScope.formStockarts[0];
        stockart.description = 'test description';
        stockart.sourceUrl = 'url.com';
        stockart.fileNumber = '123';
        scope.$digest();
      });

      afterEach(function() {
        stockart = undefined;
      });

      it('sets the stockart required properties to true if any field is blank', function() {
        // Reset stockart fields
        stockart.description = '';
        scope.$digest();

        expect(stockart.isPhotoDescriptionRequired).to.be.true;
        expect(stockart.isPhotoURLRequired).to.be.true;
        expect(stockart.isFileNumberRequired).to.be.true;
      });
    });
  });
});
