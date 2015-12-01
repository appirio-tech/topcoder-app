// spec.js
 var accountPage = require('./account.object');
 var accountData = require('./account.data');
 var loginPage = require('../login/login.object');
 var loginData = require('../login/login.data');
 
 var origFn = browser.driver.controlFlow().execute;

 browser.driver.controlFlow().execute = function() {
   var args = arguments;

   // queue 100ms wait
   origFn.call(browser.driver.controlFlow(), function() {
     return protractor.promise.delayed(50);
   });

   return origFn.apply(browser.driver.controlFlow(), args);
 };
 
 
	 describe('Account Login', function() {
		 console.log(accountData.userCredentials.length);
		 var i=0;
		 for (; i< accountData.userCredentials.length; i++) {
			 console.log('user creds :'+accountData.userCredentials[i].username);
			 (function(loginUserCred) {
				 it('Account Update +ve', function() {
					 loginPage.get(accountData.baseUrl);
					 loginPage.login(loginUserCred);
					 accountPage.goToAccountPage(accountData.dashBoardUrl, loginUserCred);
//					 accountPage.verifyAccountChanges(accountData.dashBoardUrl, loginUserCred);
				 });
		  
				 it('User logout', function() {
					 loginPage.logOut(accountData.dashBoardUrl);
				 });
		  
				 afterEach(function() {  
					 browser.manage().logs().get('browser').then(function(browserLog) {
						 var i = 0,
						 severWarnings = false;

						 for(i; i <= browserLog.length-1; i++){
							 if(browserLog[i].level.name === 'SEVERE'){
//								 console.log('\n' + browserLog[i].level.name);
								 //uncomment to see the error
//								 console.log('(Possibly exception) \n' + browserLog[i].message);

								 severWarnings = true;
							 }
						 }
						 //remove it to run test case even if test case is successful
//						 expect(severWarnings).toBe(false);
					 });
				 });
		        })(accountData.userCredentials[i]);
			 
			 
		 }
		 i=0;
		 for (; i< accountData.invalidLengthUserCredentials.length; i++) {
			 console.log('user credentials :'+accountData.invalidLengthUserCredentials[i].username);
			 (function(loginUserCred) {
				 it('Invalid length new password', function() {
					 loginPage.get(accountData.baseUrl);
					 loginPage.login(loginUserCred);
					 accountPage.goToInvalidLengthChangePassword(accountData.dashBoardUrl, loginUserCred);
				 });
		  
				 it('welcomes the user for logout', function() {
					 loginPage.logOut(accountData.dashBoardUrl);
				 });
		  
				 afterEach(function() {  
					 browser.manage().logs().get('browser').then(function(browserLog) {
						 var i = 0,
						 severWarnings = false;

						 for(i; i <= browserLog.length-1; i++){
							 if(browserLog[i].level.name === 'SEVERE'){
//								 console.log('\n' + browserLog[i].level.name);
								 //uncomment to see the error
//								 console.log('(Possibly exception) \n' + browserLog[i].message);

								 severWarnings = true;
							 }
						 }
						 //remove it to run test case even if test case is successful
//						 expect(severWarnings).toBe(false);
					 });
				 });
		        })(accountData.invalidLengthUserCredentials[i]);
			 
			 
		 }
		 
		 i=0;
		 for (; i< accountData.invalidLengthNameCredentials.length; i++) {
			 console.log('user credentials :'+accountData.userCredentials[i].username);
			 (function(loginUserCred) {
				 it('Blank Name/Country Name', function() {
					 loginPage.get(accountData.baseUrl);
					 loginPage.login(loginUserCred);
					 accountPage.goToInvalidNameCountry(accountData.dashBoardUrl, loginUserCred, accountData.requiredFieldMsg, accountData.emptyCountryMsg);
				 });
		  
				 it('User logout', function() {
					 loginPage.logOut(accountData.dashBoardUrl);
				 });
		  
				 afterEach(function() {  
					 browser.manage().logs().get('browser').then(function(browserLog) {
						 var i = 0,
						 severWarnings = false;

						 for(i; i <= browserLog.length-1; i++){
							 if(browserLog[i].level.name === 'SEVERE'){
//								 console.log('\n' + browserLog[i].level.name);
								 //uncomment to see the error
//								 console.log('(Possibly exception) \n' + browserLog[i].message);

								 severWarnings = true;
							 }
						 }
						 //remove it to run test case even if test case is successful
//						 expect(severWarnings).toBe(false);
					 });
				 });
		        })(accountData.invalidLengthNameCredentials[i]);
			 
			 
		 }
		 i=0;
		 for (; i< accountData.changePasswordCredentials.length; i++) {
			 console.log('changePasswordCredentials credentials :'+accountData.changePasswordCredentials[i].username);
			 (function(loginUserCred) {
				 it('Change Password', function() {
					 loginPage.get(accountData.baseUrl);
					 loginPage.login(loginUserCred);
					 accountPage.goToChangePassword(accountData.dashBoardUrl, loginUserCred);
				 });
		  
				 it('User logout', function() {
					 loginPage.logOut(accountData.dashBoardUrl);
				 });
				 
				 it('Login with new password', function() {
					 loginPage.get(accountData.baseUrl);
					 var temp = loginUserCred.password;
					 loginUserCred.password = loginUserCred.newPassword;
					 loginUserCred.newPassword = temp;
					 loginPage.login(loginUserCred);
					 accountPage.goToChangePassword(accountData.dashBoardUrl, loginUserCred);
				 });
				 
				 it('User logout', function() {
					 loginPage.logOut(accountData.dashBoardUrl);
				 });
		  
				 afterEach(function() {  
					 browser.manage().logs().get('browser').then(function(browserLog) {
						 var i = 0,
						 severWarnings = false;

						 for(i; i <= browserLog.length-1; i++){
							 if(browserLog[i].level.name === 'SEVERE'){
//								 console.log('\n' + browserLog[i].level.name);
								 //uncomment to see the error
//								 console.log('(Possibly exception) \n' + browserLog[i].message);

								 severWarnings = true;
							 }
						 }
						 //remove it to run test case even if test case is successful
//						 expect(severWarnings).toBe(false);
					 });
				 });
		        })(accountData.changePasswordCredentials[i]);
			 
			 
		 }
			 
  
});