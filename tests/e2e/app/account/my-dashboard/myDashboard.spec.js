// spec.js
 var myDashboardPage = require('./myDashboard.object');
 var myDashboardData = require('./myDashboard.data');
 var loginPage = require('../login/login.object');
 var loginData = require('../login/login.data');
 
 
	 describe('Account Login', function() {
		 console.log(myDashboardData.userCredentials.length);
//		 console.log(myDashboardData.baseUrl);
		 var i=0;
		 for (; i< myDashboardData.userCredentials.length; i++) {
			 console.log('user creds :'+myDashboardData.baseUrl);
			 (function(loginUserCred) {
				 it('Dashboard first part', function() {
					 loginPage.get(myDashboardData.baseUrl);
					 loginPage.login(loginUserCred);
//					 myDashboardPage.goToDashboardPage(myDashboardData.dashBoardUrl, loginUserCred);
					 myDashboardPage.goToEmptyDashboardPage(myDashboardData.dashBoardUrl, loginUserCred);
				 });
		  
		  
//				 it('Dashboard srm and rest links', function() {
//					 loginPage.get(myDashboardData.baseUrl);
//					 loginPage.login(loginUserCred);
//					 myDashboardPage.goToDahsboardRestLinks(myDashboardData.dashBoardUrl, loginUserCred);
//				 });
		  
				 it('welcomes the user for logout', function() {
					 loginPage.logOut(myDashboardData.dashBoardUrl);
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
		        })(myDashboardData.userCredentials[i]);
			 
			 
		 }

			 
  
});