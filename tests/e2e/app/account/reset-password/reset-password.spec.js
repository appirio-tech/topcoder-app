// spec.js
 var resetPasswordPage = require('./reset-password.object');
 var resetPasswordData = require('./reset-password.data');
 
 
 
	 describe('Reset Password', function() {
		 console.log(resetPasswordData.userNameList.length);
		 var i=0;
		 var baseUrl =  resetPasswordData.baseUrl;
		 for (; i< resetPasswordData.userNameList.length; i++) {
			 console.log('user creds :'+resetPasswordData.userNameList[i].username);
			 (function(resetUserDataCred) {
				 it('welcomes the user', function() {
					 console.log('baseUrl'+resetPasswordData.baseUrl);
					 resetPasswordPage.get(resetPasswordData.baseUrl);
					 resetPasswordPage.clickForgotPassword(resetUserDataCred.username);
//					 resetPasswordPage.login(resetUserDataCred);
				 });
		  
				 it('welcomes the user for logout', function() {
					 resetPasswordPage.logOut();
				 });
		  
//				 afterEach(function() {  
//					 browser.manage().logs().get('browser').then(function(browserLog) {
//						 var i = 0,
//						 severWarnings = false;
//
//						 for(i; i <= browserLog.length-1; i++){
//							 if(browserLog[i].level.name === 'SEVERE'){
//								 console.log('\n' + browserLog[i].level.name);
//								 //uncomment to see the error
//								 console.log('(Possibly exception) \n' + browserLog[i].message);
//
//								 severWarnings = true;
//							 }
//						 }
//						 //remove it to run test case even if test case is successful
////						 expect(severWarnings).toBe(false);
//					 });
//				 });
		        })(resetPasswordData.userNameList[i]);
			 
			 
		 }
		 
		 
		 
		 for (; i< resetPasswordData.notExistingUserList.length; i++) {
			 console.log('user creds :'+resetPasswordData.notExistingUserList[i].username);
			 (function(resetUserDataCred) {
				 it('welcomes the user', function() {
					 console.log('baseUrl'+resetPasswordData.baseUrl);
					 resetPasswordPage.get(resetPasswordData.baseUrl);
					 resetPasswordPage.clickInvalidUserForgotPassword(resetUserDataCred.username, 
							 resetPasswordData.notExistingUserMessage);
//					 resetPasswordPage.login(resetUserDataCred);
				 });
		  
//				 it('welcomes the user for logout', function() {
//					 resetPasswordPage.logOut();
//				 });
		  
//				 afterEach(function() {  
//					 browser.manage().logs().get('browser').then(function(browserLog) {
//						 var i = 0,
//						 severWarnings = false;
//
//						 for(i; i <= browserLog.length-1; i++){
//							 if(browserLog[i].level.name === 'SEVERE'){
//								 console.log('\n' + browserLog[i].level.name);
//								 //uncomment to see the error
//								 console.log('(Possibly exception) \n' + browserLog[i].message);
//
//								 severWarnings = true;
//							 }
//						 }
//						 //remove it to run test case even if test case is successful
////						 expect(severWarnings).toBe(false);
//					 });
//				 });
		        })(resetPasswordData.notExistingUserList[i]);
			 
			 
		 }
		 
		 
		 for (; i< resetPasswordData.userNameList.length; i++) {
			 console.log('user creds :'+resetPasswordData.userNameList[i].username);
			 (function(resetUserDataCred) {
				 it('welcomes the user', function() {
					 console.log('baseUrl'+resetPasswordData.baseUrl);
					 resetPasswordPage.get(resetPasswordData.baseUrl);
//					 resetPasswordPage.clickForgotPassword(resetUserDataCred.username);
					 resetPasswordPage.clickAgainForgotPassword(resetUserDataCred.username, 
							 resetPasswordData.passwordAlreadySent);
//					 resetPasswordPage.login(resetUserDataCred);
				 });
		  
//				 it('welcomes the user for logout', function() {
//					 resetPasswordPage.logOut();
//				 });
		  
//				 afterEach(function() {  
//					 browser.manage().logs().get('browser').then(function(browserLog) {
//						 var i = 0,
//						 severWarnings = false;
//
//						 for(i; i <= browserLog.length-1; i++){
//							 if(browserLog[i].level.name === 'SEVERE'){
//								 console.log('\n' + browserLog[i].level.name);
//								 //uncomment to see the error
//								 console.log('(Possibly exception) \n' + browserLog[i].message);
//
//								 severWarnings = true;
//							 }
//						 }
//						 //remove it to run test case even if test case is successful
////						 expect(severWarnings).toBe(false);
//					 });
//				 });
		        })(resetPasswordData.userNameList[i]);
			 
			 
		 }
			 
  
});