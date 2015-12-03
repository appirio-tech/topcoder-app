// User Registration Page
var RegistrationPage = function() {
 
  this.get = function(baseUrl) {
	  browser.ignoreSynchronization = true;
    browser.get(baseUrl);
  };
 
  this.register = function(userInfo, regSuccessMsg) {
	  
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  
	  var h1Header = element(by.css('.register-container h1'));
	  var isClickable1 = EC.elementToBeClickable(h1Header);
	  browser.wait(isClickable1, 30000);
	  h1Header.click();
	 
	  var firstName = element(by.name('firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 30000);
	  firstName.click();
	  firstName.sendKeys(userInfo.firstname);
	  console.log(userInfo.firstname);
  	
	  var lastName = element(by.name('lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 30000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 30000);
	  userCountry.sendKeys(userInfo.country);
	  
	  var countryIdDropDown = element(by.id('_dropdown'));
	  isClickable = EC.elementToBeClickable(countryIdDropDown);
	  browser.wait(isClickable, 30000);
	  countryIdDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
		  return elem.getInnerHtml().then(function(text){
			  return text.indexOf(userInfo.country) != -1 ;
		  })
	  }).then(function(filteredElements){
		  filteredElements[0].click();
	  });
	  

	  var userName = element(by.name('username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 30000);
	  userName.sendKeys(userInfo.username);

	  var userEmail = element(by.name('email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 30000);
	  userEmail.sendKeys(userInfo.email);

	  var userPassword = element(by.name('password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 30000);
	  userPassword.sendKeys(userInfo.password);
	  
	  browser.driver.sleep(3000);
	  
	  var registerButton = element.all(by.css('.tc-btn-large')).get(0);
	  isClickable = EC.elementToBeClickable(registerButton);
	  browser.wait(isClickable, 30000);
	  
	  registerButton.click().then(function(){ 	
		  var regCont = element(by.css('.registered-successfully-container'));
		  isClickable = EC.elementToBeClickable(regCont);
		  browser.wait(isClickable, 30000);
		  var messageCont = regCont.all(by.css('.message')).get(0);
		  expect(messageCont.getText()).toEqual(regSuccessMsg);
     });
  };
  
  
  this.registerInvalidLengthHandle = function(userInfo, invalidLengthHandleMessage) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var firstName = element(by.name('firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 20000);
	  firstName.sendKeys(userInfo.firstname);
  	
	  var lastName = element(by.name('lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 20000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 20000);
	  userCountry.sendKeys(userInfo.country);
	  
	  var countryIdDropDown = element(by.id('_dropdown'));
	  isClickable = EC.elementToBeClickable(countryIdDropDown);
	  browser.wait(isClickable, 30000);
	  countryIdDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
		  return elem.getInnerHtml().then(function(text){
			  return text.indexOf(userInfo.country) != -1 ;
		  })
	  }).then(function(filteredElements){
		  filteredElements[0].click();
	  });

	  var userName = element(by.name('username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 20000);
	  userName.sendKeys(userInfo.username);
	  
	  var userEmail = element(by.name('email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 20000);
	  userEmail.sendKeys(userInfo.email);
	  
	  var formErrorList = element.all(by.css('.form-input-error .form-error'));
	  var formError = formErrorList.get(1);
	  isClickable = EC.elementToBeClickable(formError);
	  browser.wait(isClickable, 40000);
	  
	  expect(formError.isDisplayed()).toEqual(true);
	  expect(formError.getText()).toEqual(invalidLengthHandleMessage);
	  
	  var userPassword = element(by.name('password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 20000);
	  userPassword.sendKeys(userInfo.password);
	  
	  browser.driver.sleep(3000);
	  var registerButton =element(by.partialButtonText('Join'));
	  expect(registerButton.isEnabled()).toEqual(false);
  };
  
  
  this.registerNotAllowedHandle = function(userInfo, notAllowedHandleMsg) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var firstName = element(by.name('firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 20000);
	  firstName.sendKeys(userInfo.firstname);
  	
	  var lastName = element(by.name('lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 20000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 20000);
	  userCountry.sendKeys(userInfo.country);
	  
	  var countryIdDropDown = element(by.id('_dropdown'));
	  isClickable = EC.elementToBeClickable(countryIdDropDown);
	  browser.wait(isClickable, 30000);
	  countryIdDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
		  return elem.getInnerHtml().then(function(text){
			  return text.indexOf(userInfo.country) != -1 ;
		  })
	  }).then(function(filteredElements){
		  filteredElements[0].click();
	  });

	  var userName = element(by.name('username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 30000);
	  userName.sendKeys(userInfo.username);
	  
	  var userEmail = element(by.name('email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 30000);
	  userEmail.sendKeys(userInfo.email);
	  
	  var userPassword = element(by.name('password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 20000);
	  userPassword.sendKeys(userInfo.password);
	  
	  browser.driver.sleep(6000);
	  var formErrorList = element.all(by.css('.form-input-error .form-error'));
	  var formError = formErrorList.get(1);
	  isClickable = EC.elementToBeClickable(formError);
	  browser.wait(isClickable, 40000);
	  
	  expect(formError.isDisplayed()).toEqual(true);
	  
	  expect(formError.getText()).toEqual(notAllowedHandleMsg);
	  
	  var registerButton =element(by.partialButtonText('Join'));
	  expect(registerButton.isEnabled()).toEqual(false);
  };
  
  
  this.registerAlreadyTakenHandles = function(userInfo, alreadyTakenHandleMessage) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var firstName = element(by.name('firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 20000);
	  firstName.sendKeys(userInfo.firstname);
  	
	  var lastName = element(by.name('lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 20000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 20000);
	  userCountry.sendKeys(userInfo.country);
	  
	  var countryIdDropDown = element(by.id('_dropdown'));
	  isClickable = EC.elementToBeClickable(countryIdDropDown);
	  browser.wait(isClickable, 30000);
	  countryIdDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
		  return elem.getInnerHtml().then(function(text){
			  return text.indexOf(userInfo.country) != -1 ;
		  })
	  }).then(function(filteredElements){
		  filteredElements[0].click();
	  });

	  var userName = element(by.name('username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 20000);
	  userName.sendKeys(userInfo.username);
	  
	  var userEmail = element(by.name('email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 20000);
	  userEmail.sendKeys(userInfo.email);
	  
	  
	  
	  var userPassword = element(by.name('password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 20000);
	  userPassword.sendKeys(userInfo.password);
	  
	  browser.driver.sleep(6000);
	  
	  var formErrorList = element.all(by.css('.form-input-error .form-error'));
	  var formError = formErrorList.get(1);
	  isClickable = EC.elementToBeClickable(formError);
	  browser.wait(isClickable, 40000);
	  
	  expect(formError.isDisplayed()).toEqual(true);
	  
	  expect(formError.getText()).toEqual(alreadyTakenHandleMessage);
	  
	  var registerButton = element(by.partialButtonText('Join'));
	  expect(registerButton.isEnabled()).toEqual(false);
  };

  this.registerInvalidEmailUsers = function(userInfo, invalidEmailMsg) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var firstName = element(by.name('firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 40000);
	  firstName.sendKeys(userInfo.firstname);
  	
	  var lastName = element(by.name('lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 40000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 40000);
	  userCountry.sendKeys(userInfo.country);
	  
	  var countryIdDropDown = element(by.id('_dropdown'));
	  isClickable = EC.elementToBeClickable(countryIdDropDown);
	  browser.wait(isClickable, 30000);
	  countryIdDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
		  return elem.getInnerHtml().then(function(text){
			  return text.indexOf(userInfo.country) != -1 ;
		  })
	  }).then(function(filteredElements){
		  filteredElements[0].click();
	  });

	  var userName = element(by.name('username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 40000);
	  userName.sendKeys(userInfo.username);
	  
	  var userEmail = element(by.name('email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 40000);
	  userEmail.sendKeys(userInfo.email);
	  
	  var userPassword = element(by.name('password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 40000);
	  userPassword.sendKeys(userInfo.password);
	  
	  browser.driver.sleep(6000);
	  
	  var formErrorList = element.all(by.css('.form-input-error .form-error'));
	  var formError = formErrorList.get(1);
	  isClickable = EC.elementToBeClickable(formError);
	  browser.wait(isClickable, 40000);
	  
	  expect(formError.isDisplayed()).toEqual(true);
	  
	  expect(formError.getInnerHtml()).toEqual(invalidEmailMsg);
	  
	  var registerButton =element(by.partialButtonText('Join'));
	  expect(registerButton.isEnabled()).toEqual(false);
  };
  
  
  this.registerAlreadyTakenEmailUsers = function(userInfo, invalidEmailMsg) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
		
	  var firstName = element(by.name('firstname'));
	  var isClickable = EC.elementToBeClickable(firstName);
	  browser.wait(isClickable, 40000);
	  firstName.sendKeys(userInfo.firstname);
  	
	  var lastName = element(by.name('lastname'));
	  isClickable = EC.elementToBeClickable(lastName);
	  browser.wait(isClickable, 40000);
	  lastName.sendKeys(userInfo.lastname);

	  var userCountry = element(by.name('country'));
	  isClickable = EC.elementToBeClickable(userCountry);
	  browser.wait(isClickable, 40000);
	  userCountry.sendKeys(userInfo.country);
	  
	  var countryIdDropDown = element(by.id('_dropdown'));
	  isClickable = EC.elementToBeClickable(countryIdDropDown);
	  browser.wait(isClickable, 30000);
	  countryIdDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
		  return elem.getInnerHtml().then(function(text){
			  return text.indexOf(userInfo.country) != -1 ;
		  })
	  }).then(function(filteredElements){
		  filteredElements[0].click();
	  });

	  var userName = element(by.name('username'));
	  isClickable = EC.elementToBeClickable(userName);
	  browser.wait(isClickable, 40000);
	  userName.sendKeys(userInfo.username);
	  
	  var userEmail = element(by.name('email'));
	  isClickable = EC.elementToBeClickable(userEmail);
	  browser.wait(isClickable, 30000);
	  userEmail.sendKeys(userInfo.email);
	  
	  var userPassword = element(by.name('password'));
	  isClickable = EC.elementToBeClickable(userPassword);
	  browser.wait(isClickable, 40000);
	  userPassword.sendKeys(userInfo.password);
	  
	  browser.driver.sleep(10000);
	  
	  var formErrorList = element.all(by.css('.form-input-error .form-error'));
	  var formError = formErrorList.get(1);
	  isClickable = EC.elementToBeClickable(formError);
	  browser.wait(isClickable, 30000);
	  
	  expect(formError.isDisplayed()).toEqual(true);
	  
	  expect(formError.getInnerHtml()).toEqual(invalidEmailMsg);
	  
	  var registerButton = element(by.partialButtonText('Join'));
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
	  
	  var firstName = element(by.name('firstname'));
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
	  
	  browser.driver.wait(function() {
			 var submitBtn = browser.driver.findElement(by.name('commit'));
			 console.log(' Git submit btn');
			 submitBtn.click();
			 return true;
		  },30000);
	  
	  
	  
	  
  }
};
module.exports = new RegistrationPage();


