// spec.js
 var profilePage = require('./profile.object');
 var profileData = require('./profile.data');
 var loginPage = require('../login/login.object');
 var loginData = require('../login/login.data');
 
 
	 describe('Profile Login', function() {
		 var i=0;
		 for (; i< profileData.profileUpdateInfo.length; i++) {
			 (function(loginUserCred) {
				 it('My Profile', function() {
					 loginPage.get(profileData.baseUrl);
					 loginPage.login(loginUserCred);
					 profilePage.goToProfilePage(profileData.dashBoardUrl, loginUserCred);
				 });
		  
				 it('welcomes the user for logout', function() {
					 loginPage.logOut(profileData.dashBoardUrl);
				 });
		  
		        })(profileData.profileUpdateInfo[i]);
		 }
		 
		 
		 
		 i=0;
		 for (; i< profileData.profileUpdateInfo.length; i++) {
			 console.log('user creds :'+profileData.profileUpdateInfo[i].username);
			 (function(loginUserCred) {
				 it('Profile Left Panel Verfication', function() {
					 loginPage.get(profileData.baseUrl);
					 loginPage.login(loginUserCred);
					 profilePage.verifyProfileChanges(profileData.dashBoardUrl, loginUserCred);
				 });
				 
				 it('Profile Skill Verification', function() {
					 profilePage.verifyProfileSkill(profileData.dashBoardUrl, loginUserCred, profileData);
				 });
				 
				 it('Profile External Links', function() {
					 profilePage.verifyExternalLinks(profileData.dashBoardUrl, loginUserCred, profileData);
				 });
				 
				 it('Profile SubTrack Page Check', function() {
					 profilePage.verifySubTrackPage(profileData.dashBoardUrl, loginUserCred, profileData);
				 });
		  
				 it('My Profile Logout', function() {
					 loginPage.logOut(profileData.dashBoardUrl);
				 });
		  
		        })(profileData.profileUpdateInfo[i]);
			 
			 
		 }
		 
		 
		 i=0;
		 for (; i< profileData.skillUserCred.length; i++) {
			 console.log('user creds :'+profileData.skillUserCred[i].username);
			 (function(loginUserCred) {
				 it('Profile Skill Update', function() {
					 loginPage.get(profileData.baseUrl);
					 loginPage.login(loginUserCred);
					 profilePage.goToProfileSkill(profileData.dashBoardUrl, loginUserCred);
				 });
		  
				 it('welcomes the user for logout', function() {
					 loginPage.logOut(profileData.dashBoardUrl);
				 });
		  
		        })(profileData.skillUserCred[i]);
			 
			 
		 }
		 
});