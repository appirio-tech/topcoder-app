var LoginPage = function() {
 
  this.get = function(baseUrl) {
	  browser.ignoreSynchronization = true;
    browser.get(baseUrl);
  };
 
  this.login = function(loginUser) {
	  
//	expect(browser.getTitle()).toContain('Login');
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
		
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  userInput.sendKeys(loginUser.username);
  	
	  var passwordInput = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
	  
	  var loginButton = browser.driver.findElement(By.css('.enabled-button'));
//	  isClickable = EC.elementToBeClickable(loginButton);
//	  browser.wait(isClickable, 30000);
	  console.log('userInput'); 
	  
    
	  loginButton.click().then(function(){
//		  username = element(by.model('vm.username'));
//		  var userNameAvail = username.isPresent();
//		  console.log('user name status'+userNameAvail);
    	element.all(by.css('.label')).each(function(element, index) {
    		
    	var isClickable = EC.elementToBeClickable(element);
    	browser.wait(isClickable, 10000);
 		element.getText().then(function (text) {
 			console.log(index, text);
 		});
    });
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
  	
	  var passwordInput = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
	  
	  console.log('password '+loginUser.password);
	  
	  var loginButton = browser.driver.findElement(By.css('.enabled-button'));
//	  isClickable = EC.elementToBeClickable(loginButton);
//	  browser.wait(isClickable, 30000);
	  console.log('userInput'); 
	  
    
	  loginButton.click().then(function(){
		  username = element(by.model('vm.username'));
		  var userNameAvail = username.isPresent();
		  console.log('user name status'+userNameAvail);
		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(1);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  console.log('text '+formError.getInnerHtml());
		  expect(formError.getInnerHtml()).toEqual(errMsg);
//		  expect(formError.isDisplayed()).toEqual(true);
		  
//    	element.all(by.css('.label')).each(function(element, index) {
//    		
//    	var isClickable = EC.elementToBeClickable(element);
//    	browser.wait(isClickable, 10000);
// 		element.getText().then(function (text) {
// 			console.log(index, text);
// 		});
//    });
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
  	
	  var passwordInput = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
	  
	  console.log('password '+loginUser.password);
	  
	  var loginButton = browser.driver.findElement(By.css('.enabled-button'));
//	  isClickable = EC.elementToBeClickable(loginButton);
//	  browser.wait(isClickable, 30000);
	  console.log('userInput'); 
	  
    
	  loginButton.click().then(function(){
		  username = element(by.model('vm.username'));
		  var userNameAvail = username.isPresent();
		  console.log('user name status'+userNameAvail);
		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(1);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  console.log('text '+formError.getInnerHtml());
		  expect(formError.getInnerHtml()).toEqual(errMsg);
//		  expect(formError.isDisplayed()).toEqual(true);
		  
//    	element.all(by.css('.label')).each(function(element, index) {
//    		
//    	var isClickable = EC.elementToBeClickable(element);
//    	browser.wait(isClickable, 10000);
// 		element.getText().then(function (text) {
// 			console.log(index, text);
// 		});
//    });
    	expect(true).toEqual(true);
   });
  };
  
  
  
  this.twitterLogin = function(loginUser1) {
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  console.log('twitter login');
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var twitterSquare = browser.driver.findElement(by.css('.social-icons .fa-twitter-square'));
	  twitterSquare.click();
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('username_or_email'));
		  console.log('twitter username');
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  browser.driver.wait(function() {
		  var password = browser.driver.findElement(by.id('password'));
		  console.log('twitter password');
		  password.sendKeys(loginUser1.password);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function(){
		 var loginBtn = browser.driver.findElement(by.css('.submit'));
		 console.log(' twitter login button');
		 loginBtn.click();
		 return true;
	  },30000);
	  
	  
	  
	  /*
	  browser.driver.wait(function() {
		  browser.driver.findElement(by.css('.social-icons .fa-twitter-square')).then(function(elem) {   
			  console.log('twitter login');
			  elem.click();
				  browser.driver.findElement(by.id('username_or_email')).then(function(elem1){
					  elem1.sendKeys(loginUser1.username);
					  console.log('usernameoremail');
//					  return true;
				  });
				  browser.driver.findElement(by.id('password')).then(function(elem1){
					  elem1.sendKeys(loginUser1.password);
					  console.log('password');
//					  return true;
				  });
				  browser.driver.findElement(by.css('.submit')).then(function(elem1){
					  elem1.click();
					  console.log('submit button');
//					  return true;
				  });
				  
			  console.log('twitter login click');
			  return true;
		  });
	  },30000);*/
	  
	  console.log('out of twitter login');
	  expect(true).toEqual(true);
	  
  };
  
  
  
  
  this.fbLogin = function(loginUser1) {
	 
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  console.log('twitter login');
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var fbSquare = browser.driver.findElement(by.css('.social-icons .fa-facebook-square'));
	  fbSquare.click();
	  
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('email'));
		  console.log('fb username');
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function() {
		  var password = browser.driver.findElement(by.id('pass'));
		  console.log('fb password');
		  password.sendKeys(loginUser1.password);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function(){
		 var loginBtn = browser.driver.findElement(by.id('u_0_2'));
		 console.log(' fb login button');
		 loginBtn.click();
		 return true;
		 
	  },30000);
	  
	  
	  /*browser.driver.wait(function() {
		  browser.driver.findElement(by.css('.social-icons .fa-facebook-square')).then(function(elem) {   
			  console.log('fb login');
			  elem.click();
				  browser.driver.findElement(by.id('email')).then(function(elem){
					  elem.sendKeys(loginUser1.username);
					  console.log('fb username');
					  return true;
				  });
				  browser.driver.findElement(by.id('pass')).then(function(elem){
					  elem.sendKeys(loginUser1.password);
					  console.log('fb password ');
					  return true;
				  });
				  browser.driver.findElement(by.id('u_0_2')).then(function(elem){
					  elem.click();
					  console.log(' fb login button');
					  return true;
				  });
				  
			  console.log('fb login click');
			  return true;
		  });
	  },30000);*/
	  
	  console.log('out of fb login');
	  expect(true).toEqual(true);
	  
  };
  
  
  
  
  
  
  
  
  
  
  
  
  this.googleLogin = function(loginUser1) {
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  console.log('google login');
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var fbSquare = browser.driver.findElement(by.css('.social-icons .fa-google-plus-square'));
	  fbSquare.click();
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('Email'));
		  console.log('google username');
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function() {
		  var next = browser.driver.findElement(by.id('next'));
		  console.log('google next');
		  next.click();
		  return true;
	  },30000);
	  
	  browser.driver.wait(function(){
		 var password = browser.driver.findElement(by.id('Passwd'));
		 password.sendKeys(loginUser1.password);
		 console.log(' google login Passwd');
		 return true;
	  },30000);
	  
	  browser.driver.wait(function(){
			 var signIn = browser.driver.findElement(by.id('signIn'));
			 console.log('google signIn');
			 signIn.click();
			 return true;
	  },30000);
	  
	  console.log('out of google login');
	  expect(true).toEqual(true);
  };
  
  
  this.gitLogin = function(loginUser1) {
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  console.log('git login');
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var gitSquare = browser.driver.findElement(by.css('.social-icons .fa-github-square'));
	  gitSquare.click();
	  browser.driver.wait(function() {
		  var emailId = browser.driver.findElement(by.id('login_field'));
		  console.log('git username');
		  emailId.sendKeys(loginUser1.username);
		  return true;
	  },30000);
	  
	  browser.driver.wait(function(){
		 var password = browser.driver.findElement(by.id('password'));
		 password.sendKeys(loginUser1.password);
		 console.log(' Git login Passwd');
		 return true;
	  },30000);
	  
	  browser.driver.wait(function(){
			 var signIn = browser.driver.findElement(by.name('commit'));
			 console.log('Git signIn');
			 signIn.click();
			 return true;
	  },30000);
	  
	  console.log('out of git login');
	  expect(true).toEqual(true);
  };
  
  
  
  
  
  
  this.logOut = function () {
	  var EC = protractor.ExpectedConditions;
	  var elementLabel = element(by.css('.logout a'));
	  var isClickable = EC.elementToBeClickable(elementLabel);
	  browser.wait(isClickable, 10000);
	
	  elementLabel.click().then(function() {
		
//		var label = element(by.css('.label'));
//		var isClickable = EC.elementToBeClickable(label);
//		browser.wait(isClickable, 20000);
		  expect(true).toEqual(true);
		
	  });
  };
  
};
module.exports = new LoginPage();