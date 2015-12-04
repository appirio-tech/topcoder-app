// spec.js
 var resetPasswordPage = require('./reset-password.object');
 var resetPasswordData = require('./reset-password.data');
 
	 describe('Reset Password', function() {
		 var i=0;
		 var baseUrl =  resetPasswordData.baseUrl;
		 for (; i< resetPasswordData.userNameList.length; i++) {
			 (function(resetUserDataCred) {
				 it('Forget Password First Time', function() {
					 resetPasswordPage.get(resetPasswordData.baseUrl);
					 resetPasswordPage.clickForgotPassword(resetUserDataCred.username);
				 });
		  
		        })(resetPasswordData.userNameList[i]);
			 
			 
		 }
		 
		 
		 i=0;
		 for (; i< resetPasswordData.notExistingUserList.length; i++) {
			 (function(resetUserDataCred) {
				 it('Forget Password - Invalid User', function() {
					 resetPasswordPage.get(resetPasswordData.baseUrl);
					 resetPasswordPage.clickInvalidUserForgotPassword(resetUserDataCred.username, 
							 resetPasswordData.notExistingUserMessage);
				 });
		  
		  
		        })(resetPasswordData.notExistingUserList[i]);
			 
			 
		 }
		 
		 i=0;
		 for (; i< resetPasswordData.userNameList.length; i++) {
			 (function(resetUserDataCred) {
				 it('Forget Password - Duplicate Request', function() {
					 resetPasswordPage.get(resetPasswordData.baseUrl);
					 resetPasswordPage.clickAgainForgotPassword(resetUserDataCred.username, 
							 resetPasswordData.passwordAlreadySent);
				 });
		  
		        })(resetPasswordData.userNameList[i]);
			 
			 
		 }
		 
		 i=0;
		 for (; i< resetPasswordData.invalidEmailList.length; i++) {
			 (function(resetUserDataCred) {
				 it('Forget Password - Invalid Email', function() {
					 resetPasswordPage.get(resetPasswordData.baseUrl);
					 resetPasswordPage.clickInvalidEmailForgotPassword(resetUserDataCred.username, 
							 resetPasswordData.invalidEmailAddress);
				 });
		  
		        })(resetPasswordData.invalidEmailList[i]);
			 
			 
		 }
			 
  
});