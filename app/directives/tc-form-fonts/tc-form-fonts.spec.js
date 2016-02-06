/*eslint no-undef:0*/
import angular from 'angular'

describe('Topcoder Form Fonts Directive', function() {
  var scope, element, isolateScope

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this, '$compile', '$rootScope')
    scope = $rootScope.$new()
    scope.formFonts = []

    var form = angular.element('<form><tc-form-fonts form-fonts="formFonts" /></form>')
    element = form.find('tc-form-fonts')
    $compile(form)(scope)
    scope.$digest()

    isolateScope = element.isolateScope()
  })

  afterEach(function() {
    scope.$destroy()
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('is initialized with', function() {
    it('empty font data', function() {
      var defaultFormFont = isolateScope.formFonts[0]

      expect(defaultFormFont.id).to.equal(0)
      expect(defaultFormFont.source).to.equal('')
      expect(defaultFormFont.name).to.equal('')
      expect(defaultFormFont.sourceUrl).to.equal('')
      expect(defaultFormFont.isFontUrlRequired).to.be.false
      expect(defaultFormFont.isFontUrlDisabled).to.be.true
      expect(defaultFormFont.isFontNameRequired).to.be.false
      expect(defaultFormFont.isFontNameDisabled).to.be.true
      expect(defaultFormFont.isFontSourceRequired).to.be.false
    })

    it('a font list', function() {
      var fontList = isolateScope.fontList0

      expect(fontList).to.be.an.array
      expect(fontList).to.have.length.of.at.least(1)
    })

    it('a regular expression', function() {
      expect(isolateScope.urlRegEx).to.be.an.instanceof(RegExp)
    })
  })

  describe('selectFont', function() {
    var newFont, targetedFont

    beforeEach(function() {
      newFont = {
        id: 0,
        value: 'FONTS_DOT_COM'
      }

      targetedFont = isolateScope.formFonts[0]
    })

    afterEach(function() {
      newFont = undefined
      targetedFont = undefined
    })

    it('updates the targeted font source with the new value', function() {
      expect(targetedFont.source).to.equal('')

      isolateScope.selectFont(newFont)
      scope.$digest()

      expect(targetedFont.source).to.equal('FONTS_DOT_COM')
    })

    it('sets disabled properties to false', function() {
      expect(targetedFont.isFontNameDisabled).to.be.true
      expect(targetedFont.isFontUrlDisabled).to.be.true

      isolateScope.selectFont(newFont)
      scope.$digest()

      expect(targetedFont.isFontNameDisabled).to.be.false
      expect(targetedFont.isFontUrlDisabled).to.be.false
    })

    it('sets required properties to true', function() {
      expect(targetedFont.isFontNameRequired).to.be.false
      expect(targetedFont.isFontUrlRequired).to.be.false

      isolateScope.selectFont(newFont)
      scope.$digest()

      expect(targetedFont.isFontNameRequired).to.be.true
      expect(targetedFont.isFontUrlRequired).to.be.true
    })

    it('sets isFontNameRequired to true and isFontUrlRequired to false when STUDIO_STANDARD_FONTS_LIST is selected', function() {
      expect(targetedFont.isFontNameRequired).to.be.false
      expect(targetedFont.isFontUrlRequired).to.be.false

      isolateScope.selectFont({id: 0, value: 'STUDIO_STANDARD_FONTS_LIST'})
      scope.$digest()

      expect(targetedFont.isFontNameRequired).to.be.true
      expect(targetedFont.isFontUrlRequired).to.be.false
    })
  })

  describe('createAdditionalFontFieldset', function() {
    it('creates a new fieldset', function() {
      expect(Object.keys(isolateScope.formFonts).length).to.equal(1)

      isolateScope.createAdditionalFontFieldset()
      scope.$digest()

      expect(Object.keys(isolateScope.formFonts).length).to.equal(2)
    })

    it('adds an incremented id to the new fieldset', function() {
      var id = isolateScope.formFonts[0].id

      isolateScope.createAdditionalFontFieldset()
      scope.$digest()

      expect(isolateScope.formFonts[1]).to.exist
      expect(isolateScope.formFonts[1].id).to.equal(id + 1)
    })
  })

  describe('deleteFontFieldset', function() {
    it('deletes the selected font fieldset', function() {
      isolateScope.createAdditionalFontFieldset()
      scope.$digest()

      expect(Object.keys(isolateScope.formFonts).length).to.equal(2)

      isolateScope.deleteFontFieldset(1)
      scope.$digest()

      expect(Object.keys(isolateScope.formFonts).length).to.equal(1)
    })

    it('resets the font fieldset when it\'s the only one', function() {
      var font = isolateScope.formFonts[0]

      expect(font.source).to.equal('')

      font.source = 'dropdown selection'
      scope.$digest()

      expect(font.source).to.equal('dropdown selection')

      isolateScope.deleteFontFieldset(0)
      scope.$digest()

      expect(isolateScope.formFonts[0].source).to.equal('')
    })
  })

  describe('isButtonDisabled', function() {
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

    it('disables the button when 1 field is filled out', function() {
      isolateScope.formFonts[0].source = 'FONTS_DOT_COM'
      scope.$digest()

      expect(button.disabled).to.be.true
    })

    it('disables the button when 2 fields are filled out', function() {
      isolateScope.formFonts[0].source = 'FONTS_DOT_COM'
      isolateScope.formFonts[0].sourceUrl = 'url.com'
      scope.$digest()

      expect(button.disabled).to.be.true
    })

    it('enables the button when all fields are filled out', function() {
      isolateScope.formFonts[0].source = 'FONTS_DOT_COM'
      isolateScope.formFonts[0].name = 'name'
      isolateScope.formFonts[0].sourceUrl = 'url.com'
      scope.$digest()

      expect(button.disabled).to.be.false
    })

    it('disables the button when any field in any fieldset is empty', function() {
      expect(button.disabled).to.be.true

      // Fill out first fieldset
      isolateScope.formFonts[0].source = 'FONTS_DOT_COM'
      isolateScope.formFonts[0].name = 'name'
      isolateScope.formFonts[0].sourceUrl = 'url.com'
      scope.$digest()

      expect(button.disabled).to.be.false

      isolateScope.createAdditionalFontFieldset()
      scope.$digest()

      expect(button.disabled).to.be.true

      // Fill out second fieldset
      isolateScope.formFonts[1].source = 'FONTS_DOT_COM2'
      isolateScope.formFonts[1].name = 'name'
      isolateScope.formFonts[1].sourceUrl = 'url2.com'
      scope.$digest()

      expect(button.disabled).to.be.false

      // Empty a field in the first fieldset
      isolateScope.formFonts[0].name = ''
      scope.$digest()

      expect(button.disabled).to.be.true
    })
  })
})
