var ResetPasswordPage = function() {
 
  this.get = function(baseUrl) {
	  console.log('baseUrl '+baseUrl);
//	  browser.ignoreSynchronization = true;
	  browser.get(baseUrl);
  };
  
  this.clickForgotPassword = function(userName) {
	  console.log('click forgot password link');
//	  this.get(loginUrl);
	  var EC = protractor.ExpectedConditions;
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var forgotPasswordBtn = element(by.css('.forgot-password'));
	  var isClickable = EC.elementToBeClickable(forgotPasswordBtn);
	  browser.wait(isClickable, 30000);
	  
	  forgotPasswordBtn.click().then(function(){
		  var emailTextField = element(by.model('vm.email'));
		  var isClickable = EC.elementToBeClickable(emailTextField);
		  browser.wait(isClickable, 30000);
		  
		  console.log('username '+userName);
		  emailTextField.sendKeys(userName);
		  var emailTips = element(by.css('.email-tips'));
//		  expect(emailTips.isVisible()).toEqual(true);
		  
		  var resetButton = element(by.css('.enabled-button'));
		  resetButton.click().then(function(){
			  var resetPasswordContainer = element(by.css('.reset-password-container'));
			  console.log(resetPasswordContainer.getText());
		  });
		   
	  });
	  
	  
  };
  
  
  this.clickInvalidUserForgotPassword = function(userName, errMsg) {
	  console.log('click forgot password link');
//	  this.get(loginUrl);
	  var EC = protractor.ExpectedConditions;
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var forgotPasswordBtn = element(by.css('.forgot-password'));
	  var isClickable = EC.elementToBeClickable(forgotPasswordBtn);
	  browser.wait(isClickable, 30000);
	  
	  forgotPasswordBtn.click().then(function(){
		  var emailTextField = element(by.model('vm.email'));
		  var isClickable = EC.elementToBeClickable(emailTextField);
		  browser.wait(isClickable, 30000);
		  
		  console.log('username '+userName);
		  emailTextField.sendKeys(userName);
		  var emailTips = element(by.css('.email-tips'));
//		  expect(emailTips.isVisible()).toEqual(true);
		  
		  var resetButton = element(by.css('.enabled-button'));
		  resetButton.click().then(function(){
			  
			  emailTextField = element(by.model('vm.email'));
			  isClickable = EC.elementToBeClickable(emailTextField);
			  browser.wait(isClickable, 30000);
			 
			  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(2);
			  isClickable = EC.elementToBeClickable(formError);
			  browser.wait(isClickable, 30000);
			  console.log('text '+formError.getInnerHtml());
			  expect(formError.getInnerHtml()).toContain(errMsg);
			  
			  
//			  var resetPasswordContainer = element(by.css('.reset-password-container'));
//			  console.log(resetPasswordContainer.getText());
		  });
		   
	  });
	  
	  
  };
  
  
  
  this.clickInvalidEmailForgotPassword = function(userName, errMsg) {
	  console.log('click forgot password link');
//	  this.get(loginUrl);
	  var EC = protractor.ExpectedConditions;
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var forgotPasswordBtn = element(by.css('.forgot-password'));
	  var isClickable = EC.elementToBeClickable(forgotPasswordBtn);
	  browser.wait(isClickable, 30000);
	  
	  forgotPasswordBtn.click().then(function(){
		  var emailTextField = element(by.model('vm.email'));
		  var isClickable = EC.elementToBeClickable(emailTextField);
		  browser.wait(isClickable, 30000);
		  
		  console.log('username '+userName);
		  emailTextField.sendKeys(userName);
		  var emailTips = element(by.css('.email-tips'));
//		  expect(emailTips.isVisible()).toEqual(true);
		  
		  var resetButton = element(by.css('.reset-form button'));
		  expect(resetButton.isEnabled()).toEqual(false);
		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(0);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  console.log('text '+formError.getInnerHtml());
		  expect(formError.getInnerHtml()).toEqual(errMsg);
		  
		   
	  });
	  
	  
  };
  
  
  
  this.clickAgainForgotPassword = function(userName, errMsg) {
	  console.log('click forgot password link');
//	  this.get(loginUrl);
	  var EC = protractor.ExpectedConditions;
	  
	  var userInput = element(by.model('vm.username'));
	  var isClickable = EC.elementToBeClickable(userInput);
	  browser.wait(isClickable, 30000);
	  
	  var forgotPasswordBtn = element(by.css('.forgot-password'));
	  var isClickable = EC.elementToBeClickable(forgotPasswordBtn);
	  browser.wait(isClickable, 30000);
	  
	  forgotPasswordBtn.click().then(function(){
		  var emailTextField = element(by.model('vm.email'));
		  var isClickable = EC.elementToBeClickable(emailTextField);
		  browser.wait(isClickable, 30000);
		  
		  console.log('username '+userName);
		  emailTextField.sendKeys(userName);
		  var emailTips = element(by.css('.email-tips'));
//		  expect(emailTips.isVisible()).toEqual(true);
		  
		  var resetButton = element(by.css('.enabled-button'));
		  resetButton.click().then(function(){
			  
			  emailTextField = element(by.model('vm.email'));
			  isClickable = EC.elementToBeClickable(emailTextField);
			  browser.wait(isClickable, 30000);
			 
			  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(1);
			  isClickable = EC.elementToBeClickable(formError);
			  browser.wait(isClickable, 30000);
			  console.log('text '+formError.getInnerHtml());
			  expect(formError.getInnerHtml()).toContain(errMsg);
			  
			  
//			  var resetPasswordContainer = element(by.css('.reset-password-container'));
//			  console.log(resetPasswordContainer.getText());
		  });
		   
	  });
	  
	  
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
module.exports = new ResetPasswordPage();