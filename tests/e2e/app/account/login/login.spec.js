// spec.js
 var loginPage = require('./login.object');
 var loginUser = require('./login.data');
 
 
 
	 describe('login', function() {
		 console.log(loginUser.userCredentials.length);
		 var i=0;
		 for (; i< loginUser.userCredentials.length; i++) {
			 console.log('user creds :'+loginUser.userCredentials[i].username);
			 (function(loginUserCred) {
				 it('welcomes the user', function() {
					 loginPage.get(loginUser.baseUrl);
					 loginPage.login(loginUserCred);
				 });
		  
				 it('welcomes the user for logout', function() {
					 loginPage.logOut(loginUser.dashBoardUrl);
				 });
		  
		        })(loginUser.userCredentials[i]);
			 
			 
		 }
		 i=0;
		 for (; i< loginUser.wrongPasswordCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Invalid Password Login', function() {
					 loginPage.get(loginUser.baseUrl);
					 loginPage.invalidPasswordLogin(loginUserCred, loginUser.invalidPasswordMessage);
				 });
		  
		        })(loginUser.wrongPasswordCredentials[i]);
			 
			 
		 }
		 
		 i=0;
		 for (; i< loginUser.notExisitingCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Invalid username Login', function() {
					 loginPage.get(loginUser.baseUrl);
					 loginPage.invalidUserNameLogin(loginUserCred, loginUser.invalidHandle);
				 });
		  
		  
		        })(loginUser.notExisitingCredentials[i]);
			 
			 
		 }

		 i=0;
		 for (; i< loginUser.spaceUserCredentials.length; i++) {
			 console.log('user creds :'+loginUser.spaceUserCredentials[i].username);
			 (function(loginUserCred) {
				 it('welcomes the user', function() {
					 loginPage.get(loginUser.baseUrl);
					 loginPage.invalidSpaceHandleLogin(loginUserCred, loginUser.invalidSpaceHandle);
				 });
		  
		        })(loginUser.spaceUserCredentials[i]);
			 
			 
		 }
		 
		 i=0;
		for(;i < loginUser.twitterCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Twitter login', function() {
					 loginPage.get(loginUser.baseUrl);
					 loginPage.twitterLogin(loginUserCred);
				 });
		  
				 it('Twitter user logout', function() {
					 loginPage.logOut(loginUser.dashBoardUrl);
				 });

			 })(loginUser.twitterCredentials[i]);
		 }
		i=0;
		for(;i < loginUser.fbCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Facebook login', function() {
					 loginPage.get(loginUser.baseUrl);
					 loginPage.fbLogin(loginUserCred);
				 });
		  
				 it('Facebook User logout', function() {
					 loginPage.logOut(loginUser.dashBoardUrl);
				 });
				 
			 })(loginUser.fbCredentials[i]);
		 }
		i=0;
		for(;i < loginUser.googleCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Google Login', function() {
					 loginPage.get(loginUser.baseUrl);
					 loginPage.googleLogin(loginUserCred);
				 });
		  
				 it('Google user logout', function() {
					 loginPage.logOut(loginUser.dashBoardUrl);
				 });
				 
			 })(loginUser.googleCredentials[i]);
		 }
		
		i=0;
		for(;i < loginUser.gitCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Welcomes the Git user', function() {
					 loginPage.get(loginUser.baseUrl);
					 loginPage.gitLogin(loginUserCred);
				 });
		  
				 it('Git user logout', function() {
					 loginPage.logOut(loginUser.dashBoardUrl);
				 });
				 
			 })(loginUser.gitCredentials[i]);
		 }
			 
  
});