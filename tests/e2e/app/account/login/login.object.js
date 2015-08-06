var LoginPage = function() {
 
  this.get = function(baseUrl) {
    browser.get(baseUrl);
  };
 
  this.login = function(loginUser) {
	  
//	expect(browser.getTitle()).toContain('Login');
	
	  var EC = protractor.ExpectedConditions;
		
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  userInput.sendKeys(loginUser.username);
  	
	  var passwordInput = element(by.model('vm.password'));
	  isClickable = EC.elementToBeClickable(passwordInput);
	  browser.wait(isClickable, 30000);
	  passwordInput.sendKeys(loginUser.password);
    	 
	  var loginButton = element(by.css('.enabled-button'));
	  isClickable = EC.elementToBeClickable(loginButton);
	  browser.wait(isClickable, 30000);
	  console.log('userInput');
    
	  loginButton.click().then(function(){
    	
    	element.all(by.css('.label')).each(function(element, index) {
    		
    	var isClickable = EC.elementToBeClickable(element);
    	browser.wait(isClickable, 10000);
 		element.getText().then(function (text) {
 			console.log(index, text);
 		});
    });
   });
  };
  
  
  /*
  this.twitterLogin = function(loginUser1) {
//	  var twitterSquare = element(by.css('.social-icons .fa-twitter-square'));
	 
	  browser.driver.ignoreSynchronization = true;
	  
	  var bD = browser.driver;
	  var EC = protractor.ExpectedConditions;
	  
//	  var userInput = element(by.model('vm.username'));
//	  var isClickable = EC.elementToBeClickable(userInput);
//	  browser.wait(isClickable, 30000);
	  browser.driver.wait(function() {
		  browser.driver.findElement(by.css('.social-icons .fa-twitter-square')).then(function(elem) {   
			  console.log('twitter login');
			  elem.click();
			  console.log('twitter login');
			  return true;
		  });
	  },30000);
	  
	  var isClickable = EC.elementToBeClickable(twitterSquare);

	  console.log('twitter login');//+twitterSquare);
	  browser.wait(isClickable, 30000);
	  console.log('twitter login');
	  
	  twitterSquare.click().then(function() {
		  console.log('twitter login');
		  var username = browser.driver.findElement(by.id('username_or_email'));
		  var isClickable = EC.elementToBeClickable(username);
		  browser.wait(isClickable, 30000);
		  
		  var password = browser.driver.findElement(by.id('password'));
		  var isClickable = EC.elementToBeClickable(password);
		  browser.wait(isClickable, 30000);
		  
		  var signInButton = browser.driver.findElement(by.id('allow'));
		  signInButton.click().then(function(){
			  expect(browser.getTitle().toContain('Dashboard | TopCoder'));
		  });
		  
	  });
	  
  };*/
  
  this.logOut = function () {
	  var EC = protractor.ExpectedConditions;
	var elementLabel = element(by.css('.logout a'));
	var isClickable = EC.elementToBeClickable(elementLabel);
	browser.wait(isClickable, 10000);
	
	elementLabel.click().then(function() {
		
		var label = element(by.css('.label'));
		var isClickable = EC.elementToBeClickable(label);
		browser.wait(isClickable, 20000);
		
	});
  };
  
};
module.exports = new LoginPage();