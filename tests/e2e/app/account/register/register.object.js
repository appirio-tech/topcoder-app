// User Registration Page
var RegistrationPage = function() {
 
  this.get = function(baseUrl) {
	  browser.ignoreSynchronization = true;
    browser.get(baseUrl);
  };
 
  this.register = function(userInfo) {
	  
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var firstName = element(by.model('vm.firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 30000);
	  firstName.sendKeys(userInfo.firstname);
  	
	  var lastName = element(by.model('vm.lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 30000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 30000);
	  userCountry.sendKeys(userInfo.country);

	  var userName = element(by.model('vm.username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 30000);
	  userName.sendKeys(userInfo.username);

	  var userEmail = element(by.model('vm.email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 30000);
	  userEmail.sendKeys(userInfo.email);

	  var userPassword = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 30000);
	  userPassword.sendKeys(userInfo.password);
	  
	  var registerButton = element(by.css('.enabled-button'));
	  isClickable = EC.elementToBeClickable(registerButton);
	  browser.wait(isClickable, 30000);
	  
	  registerButton.click().then(function(){ 	
        element.all(by.css('.label')).each(function(element, index) {	
          var isClickable = EC.elementToBeClickable(element);
          browser.wait(isClickable, 30000);
 	      element.getText().then(function (text) {
 	        console.log(index, text);
 		  });
        });
    	expect(true).toEqual(true);
     });
  };
  
  
  this.registerInvalidLengthHandle = function(userInfo, invalidLengthHandleMessage) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var firstName = element(by.model('vm.firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 20000);
	  firstName.sendKeys(userInfo.firstname);
  	
	  var lastName = element(by.model('vm.lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 20000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 20000);
	  userCountry.sendKeys(userInfo.country);

	  var userName = element(by.model('vm.username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 20000);
	  userName.sendKeys(userInfo.username);
	  
	  var userEmail = element(by.model('vm.email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 20000);
	  userEmail.sendKeys(userInfo.email);
	  
	  var formErrorList = element.all(by.css('.form-errors .form-error'));
	  var formError = formErrorList.get(2);
	  isClickable = EC.elementToBeClickable(formError);
	  browser.wait(isClickable, 40000);
	  
	  expect(formError.isDisplayed()).toEqual(true);
	  expect(formError.getInnerHtml()).toEqual(invalidLengthHandleMessage);
	  
	  var userPassword = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 20000);
	  userPassword.sendKeys(userInfo.password);
	  
	  var registerButton =element(by.partialButtonText('Join Now'));
	  expect(registerButton.isEnabled()).toEqual(true);
  };
  
  
  this.registerNotAllowedHandle = function(userInfo, notAllowedHandleMsg) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var firstName = element(by.model('vm.firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 20000);
	  firstName.sendKeys(userInfo.firstname);
  	
	  var lastName = element(by.model('vm.lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 20000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 20000);
	  userCountry.sendKeys(userInfo.country);

	  var userName = element(by.model('vm.username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 20000);
	  userName.sendKeys(userInfo.username);
	  
	  var userEmail = element(by.model('vm.email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 20000);
	  userEmail.sendKeys(userInfo.email);
	  
	  var formErrorList = element.all(by.css('.form-errors .form-error'));
	  var formError = formErrorList.get(1);
	  isClickable = EC.elementToBeClickable(formError);
	  browser.wait(isClickable, 40000);
	  
	  expect(formError.isDisplayed()).toEqual(true);
	  
	  expect(formError.getInnerHtml()).toEqual(notAllowedHandleMsg);
	  
	  var userPassword = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 20000);
	  userPassword.sendKeys(userInfo.password);
	  
	  var registerButton =element(by.partialButtonText('Join Now'));
	  expect(registerButton.isEnabled()).toEqual(false);
  };
  
  
  this.registerAlreadyTakenHandles = function(userInfo, alreadyTakenHandleMessage) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var firstName = element(by.model('vm.firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 20000);
	  firstName.sendKeys(userInfo.firstname);
  	
	  var lastName = element(by.model('vm.lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 20000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 20000);
	  userCountry.sendKeys(userInfo.country);

	  var userName = element(by.model('vm.username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 20000);
	  userName.sendKeys(userInfo.username);
	  
	  var userEmail = element(by.model('vm.email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 20000);
	  userEmail.sendKeys(userInfo.email);
	  
	  var formErrorList = element.all(by.css('.form-errors .form-error'));
	  var formError = formErrorList.get(3);
	  isClickable = EC.elementToBeClickable(formError);
	  browser.wait(isClickable, 40000);
	  
	  expect(formError.isDisplayed()).toEqual(true);
	  
	  expect(formError.getInnerHtml()).toEqual(alreadyTakenHandleMessage);
	  
	  var userPassword = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 20000);
	  userPassword.sendKeys(userInfo.password);
	  
	  var registerButton = element(by.partialButtonText('Join Now'));
	  expect(registerButton.isEnabled()).toEqual(false);
  };

  this.registerInvalidEmailUsers = function(userInfo, invalidEmailMsg) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var firstName = element(by.model('vm.firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 40000);
	  firstName.sendKeys(userInfo.firstname);
  	
	  var lastName = element(by.model('vm.lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 40000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 40000);
	  userCountry.sendKeys(userInfo.country);

	  var userName = element(by.model('vm.username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 40000);
	  userName.sendKeys(userInfo.username);
	  
	  var userEmail = element(by.model('vm.email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 40000);
	  userEmail.sendKeys(userInfo.email);
	  
	  var formErrorList = element.all(by.css('.form-errors .form-error'));
	  var formError = formErrorList.get(3);
	  isClickable = EC.elementToBeClickable(formError);
	  browser.wait(isClickable, 40000);
	  
	  expect(formError.isDisplayed()).toEqual(true);
	  
	  expect(formError.getInnerHtml()).toEqual(invalidEmailMsg);
	  
	  var userPassword = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 40000);
	  userPassword.sendKeys(userInfo.password);
	  
	  var registerButton =element(by.partialButtonText('Join Now'));
	  expect(registerButton.isEnabled()).toEqual(false);
  };
  
  
  this.registerAlreadyTakenEmailUsers = function(userInfo, invalidEmailMsg) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var firstName = element(by.model('vm.firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 40000);
	  firstName.sendKeys(userInfo.firstname);
  	
	  var lastName = element(by.model('vm.lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 40000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 40000);
	  userCountry.sendKeys(userInfo.country);

	  var userName = element(by.model('vm.username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 40000);
	  userName.sendKeys(userInfo.username);
	  
	  var userEmail = element(by.model('vm.email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 30000);
	  userEmail.sendKeys(userInfo.email);
	  
	  var formErrorList = element.all(by.css('.form-errors .form-error'));
	  var formError = formErrorList.get(3);
	  isClickable = EC.elementToBeClickable(formError);
	  browser.wait(isClickable, 30000);
	  
	  expect(formError.isDisplayed()).toEqual(true);
	  
	  expect(formError.getInnerHtml()).toEqual(invalidEmailMsg);
	  
	  var userPassword = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 40000);
	  userPassword.sendKeys(userInfo.password);
	  
	  var registerButton = element(by.partialButtonText('Join Now'));
//	  isClickable = EC.elementToBeClickable(registerButton);console.log('already....taken ... email.');
//	  browser.wait(isClickable, 30000);
	  expect(registerButton.isEnabled()).toEqual(false);
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
  
  
  this.registerGithubUsers = function(userInfo) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  
	  var firstName = element(by.model('vm.firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 30000);
	  
	  var githubButton = element(by.css('.social-icons .github .ico'));
	  isClickable = EC.elementToBeClickable(githubButton);
	  browser.wait(isClickable, 30000);
	  
	  githubButton.click();
	  this.selectWindow(1);
	  
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('login_field'));
		  console.log('git username');
		  emailId.sendKeys(userInfo.githubUsername);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function() {
		 var password = browser.driver.findElement(by.id('password'));
		 password.sendKeys(userInfo.githubPassword);
		 console.log(' Git login Passwd');
		 return true;
	  },30000);
	  
	  
	  
	  
  }
};
module.exports = new RegistrationPage();


