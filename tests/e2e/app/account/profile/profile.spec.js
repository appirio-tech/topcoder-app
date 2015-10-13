// spec.js
 var profilePage = require('./profile.object');
 var profileData = require('./profile.data');
 var loginPage = require('../login/login.object');
 var loginData = require('../login/login.data');
 
 
	 describe('Profile Login', function() {
		 console.log(profileData.userCredentials.length);
		 var i=0;
		 for (; i< profileData.userCredentials.length; i++) {
			 console.log('user creds :'+profileData.userCredentials[i].username);
			 (function(loginUserCred) {
				 it('welcomes the user', function() {
					 loginPage.get(profileData.baseUrl);
					 loginPage.login(loginUserCred);
					 profilePage.goToProfilePage(profileData.dashBoardUrl, loginUserCred);
				 });
		  
				 it('welcomes the user for logout', function() {
//					 loginPage.logOut(profileData.dashBoardUrl);
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
		        })(profileData.userCredentials[i]);
			 
			 
		 }

		 /*i=0;
		for(;i < loginUser.gitCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Welcomes the Git user', function() {
					 console.log('loginUser.baseUrl'+loginUser.baseUrl);
					 profilePage.get(loginUser.baseUrl);
					 profilePage.gitLogin(loginUserCred);
				 });
		  
				 it('Git user logout', function() {
					 profilePage.logOut(loginUser.dashBoardUrl);
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