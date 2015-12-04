var LoginPage = function() {
 
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
  
  
  
  this.login = function(loginUser) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
  	
	  var passwordInput = element(by.model('vm.currentPassword'));
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 60000);
	  browser.actions().mouseMove(userInput).perform();
	  userInput.clear();
	  userInput.sendKeys(loginUser.username);
	  
	  passwordInput = element(by.model('vm.currentPassword'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 60000);
	  passwordInput.clear();
	  passwordInput.sendKeys(loginUser.password);
	  
	  
	  
	  var loginButton = element(by.css('.tc-btn'));
	  isClickable = EC.elementToBeClickable(loginButton);
	  browser.wait(isClickable, 60000);
	  
    
	  loginButton.click().then(function(){
		  var pageHeader = element(by.css('.page-info .ng-binding'));
		  
		  expect(pageHeader.waitReady()).toBeTruthy();
		  
		  var isClickable = EC.elementToBeClickable(pageHeader);
		  browser.wait(isClickable, 60000);
		  expect(pageHeader.getInnerHtml()).toEqual('Dashboard');
		  
    	expect(true).toEqual(true);
    	
   });
  };
  
  this.invalidPasswordLogin = function(loginUser, errMsg) {
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
		
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  userInput.sendKeys(loginUser.username);
  	
	  var passwordInput = element(by.model('vm.currentPassword'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
	  
	  var loginButton = browser.driver.findElement(By.css('.tc-btn'));
    
	  loginButton.click().then(function(){
		  userInput = element(by.model('vm.username'));
		  isClickable = EC.elementToBeClickable(userInput);
		  browser.wait(isClickable, 30000);
		  
		  var formErrors = element(by.css('.form-errors'));
		  isClickable = EC.elementToBeClickable(formErrors);
		  browser.wait(isClickable, 30000);

		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(0);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  expect(formError.getText()).toEqual(errMsg);
		  
    	expect(true).toEqual(true);
   });
  };
  
  
  this.invalidUserNameLogin = function(loginUser, errMsg) {
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
		
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  userInput.sendKeys(loginUser.username);
  	
	  var passwordInput = element(by.model('vm.currentPassword'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
	  
	  
	  var loginButton = browser.driver.findElement(By.css('.tc-btn'));
    
	  loginButton.click().then(function(){
		  userInput = element(by.model('vm.username'));
		  isClickable = EC.elementToBeClickable(userInput);
		  browser.wait(isClickable, 30000);
		  
		  var formErrors = element(by.css('.form-errors'));
		  isClickable = EC.elementToBeClickable(formErrors);
		  browser.wait(isClickable, 30000);

		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(0);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  expect(formError.getText()).toEqual(errMsg);
		  
   });
  };
  
  
  
  this.invalidSpaceHandleLogin = function(loginUser, errMsg) {
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
		
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  userInput.sendKeys(loginUser.username);
  	
	  var passwordInput = element(by.model('vm.currentPassword'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
	  
	  var loginButton = browser.driver.findElement(By.css('.tc-btn'));
	  
    
	  loginButton.click().then(function(){
		  username = element(by.model('vm.username'));
		  var userNameAvail = username.isPresent();
		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(1);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  expect(formError.getText()).toEqual(errMsg);
    	expect(true).toEqual(true);
   });  
  };
  
  this.invalidUserName = function(loginUser, errMsg) {
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
		
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  userInput.sendKeys(loginUser.username);
  	
	  var passwordInput = element(by.model('vm.currentPassword'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
	  
	  var loginButton = browser.driver.findElement(By.css('.tc-btn'));
	  
    
	  loginButton.click().then(function(){
		  username = element(by.model('vm.username'));
		  var userNameAvail = username.isPresent();
		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(1);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  expect(formError.getInnerHtml()).toEqual(errMsg);
		  
		  expect(true).toEqual(true);
   });
  };
  
  
  
  this.twitterLogin = function(loginUser1) {
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var twitterSquare = browser.driver.findElement(by.css('.networks .twitter .ico'));
	  twitterSquare.click();
	  this.selectWindow(1);
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('username_or_email'));
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  browser.driver.wait(function() {
		  var password = browser.driver.findElement(by.id('password'));
		  password.sendKeys(loginUser1.password);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function(){
		 var loginBtn = browser.driver.findElement(by.css('.submit'));
		 loginBtn.click();
		 return true;
	  },30000);
	  
	  
	  
	  browser.getAllWindowHandles().then(function (handles) {
		  browser.switchTo().window(handles[0]);
	  });
	  
	  var headerDash = element(by.css('.header-dashboard header h1'));
	  var isClickable = EC.elementToBeClickable(headerDash);
	  browser.wait(isClickable, 30000);
	  
	  
	  var menuItemHeaderList = element.all(by.css('.menu-item-header'));
	  var menuItemHeader = menuItemHeaderList.get(1);
	  var username = menuItemHeader.all(by.css('.username')).get(0);
	  isClickable = EC.elementToBeClickable(username);
	  browser.wait(isClickable, 30000);
	  
	  expect(true).toEqual(true);
	  
  };
  
  
  
  
  this.fbLogin = function(loginUser1) {
	 
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var fbSquare = browser.driver.findElement(by.css('.networks .facebook .ico'));
	  fbSquare.click();
	  this.selectWindow(1);
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('email'));
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function() {
		  var password = browser.driver.findElement(by.id('pass'));
		  password.sendKeys(loginUser1.password);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function(){
		 var loginBtn = browser.driver.findElement(by.id('u_0_2'));
		 loginBtn.click();
		 return true;
		 
	  },30000);
	  
	  browser.getAllWindowHandles().then(function (handles) {
		  browser.switchTo().window(handles[0]);
	  });
	  
	  var headerDash = element(by.css('.header-dashboard header h1'));
	  var isClickable = EC.elementToBeClickable(headerDash);
	  browser.wait(isClickable, 30000);
	  
	  
	  var menuItemHeaderList = element.all(by.css('.menu-item-header'));
	  var menuItemHeader = menuItemHeaderList.get(1);
	  var username = menuItemHeader.all(by.css('.username')).get(0);
	  isClickable = EC.elementToBeClickable(username);
	  browser.wait(isClickable, 30000);
	  
	  expect(true).toEqual(true);
	  
  };
  
  
  
  this.googleLogin = function(loginUser1) {
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var fbSquare = browser.driver.findElement(by.css('.networks .google-plus .ico'));
	  fbSquare.click();
	  this.selectWindow(1);
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(By.id('Email'));
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function() {
		  var next = browser.driver.findElement(By.id('next'));
		  next.click();
		  return true;
	  },30000);
	  
	  browser.driver.sleep(3000);
	  browser.driver.wait(function(){
		 var password1 = browser.driver.findElement(By.name('Passwd'));
		 password1.sendKeys(loginUser1.password);
		 return true;
	  },30000);
	  
	  browser.driver.wait(function(){
			 var signIn = browser.driver.findElement(By.id('signIn'));
			 signIn.click();
			 return true;
	  },30000);
	  
	  browser.getAllWindowHandles().then(function (handles) {
		  browser.switchTo().window(handles[0]);
	  });
	  
	  var headerDash = element(by.css('.header-dashboard header h1'));
	  var isClickable = EC.elementToBeClickable(headerDash);
	  browser.wait(isClickable, 30000);
	  
	  
	  var menuItemHeaderList = element.all(by.css('.menu-item-header'));
	  var menuItemHeader = menuItemHeaderList.get(1);
	  var username = menuItemHeader.all(by.css('.username')).get(0);
	  isClickable = EC.elementToBeClickable(username);
	  browser.wait(isClickable, 30000);
	  
	  expect(true).toEqual(true);
  };
  
  
  
  this.gitLogin = function(loginUser1) {
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var gitSquare = browser.driver.findElement(by.css('.networks .github .ico'));
	  gitSquare.click();
	  this.selectWindow(1);
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('login_field'));
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function(){
		 var password = browser.driver.findElement(by.id('password'));
		 password.sendKeys(loginUser1.password);
		 return true;
	  },30000);
	  
	  browser.driver.wait(function(){
			 var signIn = browser.driver.findElement(by.name('commit'));
			 signIn.click();
			 return true;
	  },30000);
	  
	  browser.getAllWindowHandles().then(function (handles) {
		  browser.switchTo().window(handles[0]);
	  });
	  
	  var headerDash = element(by.css('.header-dashboard header h1'));
	  var isClickable = EC.elementToBeClickable(headerDash);
	  browser.wait(isClickable, 30000);
	  
	  
	  var menuItemHeaderList = element.all(by.css('.menu-item-header'));
	  var menuItemHeader = menuItemHeaderList.get(1);
	  var username = menuItemHeader.all(by.css('.username')).get(0);
	  isClickable = EC.elementToBeClickable(username);
	  browser.wait(isClickable, 30000);
	  
	  expect(true).toEqual(true);
  };
  
  
  
  this.logOut = function (dashBoardUrl) {
	  this.get(dashBoardUrl);
	  var EC = protractor.ExpectedConditions;
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var logoutHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(logoutHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(logoutHeader).perform();
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var logoutLink = element(by.partialLinkText('LOG OUT'));
	  expect(logoutLink.waitReady()).toBeTruthy();
	  
	  isClickable = EC.elementToBeClickable(logoutLink);
	  browser.wait(isClickable, 30000);
	
	  logoutLink.click().then(function() {
		
		  var loginBtn = element(by.partialLinkText('[ Log in ]'));
		  var isClickable = EC.elementToBeClickable(loginBtn);
		  browser.wait(isClickable, 30000);
		  expect(true).toEqual(true);
		
	  });
  };
  
};
module.exports = new LoginPage();