
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
    						  
    this.baseUrl = 'https://app.topcoder-qa.com/login';
    this.dashBoardUrl = 'https://app.topcoder-qa.com/my-dashboard/';
    this.invalidPasswordMessage = 'That password doesn\'t match the one we have on file. Please try again.';
    this.invalidHandle = 'This user does not exist.'
    this.invalidSpaceHandle = 'That password doesn\'t match the one we have on file. Please try again.'	
    
};
module.exports = new MyDashboardData;