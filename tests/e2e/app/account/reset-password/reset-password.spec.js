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
				 it('Forget Password First Time', function() {
					 console.log('baseUrl'+resetPasswordData.baseUrl);
					 resetPasswordPage.get(resetPasswordData.baseUrl);
					 resetPasswordPage.clickForgotPassword(resetUserDataCred.username);
				 });
		  
		  
				 afterEach(function() {  
					 browser.manage().logs().get('browser').then(function(browserLog) {
						 var i = 0,
						 severWarnings = false;

						 for(i; i <= browserLog.length-1; i++){
							 if(browserLog[i].level.name === 'SEVERE'){
								 console.log('\n' + browserLog[i].level.name);
								 //uncomment to see the error
								 console.log('(Possibly exception) \n' + browserLog[i].message);

								 severWarnings = true;
							 }
						 }
						 //remove it to run test case even if test case is successful
//						 expect(severWarnings).toBe(false);
					 });
				 });
		        })(resetPasswordData.userNameList[i]);
			 
			 
		 }
		 
		 
		 i=0;
		 for (; i< resetPasswordData.notExistingUserList.length; i++) {
			 console.log('user creds :'+resetPasswordData.notExistingUserList[i].username);
			 (function(resetUserDataCred) {
				 it('Forget Password - Invalid User', function() {
					 console.log('baseUrl'+resetPasswordData.baseUrl);
					 resetPasswordPage.get(resetPasswordData.baseUrl);
					 resetPasswordPage.clickInvalidUserForgotPassword(resetUserDataCred.username, 
							 resetPasswordData.notExistingUserMessage);
				 });
		  
		  
				 afterEach(function() {  
					 browser.manage().logs().get('browser').then(function(browserLog) {
						 var i = 0,
						 severWarnings = false;

						 for(i; i <= browserLog.length-1; i++){
							 if(browserLog[i].level.name === 'SEVERE'){
								 console.log('\n' + browserLog[i].level.name);
								 //uncomment to see the error
								 console.log('(Possibly exception) \n' + browserLog[i].message);

								 severWarnings = true;
							 }
						 }
						 //remove it to run test case even if test case is successful
//						 expect(severWarnings).toBe(false);
					 });
				 });
		        })(resetPasswordData.notExistingUserList[i]);
			 
			 
		 }
		 
		 i=0;
		 for (; i< resetPasswordData.userNameList.length; i++) {
			 console.log('user creds :'+resetPasswordData.userNameList[i].username);
			 (function(resetUserDataCred) {
				 it('Forget Password - Duplicate Request', function() {
					 console.log('baseUrl'+resetPasswordData.baseUrl);
					 resetPasswordPage.get(resetPasswordData.baseUrl);
					 resetPasswordPage.clickAgainForgotPassword(resetUserDataCred.username, 
							 resetPasswordData.passwordAlreadySent);
				 });
		  
		  
				 afterEach(function() {  
					 browser.manage().logs().get('browser').then(function(browserLog) {
						 var i = 0,
						 severWarnings = false;

						 for(i; i <= browserLog.length-1; i++){
							 if(browserLog[i].level.name === 'SEVERE'){
								 console.log('\n' + browserLog[i].level.name);
								 //uncomment to see the error
								 console.log('(Possibly exception) \n' + browserLog[i].message);

								 severWarnings = true;
							 }
						 }
						 //remove it to run test case even if test case is successful
//						 expect(severWarnings).toBe(false);
					 });
				 });
		        })(resetPasswordData.userNameList[i]);
			 
			 
		 }
		 
		 i=0;
		 for (; i< resetPasswordData.invalidEmailList.length; i++) {
			 console.log('user creds :'+resetPasswordData.invalidEmailList[i].username);
			 (function(resetUserDataCred) {
				 it('Forget Password - Invalid Email', function() {
					 console.log('baseUrl'+resetPasswordData.baseUrl);
					 resetPasswordPage.get(resetPasswordData.baseUrl);
					 resetPasswordPage.clickInvalidEmailForgotPassword(resetUserDataCred.username, 
							 resetPasswordData.invalidEmailAddress);
				 });
		  
		  
				 afterEach(function() {  
					 browser.manage().logs().get('browser').then(function(browserLog) {
						 var i = 0,
						 severWarnings = false;

						 for(i; i <= browserLog.length-1; i++){
							 if(browserLog[i].level.name === 'SEVERE'){
								 console.log('\n' + browserLog[i].level.name);
								 //uncomment to see the error
								 console.log('(Possibly exception) \n' + browserLog[i].message);

								 severWarnings = true;
							 }
						 }
						 //remove it to run test case even if test case is successful
//						 expect(severWarnings).toBe(false);
					 });
				 });
		        })(resetPasswordData.invalidEmailList[i]);
			 
			 
		 }
			 
  
});