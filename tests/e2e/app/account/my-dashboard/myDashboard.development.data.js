
// store user data in maps for ease of use and readability...
var MyDashboardData = function() {
    this.userCredentials = [
                            	{	'username' :'Iamtong',
                            		'password' :'appirio123',
                            		'challengeCount':2,
                            		'srmCount' : 3,
                            	}/*,
                            	{	'username' : 'DhananjayKumar1',
                            		'password' : 'appirio123'
                            	}*/
                           ],
    						  
    this.baseUrl = 'https://app.topcoder-dev.com/login';
    this.dashBoardUrl = 'https://app.topcoder-dev.com/my-dashboard/';
    
};
module.exports = new MyDashboardData;