var path = require('path');
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
  
  
  
  this.goToAccountPage = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
		
	  this.get(dashBoardUrl);
	  var EC = protractor.ExpectedConditions;
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
		  console.log('hiii44');
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 80000);
		  editProfile.click().then(function() {
			  console.log('hiii4');
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

			  var changePasswordBtn = element(by.partialButtonText('Change Password'));
			  isClickable = EC.elementToBeClickable(changePasswordBtn);
			  browser.wait(isClickable, 30000);
			  browser.actions().mouseMove(changePasswordBtn).perform();
			  
			  changePasswordBtn.click().then(function(){
//				  browser.driver.sleep(1);
				  
				  changePasswordBtn = element(by.partialButtonText('Change Password'));
				  isClickable = EC.elementToBeClickable(changePasswordBtn);
				  browser.wait(isClickable, 60000);
				  
//				  var firstName = element(by.model('vm.userData.firstName'));
//				  isClickable = EC.elementToBeClickable(firstName);
//				  browser.wait(isClickable, 30000);
//				  firstName.clear();
//				  firstName.sendKeys(loginUserCred.firstName);
//				  
//				  var lastName = element(by.model('vm.userData.lastName'));
//				  isClickable = EC.elementToBeClickable(lastName);
//				  browser.wait(isClickable, 30000);
//				  lastName.clear();
//				  lastName.sendKeys(loginUserCred.lastName);
//				  
//				  var address1 = element(by.model('vm.homeAddress.streetAddr1'));
//				  isClickable = EC.elementToBeClickable(address1);
//				  browser.wait(isClickable, 30000);
//				  address1.clear();
//				  address1.sendKeys(loginUserCred.address1);
//				  
//				  var address2 = element(by.model('vm.homeAddress.streetAddr2'));
//				  isClickable = EC.elementToBeClickable(address2);
//				  browser.wait(isClickable, 30000);
//				  address2.clear();
//				  address2.sendKeys(loginUserCred.address2);	
//				  
//				  var city = element(by.model('vm.homeAddress.city'));
//				  isClickable = EC.elementToBeClickable(city);
//				  browser.wait(isClickable, 30000);
//				  city.clear();
//				  city.sendKeys(loginUserCred.city);
//				  
//				  var state = element(by.model('vm.homeAddress.stateCode'));
//				  isClickable = EC.elementToBeClickable(state);
//				  browser.wait(isClickable, 30000);
//				  state.clear();
//				  state.sendKeys(loginUserCred.state);
//				  
//				  var zipCode = element(by.model('vm.homeAddress.zip'));
//				  isClickable = EC.elementToBeClickable(zipCode);
//				  browser.wait(isClickable, 30000);
//				  zipCode.clear();
//				  zipCode.sendKeys(loginUserCred.zipCode);
//				  
//				  var country = element(by.model('searchStr'));
//				  isClickable = EC.elementToBeClickable(country);
//				  browser.wait(isClickable, 30000);
//				  country.clear();
//				  country.sendKeys(loginUserCred.country);
//				  
//				  var countryIdDropDown = element(by.id('_dropdown'));
//				  isClickable = EC.elementToBeClickable(countryIdDropDown);
//				  browser.wait(isClickable, 30000);
//				  countryIdDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
//					  return elem.getInnerHtml().then(function(text){
//						  return text.indexOf(loginUserCred.country) != -1 ;
//					  })
//				  }).then(function(filteredElements){
//					  filteredElements[0].click();
//				  });
//				  
//				  var submitBtn = element(by.partialButtonText('Save'));
//				  isClickable = EC.elementToBeClickable(submitBtn);
//				  browser.wait(isClickable, 30000);
//				  browser.actions().mouseMove(submitBtn).perform();
//				  submitBtn.click().then(function(){
//					  
//				  });
			  });
			  });
		  });
		  });
	  });
  };
   
  
};
module.exports = new AccountPage();