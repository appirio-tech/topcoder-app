// spec.js
 var myDashboardPage = require('./myDashboard.object');
 var myDashboardData = require('./myDashboard.data');
 var loginPage = require('../login/login.object');
 var loginData = require('../login/login.data');
 
 
	 describe('Dasboard', function() {

		 var i=0;
		 for (; i< myDashboardData.userCredentials.length; i++) {
			 (function(loginUserCred) {
				 it('Dashboard Header Carousel', function() {
					 loginPage.get(myDashboardData.baseUrl);
					 loginPage.login(loginUserCred);
					 myDashboardPage.carouselDashboard(myDashboardData.dashBoardUrl, loginUserCred);
				 });
				 
				 it('Dashboard My Challenges', function() {
					 myDashboardPage.myChallengesDashboard(myDashboardData.dashBoardUrl, myDashboardData, loginUserCred);
				 });
				 
				 it('DashBoardLogout', function() {
					 loginPage.logOut(myDashboardData.dashBoardUrl);
				 });
		  
		  
				 it('Dashboard SRM Links', function() {
					 loginPage.get(myDashboardData.baseUrl);
					 loginPage.login(loginUserCred);
					 myDashboardPage.goToSrmLinks(myDashboardData.dashBoardUrl, myDashboardData, loginUserCred);
				 });
				 
				 it('Dashboard IOS Challenges', function() {
					 myDashboardPage.goToIosChallenges(myDashboardData.dashBoardUrl, loginUserCred);
				 });
				 
				 it('DashBoard Logout', function() {
					 loginPage.logOut(myDashboardData.dashBoardUrl);
				 });
				 
			 })(myDashboardData.userCredentials[i]);
		 }
		  
		 i=0;
			 for (; i< myDashboardData.emptyUserCredentials.length; i++) {
				 (function(loginUserCred) {
				 it('Empty Dashboard srm and rest links', function() {
					 loginPage.get(myDashboardData.baseUrl);
					 loginPage.login(loginUserCred);
					 myDashboardPage.goToEmptyDahsboardRestLinks(myDashboardData.dashBoardUrl, loginUserCred);
				 });
				 
				 it('welcomes the user for logout', function() {
					 loginPage.get(myDashboardData.baseUrl);
					 loginPage.logOut(myDashboardData.dashBoardUrl);
				 });
				 
				 it('Empty Dashboard srm and rest links', function() {
					 loginPage.get(myDashboardData.baseUrl);
					 loginPage.login(loginUserCred);
					 myDashboardPage.goToEmptyDashboardRestLinks(myDashboardData.dashBoardUrl, loginUserCred);
				 });
		  
				 it('Empty DashBoard Logout', function() {
					 loginPage.logOut(myDashboardData.dashBoardUrl);
				 });
				 
		        })(myDashboardData.emptyUserCredentials[i]);
			 
			 
		 }

			 
  
});