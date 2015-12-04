var ResetPasswordPage = function() {
 
  this.get = function(baseUrl) {
	  browser.ignoreSynchronization = true;
	  browser.get(baseUrl);
  };
  
  this.clickForgotPassword = function(loginUserName) {
	  var EC = protractor.ExpectedConditions;
	  browser.driver.ignoreSynchronization = true;
	  
	  var forgotPasswordBtn = element(by.css('.forgot-password'));
	  var isClickable = EC.elementToBeClickable(forgotPasswordBtn);
	  browser.wait(isClickable, 30000);
	  
	  forgotPasswordBtn.click().then(function(){
		  var emailTextField = element(by.name('email'));
		  var isClickable = EC.elementToBeClickable(emailTextField);
		  browser.wait(isClickable, 30000);
		  
		  emailTextField.click();
		  emailTextField.sendKeys(loginUserName);
		  var emailTips = element(by.css('.email-tips'));
		  
		  var resetButton = element(by.css('.enabled-button'));
		  resetButton.click().then(function(){
			  browser.driver.sleep(2000);
			  var resetPasswordContainer = element(by.css('.reset-password-container'));
			  expect(resetPasswordContainer.isDisplayed()).toEqual(true);
		  });
		   
	  });
	  
	  
  };
  
  
  this.clickInvalidUserForgotPassword = function(loginUserName, errMsg) {
	  var EC = protractor.ExpectedConditions;
	  
	  var forgotPasswordBtn = element(by.css('.forgot-password'));
	  var isClickable = EC.elementToBeClickable(forgotPasswordBtn);
	  browser.wait(isClickable, 30000);
	  
	  forgotPasswordBtn.click().then(function(){
		  var emailTextField = element(by.name('email'));
		  var isClickable = EC.elementToBeClickable(emailTextField);
		  browser.wait(isClickable, 30000);
		  
		  emailTextField.sendKeys(loginUserName);
		  var emailTips = element(by.css('.email-tips'));

		  var resetButton = element(by.css('.enabled-button'));
		  resetButton.click().then(function(){
			  browser.driver.sleep(2000);
			  
			  emailTextField = element(by.model('vm.email'));
			  isClickable = EC.elementToBeClickable(emailTextField);
			  browser.wait(isClickable, 30000);
			 
			  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(2);
			  isClickable = EC.elementToBeClickable(formError);
			  browser.wait(isClickable, 30000);
			  expect(formError.getInnerHtml()).toContain(errMsg);
			  
		  });
		   
	  });
	  
	  
  };
  
  
  
  this.clickInvalidEmailForgotPassword = function(loginUserName, errMsg) {
	  var EC = protractor.ExpectedConditions;
	  
	  var forgotPasswordBtn = element(by.css('.forgot-password'));
	  var isClickable = EC.elementToBeClickable(forgotPasswordBtn);
	  browser.wait(isClickable, 30000);
	  
	  forgotPasswordBtn.click().then(function(){
		  browser.driver.sleep(2000);
		  
		  var emailTextField = element(by.name('email'));
		  var isClickable = EC.elementToBeClickable(emailTextField);
		  browser.wait(isClickable, 30000);
		  
		  emailTextField.sendKeys(loginUserName);
		  var emailTips = element(by.css('.email-tips'));
		  
		  var resetButton = element(by.css('.reset-form button'));
		  expect(resetButton.isEnabled()).toEqual(false);
		  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(0);
		  isClickable = EC.elementToBeClickable(formError);
		  browser.wait(isClickable, 30000);
		  expect(formError.getText()).toEqual(errMsg);
	  });
  };
  
  
  
  this.clickAgainForgotPassword = function(loginUserName, errMsg) {
	  var EC = protractor.ExpectedConditions;
	  
	  var forgotPasswordBtn = element(by.css('.forgot-password'));
	  var isClickable = EC.elementToBeClickable(forgotPasswordBtn);
	  browser.wait(isClickable, 30000);
	  
	  forgotPasswordBtn.click().then(function(){
		  var emailTextField = element(by.name('email'));
		  var isClickable = EC.elementToBeClickable(emailTextField);
		  browser.wait(isClickable, 30000);
		  
		  emailTextField.sendKeys(loginUserName);
		  var emailTips = element(by.css('.email-tips'));
		  
		  var resetButton = element(by.css('.enabled-button'));
		  resetButton.click().then(function(){
			  browser.driver.sleep(2000);
			  
			  emailTextField = element(by.model('vm.email'));
			  isClickable = EC.elementToBeClickable(emailTextField);
			  browser.wait(isClickable, 30000);
			 
			  var formError = element(by.css('.form-errors')).all(by.css('.form-error')).get(1);
			  isClickable = EC.elementToBeClickable(formError);
			  browser.wait(isClickable, 30000);
			  expect(formError.getInnerHtml()).toContain(errMsg);
			  
			  
		  });
		   
	  });
	  
	  
  };
  
};
module.exports = new ResetPasswordPage();