/* jshint -W117, -W030 */
describe('Empty State Placeholder Directive', function() {
  var controller
  var scope
  var element
  var emptyStateService
  var stateToTest = null
  var stateToTestName = "dashboard-challenges"

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this, '$compile', '$rootScope', 'EmptyStateService')
    emptyStateService = EmptyStateService
    stateToTest = emptyStateService.getState(stateToTestName)
  })

  bard.verifyNoOutstandingHttpRequests()

  describe('Without transcluded content', function() {
    var emptyState

    beforeEach(function() {
      scope = $rootScope.$new()
      scope.show = true
      scope.theme = 'black'
      scope.stateName = stateToTestName
      element = angular.element('<empty-state-placeholder state-name="{{stateName}}" theme="{{theme}}" show="show"></empty-state-placeholder>)')
      emptyState = $compile(element)(scope)
      scope.$digest()
      controller = element.controller('emptyStatePlaceholder')
    })

    it('should have found a valid empty state', function() {
      expect(controller.title).to.exist.to.equal(stateToTest.title)
      expect(controller.description).to.exist.to.equal(stateToTest.description)
      expect(controller.helpLinks).to.exist
      expect(controller.helpLinks.length).to.equal(stateToTest.helpLinks.length)
    })

    it('should have valid visibilty state', function() {
      expect(controller.show).to.exist.to.equal(true)
      expect(controller.theme).to.exist.to.equal('black')
    })

    it('should have valid transcluded state', function() {
      expect(element.isolateScope().transcluded).to.exist.to.equal(false)
    })

    it('should watch changes in show param expression', function() {
      expect(controller.show).to.exist.to.equal(true)
      // update the show variable expression
      scope.show = false
      scope.$digest()
      // should update controller's state
      expect(controller.show).to.exist.to.equal(false)
    })
  })

  describe('With transcluded content', function() {
    var emptyState

    beforeEach(function() {
      scope = $rootScope.$new()
      scope.show = true
      scope.theme = 'black'
      scope.stateName = stateToTestName
      element = angular.element('<empty-state-placeholder state-name="{{stateName}}" theme="{{theme}}" show="show"><span>Test</span></empty-state-placeholder>)')
      emptyState = $compile(element)(scope)
      scope.$digest()
      controller = element.controller('emptyStatePlaceholder')
    })

    it('should have found a valid empty state', function() {
      expect(controller.title).to.exist.to.equal(stateToTest.title)
      expect(controller.description).to.exist.to.equal(stateToTest.description)
      expect(controller.helpLinks).to.exist
      expect(controller.helpLinks.length).to.equal(stateToTest.helpLinks.length)
    })

    it('should have valid visibilty state', function() {
      expect(controller.show).to.exist.to.equal(true)
      expect(controller.theme).to.exist.to.equal('black')
    })

    it('should have valid transcluded state', function() {
      expect(element.isolateScope().transcluded).to.exist.to.equal(true)
    })

    it('should watch changes in show param expression', function() {
      expect(controller.show).to.exist.to.equal(true)
      // update the show variable expression
      scope.show = false
      scope.$digest()
      // should update controller's state
      expect(controller.show).to.exist.to.equal(false)
    })
  })
})
