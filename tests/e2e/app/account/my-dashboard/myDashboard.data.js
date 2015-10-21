
// store user data in maps for ease of use and readability...
var MyDashboardData = function() {
    this.userCredentials = [
                            	{	'username' :'Iamtong',
                            		'password' :'appirio123',
                            		'email' : 'abdul.mansoori+2@appirio.com',
                            		'newpassword' : 'appirio123$',
                            		'firstName' :'Abdul',
                            		'lastName' : 'Qadir',
                            		'address1' :'10001, Adarsh Nagar',
                            		'address2' :'Golden Transport',
                            		'city' :'Jaipur',
                            		'state' : 'RJ',
                            		'zipCode' : '302004',
                            		'country' : 'United States',
                            		
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