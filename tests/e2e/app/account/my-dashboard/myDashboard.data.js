
// store user data in maps for ease of use and readability...
var MyDashboardData = function() {
    this.userCredentials = [
                            	{
                            		'username' : 'aqmansuri',
                            		'password' : 'appirio123'
                            	}
                            	
                            	
                            	/*{	'username' :'Iamtong',
                            		'password' :'appirio123',
                            		'challengeCount':2,
                            		'srmCount' : 3,
                            	},
                            	{	'username' : 'DhananjayKumar1',
                            		'password' : 'appirio123'
                            	}*/
                           ],
    						  
    this.baseUrl = 'https://app.topcoder-qa.com/login';
    this.dashBoardUrl = 'https://app.topcoder-qa.com/my-dashboard/';
    
};
module.exports = new MyDashboardData;