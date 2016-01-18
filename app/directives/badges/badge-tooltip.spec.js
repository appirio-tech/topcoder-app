/* jshint -W117, -W030 */
describe('Badge Tooltip Directive', function() {
  var scope;
  var element;
  var badge = mockData.getMockBadge();
  var spotlightChallenge = mockData.getMockSpotlightChallenges()[0];

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope');
    scope = $rootScope.$new();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Badge Tooltip', function() {
    var tooltip;

    beforeEach(function() {
      scope.badge = badge;
      element = angular.element('<span badge-tooltip badge="badge"></span>)');
      tooltip = $compile(element)(scope);
      scope.$digest();
    });

    it('should have badge related html', function() {
      var header = tooltip.find('header');
      expect(header).not.to.null;
      expect(header.html()).to.include(badge.name);
      var earnedOn = tooltip.find('.earnedOn');
      expect(earnedOn).not.to.null;
      expect(earnedOn.length).to.equal(2);
      expect(angular.element(earnedOn[0]).html()).to.include(badge.date);
      expect(angular.element(earnedOn[0]).hasClass('ng-hide')).to.equal(false);
      expect(angular.element(earnedOn[1]).hasClass('ng-hide')).to.equal(true);
      var currentlyEarned = tooltip.find('.currentlyEarned');
      expect(currentlyEarned).not.to.null;
      expect(currentlyEarned.html()).to.include(badge.currentlyEarned);
    });

    it('without badge.date field .earnedOn should have message', function() {
      delete scope.badge.date;
      scope.$apply();
      var earnedOn = tooltip.find('.earnedOn');
      expect(earnedOn).not.to.null;
      expect(earnedOn.length).to.equal(2);
      expect(angular.element(earnedOn[0]).hasClass('ng-hide')).to.equal(true);
      expect(angular.element(earnedOn[1]).hasClass('ng-hide')).to.equal(false);
      expect(angular.element(earnedOn[1]).html()).to.include('Not Earned Yet');
    });

    it('with null badge.date field .earnedOn should have message', function() {
      scope.badge.date = null;
      scope.$apply();
      var earnedOn = tooltip.find('.earnedOn');
      expect(earnedOn).not.to.null;
      expect(earnedOn.length).to.equal(2);
      expect(angular.element(earnedOn[0]).hasClass('ng-hide')).to.equal(true);
      expect(angular.element(earnedOn[1]).hasClass('ng-hide')).to.equal(false);
      expect(angular.element(earnedOn[1]).html()).to.include('Not Earned Yet');
    });

    it('without badge.currentlyEarned field should be hidden', function() {
      delete scope.badge.currentlyEarned;
      scope.$apply();
      var currentlyEarned = tooltip.find('.currentlyEarned');
      expect(currentlyEarned).not.to.null;
      var dataDiv = currentlyEarned.parent();
      expect(dataDiv).not.to.null;
      expect(dataDiv.hasClass('ng-hide')).to.equal(true);
    });

    it('with null badge.currentlyEarned field should be hidden', function() {
      scope.badge.currentlyEarned = null;
      scope.$apply();
      var currentlyEarned = tooltip.find('.currentlyEarned');
      expect(currentlyEarned).not.to.null;
      var dataDiv = currentlyEarned.parent();
      expect(dataDiv).not.to.null;
      expect(dataDiv.hasClass('ng-hide')).to.equal(true);
    });

    it('with negative badge.currentlyEarned field should be hidden', function() {
      scope.badge.currentlyEarned = -1;
      scope.$apply();
      var currentlyEarned = tooltip.find('.currentlyEarned');
      expect(currentlyEarned).not.to.null;
      var dataDiv = currentlyEarned.parent();
      expect(dataDiv).not.to.null;
      expect(dataDiv.hasClass('ng-hide')).to.equal(true);
    });

    it('should trigger mouseenter handler ', function() {
      tooltip.trigger('mouseenter');
      var tooltipElement = tooltip.children(0);
      expect(tooltipElement.css('z-index')).to.equal('2000');
      expect(tooltip.isolateScope().hide).to.equal(false);
    });

    it('should trigger mouseleave handler ', function() {
      tooltip.trigger('mouseleave');
      tooltipElement = tooltip.children(0);
      expect(tooltip.isolateScope().hide).to.equal(true);
    });
  });
});
