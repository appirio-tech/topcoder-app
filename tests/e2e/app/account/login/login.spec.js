// spec.js
 var loginPage = require('./login.object');
 var loginUser = require('./login.data');
 
 
 
	 describe('login', function() {
		 console.log(loginUser.userCredentials.length);
		 var i=0;
		 /*for (; i< loginUser.userCredentials.length; i++) {
			 console.log('user creds :'+loginUser.userCredentials[i].username);
			 (function(loginUserCred) {
				 it('welcomes the user', function() {
					 loginPage.get(loginUser.baseUrl);
					 loginPage.login(loginUserCred);
				 });
		  
				 it('welcomes the user for logout', function() {
					 loginPage.logOut();
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
		        })(loginUser.userCredentials[i]);
			 
			 
		 }
		 
		for(;i < loginUser.twitterCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Welcomes the user', function() {
					 console.log('loginUser.baseUrl'+loginUser.baseUrl);
//					 console.log('loginUserCred'+loginUserCred.username);
					 loginPage.get(loginUser.baseUrl);
					 loginPage.twitterLogin(loginUserCred);
				 });
		  
//				 it('Twitter user logout', function() {
//					 loginPage.logOut();
//				 });

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
			 })(loginUser.twitterCredentials[i]);
		 }
		
		for(;i < loginUser.fbCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Welcomes the Facebook user', function() {
					 console.log('loginUser.baseUrl'+loginUser.baseUrl);
					 loginPage.get(loginUser.baseUrl);
					 loginPage.fbLogin(loginUserCred);
				 });
		  
				 it('Facebook User logout', function() {
					 loginPage.logOut();
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
				 
				 
			 })(loginUser.fbCredentials[i]);
		 }
		
		for(;i < loginUser.googleCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Welcomes the Google user', function() {
					 console.log('loginUser.baseUrl'+loginUser.baseUrl);
					 loginPage.get(loginUser.baseUrl);
					 loginPage.googleLogin(loginUserCred);
				 });
		  
				 it('Google user logout', function() {
					 loginPage.logOut();
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
			 })(loginUser.googleCredentials[i]);
		 }
		*/
		
		for(;i < loginUser.gitCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Welcomes the Git user', function() {
					 console.log('loginUser.baseUrl'+loginUser.baseUrl);
					 loginPage.get(loginUser.baseUrl);
					 loginPage.gitLogin(loginUserCred);
				 });
		  
				 it('Git user logout', function() {
					 loginPage.logOut();
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
			 })(loginUser.gitCredentials[i]);
		 }
			 
  
});