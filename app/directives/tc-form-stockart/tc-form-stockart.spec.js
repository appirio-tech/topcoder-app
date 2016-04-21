/*eslint no-undef:0*/
import angular from 'angular'

describe('Topcoder Form Stockart Directive', function() {
  var scope, element, isolateScope

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this, '$compile', '$rootScope')
    scope = $rootScope.$new()
    scope.stockarts = []

    var form = angular.element('<form><tc-form-stockart form-stockarts="stockarts" /></form>')
    element = form.find('tc-form-stockart')
    $compile(form)(scope)
    scope.$digest()

    isolateScope = element.isolateScope()
  })

  afterEach(function() {
    scope.$destroy()
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('is initialized with', function() {
    it('empty stockart data', function() {
      var initialStockart = isolateScope.formStockarts[0]

      expect(initialStockart.id).to.equal(0)
      expect(initialStockart.sourceUrl).to.equal('')
    })

    it('a regular expression', function() {
      expect(isolateScope.urlRegEx).to.be.an.instanceof(RegExp)
    })
  })

  describe('createAdditionalStockartFieldset', function() {
    it('creates a new fieldset', function() {
      expect(Object.keys(isolateScope.formStockarts).length).to.equal(1)

      isolateScope.createAdditionalStockartFieldset()
      scope.$digest()

      expect(Object.keys(isolateScope.formStockarts).length).to.equal(2)
    })

    it('adds an incremented id to the new fieldset', function() {
      var id = isolateScope.formStockarts[0].id

      isolateScope.createAdditionalStockartFieldset()
      scope.$digest()

      expect(isolateScope.formStockarts[1]).to.exist
      expect(isolateScope.formStockarts[1].id).to.equal(id + 1)
    })
  })

  describe('deleteStockartFieldset', function() {
    it('deletes the selected stockart fieldset', function() {
      isolateScope.createAdditionalStockartFieldset()
      scope.$digest()

      expect(Object.keys(isolateScope.formStockarts).length).to.equal(2)

      isolateScope.deleteStockartFieldset(1)
      scope.$digest()

      expect(Object.keys(isolateScope.formStockarts).length).to.equal(1)
    })

    it('resets the stockart fieldset when it\'s the only one', function() {
      var stockart = isolateScope.formStockarts[0]

      expect(stockart.sourceUrl).to.equal('')

      stockart.sourceUrl = 'www.myURL.com'
      scope.$digest()

      expect(stockart.sourceUrl).to.equal('www.myURL.com')

      isolateScope.deleteStockartFieldset(0)
      scope.$digest()

      expect(isolateScope.formStockarts[0].sourceUrl).to.equal('')
    })
  })

  describe.only('isButtonDisabled', function() {
    var button

    beforeEach(function() {
      button = $(element).find('.fieldset__button')[0]
    })

    afterEach(function() {
      button = undefined
    })

    it('disables the button when no fields are filled out', function() {
      expect(button.disabled).to.be.true
    })

    it('enables the button when the url field is filled out', function() {
      expect(button.disabled).to.be.true

      isolateScope.formStockarts[0].sourceUrl = 'url'
      scope.$digest()

      expect(button.disabled).to.be.false
    })

    it('disables the button when any url field in any fieldset is empty', function() {
      expect(button.disabled).to.be.true

      // Fill out first fieldset
      isolateScope.formStockarts[0].sourceUrl = 'url.com'
      scope.$digest()

      expect(button.disabled).to.be.false

      isolateScope.createAdditionalStockartFieldset()
      scope.$digest()

      expect(button.disabled).to.be.true

      // Fill out second fieldset
      isolateScope.formStockarts[1].sourceUrl = 'url2.com'
      scope.$digest()

      expect(button.disabled).to.be.false

      // Empty the field in the first fieldset
      isolateScope.formStockarts[0].sourceUrl = ''
      scope.$digest()

      expect(button.disabled).to.be.true
    })
  })
})
