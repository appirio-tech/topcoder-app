var path = require('path');
var loginPage = require('../login/login.object');

var AccountPage = function() {
 
  this.get = function(baseUrl) {
	browser.ignoreSynchronization = true;
    browser.get(baseUrl);
  };
 
  this.selectWindow = function(index) {
	  // wait for handles[index] to exist
	  browser.wait(function() {
	    return browser.getAllWindowHandles().then(function(handles) {
	      /**
	       * Assume that handles.length >= 1 and index >=0.
	       * So when calling selectWindow(index) return
	       * true if handles contains that window.
	       */
	      if (handles.length > index) {
	        return true;
	      }
	    });
	  }, 30000);
	  // here i know that the requested window exists

	  // switch to the window
	  return browser.getAllWindowHandles().then(function(handles) {
	    return browser.switchTo().window(handles[index]);
	  });
  };
  
  
  
  
  this.goToInvalidLengthChangePassword = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
		
//	  var toolTip = element(by.css('.introjs-tooltip'));
//	  var isClickable = EC.elementToBeClickable(toolTip);
//	  browser.wait(isClickable, 30000);
//	  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
//	  isClickable = EC.elementToBeClickable(skipBtn);
//	  browser.wait(isClickable, 30000);
//	  skipBtn.click().then(function() {
	  
	  var checkField= element(by.css('.menu-item-header'));
	  var isClickable1 = EC.elementToBeClickable(checkField);
	  browser.wait(isClickable1, 30000);
	  
	  var nameHeader = element.all(by.css('.main-menu li')).get(1);
//	  var isClickable = EC.elementToBeClickable(nameHeader);
//	  browser.wait(isClickable, 30000);
	  
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	  profileLink.click().then(function() {
//		  toolTip = element(by.css('.introjs-tooltip'));
//		  isClickable = EC.elementToBeClickable(toolTip);
//		  browser.wait(isClickable, 30000);
//		  skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
//		  isClickable = EC.elementToBeClickable(skipBtn);
//		  browser.wait(isClickable, 30000);
//		  skipBtn.click().then(function() {
		  
		  
		  
		  
		  
		  
		  
		  
//		  var username = element(by.css('.info .handle'));
//		  var isClickable = EC.elementToBeClickable(username);
//		  browser.wait(isClickable, 30000);
//		  expect(username.getInnerHtml()).toEqual(loginUserCred.username);
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 80000);
		  editProfile.click().then(function() {
			  var imageUpload = element(by.css('.file-upload'));
			  isClickable = EC.elementToBeClickable(imageUpload);
			  browser.wait(isClickable, 30000);
			  
			  
			  var accountTab = element(by.partialLinkText('ACCOUNT'));
			  accountTab.click().then(function(){
			  
			  var currentPassword = element(by.id('current-password-input'));
			  isClickable = EC.elementToBeClickable(currentPassword);
			  browser.wait(isClickable, 30000);
			  currentPassword.click();
			  currentPassword.sendKeys(loginUserCred.password);
			  
			  var newPassword = element(by.id('password-input'));
			  isClickable = EC.elementToBeClickable(newPassword);
			  browser.wait(isClickable, 30000);
			  newPassword.click();
			  newPassword.clear();
			  newPassword.sendKeys(loginUserCred.newPassword);
			  newPassword.clear();
			  newPassword.sendKeys(loginUserCred.newPassword);

			  var changePasswordBtn = element(by.partialButtonText('Change Password'));
//			  isClickable = EC.elementToBeClickable(changePasswordBtn);
//			  browser.wait(isClickable, 30000);
			  browser.actions().mouseMove(changePasswordBtn).perform();
//			  
			  expect(changePasswordBtn.isEnabled()).toEqual(false);
			  
		  });
		  });
//	  });
//	  });
  });
  };
  
  
  
  
  this.goToInvalidNameCountry = function(dashBoardUrl,loginUserCred, requiredFieldMsg, emptyCountryMsg) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
		
	  this.get(dashBoardUrl);
	  var EC = protractor.ExpectedConditions;
	  var checkField= element(by.css('.menu-item-header'));
	  var isClickable1 = EC.elementToBeClickable(checkField);
	  browser.wait(isClickable1, 30000);
	  
	  var nameHeader = element.all(by.css('.main-menu li')).get(1);
//	  var isClickable = EC.elementToBeClickable(nameHeader);
//	  browser.wait(isClickable, 30000);
	  
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	  profileLink.click().then(function() {
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 80000);
		  editProfile.click().then(function() {
			  var imageUpload = element(by.css('.file-upload'));
			  isClickable = EC.elementToBeClickable(imageUpload);
			  browser.wait(isClickable, 30000);
			  
			  var accountTab = element(by.partialLinkText('ACCOUNT'));
			  accountTab.click().then(function(){
			  
			  var firstName = element(by.model('vm.userData.firstName'));
			  isClickable = EC.elementToBeClickable(firstName);
			  browser.wait(isClickable, 30000);
			  firstName.click();
			  firstName.clear();
			  firstName.sendKeys(loginUserCred.firstName);
			  
			  if(loginUserCred.firstName == ''){
				  var formInputError = element.all(by.css('.form-input-error')).get(1);
				  var pInputError = formInputError.all(by.css('p')).get(0);
				  expect(pInputError.getInnerHtml()).toEqual('This is a required field.');
			  }
			  
			  var lastName = element(by.model('vm.userData.lastName'));
			  isClickable = EC.elementToBeClickable(lastName);
			  browser.wait(isClickable, 30000);
			  lastName.click();
			  lastName.clear();
			  lastName.sendKeys(loginUserCred.lastName);
			  
			  if(loginUserCred.lastName == ''){
				  var formInputError = element.all(by.css('.form-input-error')).get(2);
				  var pInputError = formInputError.all(by.css('p')).get(0);
				  expect(pInputError.getInnerHtml()).toEqual(requiredFieldMsg);
			  }
			  
			  var country = element(by.model('searchStr'));
			  isClickable = EC.elementToBeClickable(country);
			  browser.wait(isClickable, 30000);
			  country.clear();
			  
			  
			  
			  if(loginUserCred.country == ''){
				  country.sendKeys('India');
				  country.clear();
				  var accountInfoErr = element.all(by.css('.account-info-error'));
				  var countryErr = accountInfoErr.get(0);
				  var countryErrMsg = countryErr.all(by.css('p')).get(0);
				  expect(countryErrMsg.getInnerHtml()).toEqual(emptyCountryMsg);
			  } else {
				  country.sendKeys(loginUserCred.country);
				  var countryIdDropDown = element(by.id('_dropdown'));
				  isClickable = EC.elementToBeClickable(countryIdDropDown);
				  browser.wait(isClickable, 30000);
				  countryIdDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
					  return elem.getInnerHtml().then(function(text){
						  return text.indexOf(loginUserCred.country) != -1 ;
					  })
				  }).then(function(filteredElements){
					  filteredElements[0].click();
				  });
			  }
			  

			  var submitBtn = element(by.css('.save-section .save'));
			  
			  expect(submitBtn.isEnabled()).toEqual(false);
			  
		  });
		  });
//	  });
  });
  };
  
  
  
  
  
  
  
  this.goToChangePassword = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
		
	  var EC = protractor.ExpectedConditions;
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
//		  var toolTip = element(by.css('.introjs-tooltip'));
//		  var isClickable = EC.elementToBeClickable(toolTip);
//		  browser.wait(isClickable, 30000);
//		  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
//		  isClickable = EC.elementToBeClickable(skipBtn);
//		  browser.wait(isClickable, 30000);
//		  skipBtn.click().then(function() {
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 80000);
		  editProfile.click().then(function() {
			  var imageUpload = element(by.css('.file-upload'));
			  isClickable = EC.elementToBeClickable(imageUpload);
			  browser.wait(isClickable, 30000);
			  
			  var accountTab = element(by.partialLinkText('ACCOUNT'));
			  accountTab.click().then(function(){
			  
			  var currentPassword = element(by.id('current-password-input'));
			  isClickable = EC.elementToBeClickable(currentPassword);
			  browser.wait(isClickable, 30000);
			  currentPassword.click();
			  
			  currentPassword.sendKeys(loginUserCred.password);
			  
			  var newPassword = element(by.id('password-input'));
			  isClickable = EC.elementToBeClickable(newPassword);
			  browser.wait(isClickable, 30000);
			  newPassword.click();
			  newPassword.sendKeys(loginUserCred.newPassword);
			  
			  var passwordCheckbox = element(by.id('passwordCheckbox'));
			  isClickable = EC.elementToBeClickable(passwordCheckbox);
			  browser.wait(isClickable, 30000);
			  passwordCheckbox.click();
			  
			  var currentPasswordCheckbox = element(by.id('currentPasswordCheckbox'));
			  isClickable = EC.elementToBeClickable(currentPasswordCheckbox);
			  browser.wait(isClickable, 30000);
			  currentPasswordCheckbox.click();
			  
			  
			  console.log('password'+loginUserCred.password);
			  console.log('newpassword'+loginUserCred.newPassword);
			  
//			  browser.pause();

			  var changePasswordBtn = element(by.partialButtonText('Change Password'));
			  isClickable = EC.elementToBeClickable(changePasswordBtn);
			  browser.wait(isClickable, 30000);
//			  browser.pause();
			  browser.actions().mouseMove(changePasswordBtn).perform();
			  
			  changePasswordBtn.click().then(function(){
//				  browser.pause();
				  browser.sleep(6000);
				  loginPage.get(dashBoardUrl);
				  
				  var metrics = element(by.id('metrics'));
				  isClickable = EC.elementToBeClickable(metrics);
				  browser.wait(isClickable, 30000);
				  
//				  changePasswordBtn = element(by.partialButtonText('Change Password'));
//				  isClickable = EC.elementToBeClickable(changePasswordBtn);
//				  browser.wait(isClickable, 60000);
				  
			  });
			  });
		  });
//		  });
	  });
  };
  
  
  
this.goToAccountPage = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
		
//	  this.get(dashBoardUrl);
//	  var nameHeader = element(by.css('.main-menu')).all(by.css('li')).get(0);
//	  var nameHeader = itemHeader.get(6);
	  
	  var toolTip = element(by.css('.introjs-tooltip'));
	  var isClickable = EC.elementToBeClickable(toolTip);
	  browser.wait(isClickable, 30000);
	  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
	  isClickable = EC.elementToBeClickable(skipBtn);
	  browser.wait(isClickable, 30000);
	  skipBtn.click().then(function() {
	  
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
		  var toolTip = element(by.css('.introjs-tooltip'));
		  var isClickable = EC.elementToBeClickable(toolTip);
		  browser.wait(isClickable, 30000);
		  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
		  isClickable = EC.elementToBeClickable(skipBtn);
		  browser.wait(isClickable, 30000);
		  skipBtn.click().then(function() {
		  
		  var username = element(by.css('.info .handle'));
		  var isClickable = EC.elementToBeClickable(username);
		  browser.wait(isClickable, 30000);
		  expect(username.getInnerHtml()).toEqual(loginUserCred.username);
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 80000);
		  editProfile.click().then(function() {
			  var imageUpload = element(by.css('.file-upload'));
			  isClickable = EC.elementToBeClickable(imageUpload);
			  browser.wait(isClickable, 30000);
			  
			  var accountTab = element(by.partialLinkText('ACCOUNT'));
			  accountTab.click().then(function(){
			  
				  var firstName = element(by.model('vm.userData.firstName'));
				  isClickable = EC.elementToBeClickable(firstName);
				  browser.wait(isClickable, 30000);
				  firstName.clear();
				  firstName.sendKeys(loginUserCred.firstName);
				  
				  var lastName = element(by.model('vm.userData.lastName'));
				  isClickable = EC.elementToBeClickable(lastName);
				  browser.wait(isClickable, 30000);
				  lastName.clear();
				  lastName.sendKeys(loginUserCred.lastName);
				  
				  var address1 = element(by.model('vm.homeAddress.streetAddr1'));
				  isClickable = EC.elementToBeClickable(address1);
				  browser.wait(isClickable, 30000);
				  address1.clear();
				  address1.sendKeys(loginUserCred.address1);
				  
				  var address2 = element(by.model('vm.homeAddress.streetAddr2'));
				  isClickable = EC.elementToBeClickable(address2);
				  browser.wait(isClickable, 30000);
				  address2.clear();
				  address2.sendKeys(loginUserCred.address2);	
				  
				  var city = element(by.model('vm.homeAddress.city'));
				  isClickable = EC.elementToBeClickable(city);
				  browser.wait(isClickable, 30000);
				  city.clear();
				  city.sendKeys(loginUserCred.city);
				  
				  var state = element(by.model('vm.homeAddress.stateCode'));
				  isClickable = EC.elementToBeClickable(state);
				  browser.wait(isClickable, 30000);
				  state.clear();
				  state.sendKeys(loginUserCred.state);
				  
				  var zipCode = element(by.model('vm.homeAddress.zip'));
				  isClickable = EC.elementToBeClickable(zipCode);
				  browser.wait(isClickable, 30000);
				  zipCode.clear();
				  zipCode.sendKeys(loginUserCred.zipCode);
				  
				  var country = element(by.model('searchStr'));
				  isClickable = EC.elementToBeClickable(country);
				  browser.wait(isClickable, 30000);
				  country.clear();
				  country.sendKeys(loginUserCred.country);
				  
				  var countryIdDropDown = element(by.id('_dropdown'));
				  isClickable = EC.elementToBeClickable(countryIdDropDown);
				  browser.wait(isClickable, 30000);
				  countryIdDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
					  return elem.getInnerHtml().then(function(text){
						  return text.indexOf(loginUserCred.country) != -1 ;
					  })
				  }).then(function(filteredElements){
					  filteredElements[0].click();
				  });
				  
				  var submitBtn = element(by.css('.save-section .save'));
				  isClickable = EC.elementToBeClickable(submitBtn);
				  browser.wait(isClickable, 30000);
				  browser.actions().mouseMove(submitBtn).perform();
				  submitBtn.click().then(function(){
					  browser.sleep(6000);
					  
					  loginPage.get(dashBoardUrl);
					  
					  var metrics = element(by.id('metrics'));
					  isClickable = EC.elementToBeClickable(metrics);
					  browser.wait(isClickable, 30000);
					  
				  });
			  });
		  });
		  });
	  });
	  });
  };
  
  this.verifyAccountChanges = function (dashBoardUrl, loginUserCred) {
	  var EC = protractor.ExpectedConditions;

	  
	  console.log('in verifyAccountChanges ');
	  browser.driver.ignoreSynchronization = true;
	  this.get(dashBoardUrl);
	  
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	  
	  profileLink.click().then(function() {
		  var username = element(by.css('.info .handle'));
		  isClickable = EC.elementToBeClickable(username);
		  browser.wait(isClickable, 30000);
		  expect(username.getInnerHtml()).toEqual(loginUserCred.username);
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 80000);
		  
		  editProfile.click().then(function() { 
			  var accountTab = element(by.partialLinkText('ACCOUNT'));
			  accountTab.click().then(function(){
				  var firstName = element(by.model('vm.userData.firstName'));
				  isClickable = EC.elementToBeClickable(firstName);
				  browser.wait(isClickable, 30000);
				  
				  expect(firstName.getText()).toEqual(loginUserCred.firstName);
				  
				  
				  var lastName = element(by.model('vm.userData.lastName'));
				  isClickable = EC.elementToBeClickable(lastName);
				  browser.wait(isClickable, 30000);
				  expect(lastName.getText()).toEqual(loginUserCred.lastName);
				  
				  var address1 = element(by.model('vm.homeAddress.streetAddr1'));
				  isClickable = EC.elementToBeClickable(address1);
				  browser.wait(isClickable, 30000);
				  expect(address1.getText()).toEqual(loginUserCred.address1);
				  
				  var address2 = element(by.model('vm.homeAddress.streetAddr2'));
				  isClickable = EC.elementToBeClickable(address2);
				  browser.wait(isClickable, 30000);
				  expect(address2.getText()).toEqual(loginUserCred.address2);
				  
				  var city = element(by.model('vm.homeAddress.city'));
				  isClickable = EC.elementToBeClickable(city);
				  browser.wait(isClickable, 30000);
				  expect(city.getText()).toEqual(loginUserCred.city);
				  
				  var state = element(by.model('vm.homeAddress.stateCode'));
				  isClickable = EC.elementToBeClickable(state);
				  browser.wait(isClickable, 30000);
				  expect(state.getText()).toEqual(loginUserCred.state);
				  
				  var zipCode = element(by.model('vm.homeAddress.zip'));
				  isClickable = EC.elementToBeClickable(zipCode);
				  browser.wait(isClickable, 30000);
				  expect(zipCode.getText()).toEqual(loginUserCred.zipCode);
				  
				  var country = element(by.model('searchStr'));
				  isClickable = EC.elementToBeClickable(country);
				  browser.wait(isClickable, 30000);
//				  expect(country.getText()).toEqual(loginUserCred.country);
				  
			  });
		  });
	  });
	  
  
	  
  };
   
  
};
module.exports = new AccountPage();