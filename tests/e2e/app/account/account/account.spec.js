// spec.js
 var accountPage = require('./account.object');
 var accountData = require('./account.data');
 var loginPage = require('../login/login.object');
 var loginData = require('../login/login.data');
 
 
	 describe('Account Login', function() {
		 console.log(accountData.userCredentials.length);
		 var i=0;
		 for (; i< accountData.userCredentials.length; i++) {
			 console.log('user creds :'+accountData.userCredentials[i].username);
			 (function(loginUserCred) {
				 it('welcomes the user', function() {
					 loginPage.get(accountData.baseUrl);
					 loginPage.login(loginUserCred);
					 accountPage.goToAccountPage(accountData.dashBoardUrl, loginUserCred);
				 });
		  
				 it('welcomes the user for logout', function() {
//					 loginPage.logOut(accountData.dashBoardUrl);
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

		 /*i=0;
		for(;i < loginUser.gitCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Welcomes the Git user', function() {
					 console.log('loginUser.baseUrl'+loginUser.baseUrl);
					 accountPage.get(loginUser.baseUrl);
					 accountPage.gitLogin(loginUserCred);
				 });
		  
				 it('Git user logout', function() {
					 accountPage.logOut(loginUser.dashBoardUrl);
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
			 })(loginUser.gitCredentials[i]);
		 }*/
			 
  
});