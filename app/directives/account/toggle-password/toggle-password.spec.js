/* jshint -W117, -W030 */
describe('Toggle Password Directive', function() {
  var scope;
  var element;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope');
    scope = $rootScope.$new();
    scope.vm = {};
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Toggle Password Directive', function() {
    var togglePassword, controller, formController, passwordFormFieldSpy;

    beforeEach(function() {
      var form = angular.element('<form><toggle-password /></form>)');
      element = form.find('toggle-password');
      var formElement = $compile(form)(scope);
      scope.$digest();

      // controller = element.controller('togglePassword');
      formController = form.controller('form');
      passwordFormFieldSpy = sinon.spy(formController.currentPassword, '$setPristine');
    });

    afterEach(function() {
      // do nohting
    });

    it('should have password default placeholder', function() {
      expect(scope.currentPasswordDefaultPlaceholder).to.exist.to.equal('Password');
      expect(scope.currentPasswordPlaceholder).to.exist.to.equal('Password');
    });

    it('should not have focus class', function() {
      expect(element.hasClass('focus')).to.be.false;
    });

    it('should trigger click handler ', function() {
      var mockFocus = sinon.spy(element.find('input')[0], 'focus');
      element.trigger('click');
      expect(mockFocus).to.be.calledOnce;
    });

    it('should trigger focus handler ', function() {
      var pwsIntputElement = angular.element(element.find('input')[0]);
      pwsIntputElement.triggerHandler('focus');
      expect(element.hasClass('focus')).to.be.true;
    });

    it('should trigger blur handler with form field pristine ', function() {
      var pwsIntputElement = angular.element(element.find('input')[0]);
      // focus it first
      pwsIntputElement.triggerHandler('focus');
      // verifies if focus class is added
      expect(element.hasClass('focus')).to.be.true;
      // now blurs from it
      pwsIntputElement.triggerHandler('blur');
      // focus class should not be there
      expect(element.hasClass('focus')).to.be.false;
      // password field's setPristine method should be called once because currentPassword is empty
      expect(passwordFormFieldSpy).to.be.calledOnce;
    });

    it('should trigger blur handler without form field pristine ', function() {
      scope.vm.currentPassword = 'some-password';
      scope.$digest();
      var pwsIntputElement = angular.element(element.find('input')[0]);
      // focus it first
      pwsIntputElement.triggerHandler('focus');
      // verifies if focus class is added
      expect(element.hasClass('focus')).to.be.true;
      // now blurs from it
      pwsIntputElement.triggerHandler('blur');
      // focus class should not be there
      expect(element.hasClass('focus')).to.be.false;
      // password field's setPristine method should not be called because currentPassword is non-empty
      expect(passwordFormFieldSpy).not.to.be.called;
    });

    it('should keep focus on password field on blurring to checkbox ', function() {

      var pwsIntputElement = angular.element(element.find('input')[0]);
      // focus it first
      pwsIntputElement.triggerHandler('focus');
      // verifies if focus class is added
      expect(element.hasClass('focus')).to.be.true;
      // now blurs from it

      var e = jQuery.Event("blur");
      e.relatedTarget = {
        getAttribute: function(name) {
          if (name === 'type') return 'checkbox';
          if (name === 'id') return 'currentPasswordCheckbox';
        }
      };
      //mock focus event
      var mockFocus = sinon.spy(element.find('input')[0], 'focus');
      // trigger event
      pwsIntputElement.trigger(e);

      // focus should be called once
      expect(mockFocus).to.be.calledOnce;
      // password field placeholde should be empty
      expect(scope.currentPasswordPlaceholder).to.exist.to.equal('');
    });

    it('should change type of input field to be text ', function() {
      var pwsIntputElement = angular.element(element.find('input')[0]);
      var checkbox = angular.element(element.find('input')[1]);
      // before clicking on checkbox, it should have password type
      expect(pwsIntputElement.attr('type')).to.equal('password');
      checkbox.trigger('click');
      // after clicking on checkbox, it should have text type
      expect(pwsIntputElement.attr('type')).to.equal('text');
    });

    it('should change type of input field to be password ', function() {
      var pwsIntputElement = angular.element(element.find('input')[0]);
      var checkbox = angular.element(element.find('input')[1]);
      // before clicking on checkbox, it should have password type
      expect(pwsIntputElement.attr('type')).to.equal('password');
      checkbox.trigger('click');
      // after clicking on checkbox, it should have text type
      expect(pwsIntputElement.attr('type')).to.equal('text');
      // click again to uncheck the checkbox
      checkbox.trigger('click');
      // after unchecking the checkbox, it should have password type
      expect(pwsIntputElement.attr('type')).to.equal('password');
    });

    it('should trigger keyup handler with enter/return key ', function() {
      var mockBlur = sinon.spy(element.find('input')[0], 'blur');
      var e = jQuery.Event("keyup");
      e.keyCode = 13;
      element.trigger(e);
      expect(mockBlur).to.be.calledOnce;
    });

    it('should NOT trigger keyup handler with non enter/return key ', function() {
      var mockBlur = sinon.spy(element.find('input')[0], 'blur');
      var e = jQuery.Event("keyup");
      e.keyCode = 14;
      element.trigger(e);
      expect(mockBlur).not.to.be.called;
    });
  });
});
