import angular from 'angular'

describe('Topcoder Input Directive', function() {
  var scope, element

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this, '$compile', '$rootScope')
    scope = $rootScope.$new()

    element = $compile(angular.element('<tc-input />'))(scope)
    scope.$digest()
  })

  afterEach(function() {
    scope.$destroy()
  })

  bard.verifyNoOutstandingHttpRequests()

  it('should set inputType to text if no inputType given', function() {
    var input = element.find('input')[0]

    expect(input.type).to.equal('text')
  })

  it('should set inputType to specified inputType if given', function() {
    element = $compile(angular.element('<tc-input input-type="number"/>'))(scope)
    scope.$digest()

    var input = element.find('input')[0]

    expect(input.type).to.equal('number')
  })

  it ('should set the inputValue to the result of updateValueOnBlur when blur event is triggered', function() {
    scope.updateValueOnBlur = function(inputValue) {
      return 'new value and ' + inputValue
    }
    scope.inputValue = 'old value'

    element = $compile(angular.element('<tc-input input-value="inputValue" update-value-on-blur="updateValueOnBlur(inputValue)"/>'))(scope)
    scope.$digest()

    var input = element.find('input')[0]

    expect(scope.inputValue).to.equal('old value')

    $(input).trigger('blur')

    expect(scope.inputValue).to.equal('new value and old value')

  })

  it('should pass inputValue and inputName to onInputChange when inputValue changes', function() {
    scope.inputValue = 'test input value'
    scope.onInputChange = function(inputValue, inputName) {
      return
    }

    element = $compile(angular.element('<tc-input input-value="inputValue" input-name="\'test input name\'" on-input-change="onInputChange(inputValue, inputName)"/>'))(scope)
    scope.$digest()

    var mockOnInputChange = sinon.spy(scope, 'onInputChange')

    expect(mockOnInputChange).not.calledOnce

    scope.inputValue = 'new test input value'
    scope.$digest()

    expect(mockOnInputChange).calledOnce
  })
})
