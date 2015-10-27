
// store user data in maps for ease of use and readability...
var AccountData = function() {
    this.userCredentials = [
                            	{	'username' :'aqmansuri',
                            		'password' :'appirio123',
                            		'email' : 'abdul.mansoori+2@appirio.com',
                            		'newpassword' : 'appirio123$',
                            		'firstName' :'Abdul',
                            		'lastName' : 'Qadir',
                            		'address1' :'10001, Adarsh Nagar',
                            		'address2' :'Golden Transport',
                            		'city' :'Jaipur',
                            		'state' : 'Rajasthan',
                            		'zip' : '302004',
                            		'country' : 'India'
                            	}/*,
                            	{	'username' : 'DhananjayKumar1',
                            		'password' : 'appirio123'
                            	}*/
                           ],
                           
                           this.invalidLengthUserCredentials = [
                                               	{	'username' :'aqmansuri',
                                               		'password' :'appirio123',
                                               		'email' : 'abdul.mansoori+2@appirio.com',
                                               		'newpassword' : 'app',
                                               		'firstName' :'Abdul',
                                               		'lastName' : 'Qadir',
                                               		'address1' :'10001, Adarsh Nagar',
                                               		'address2' :'Golden Transport',
                                               		'city' :'Jaipur',
                                               		'state' : 'Rajasthan',
                                               		'zip' : '302004',
                                               		'country' : 'India'
                                               	}/*,
                                               	{	'username' : 'DhananjayKumar1',
                                               		'password' : 'appirio123'
                                               	}*/
                                              ],
    this.baseUrl = 'https://beta.topcoder.com/login';
    this.dashBoardUrl = 'https://beta.topcoder.com/my-dashboard/';
    this.invalidPasswordMessage = 'That password doesn\'t match the one we have on file. Please try again.';
    this.invalidHandle = 'This user does not exist.'
    this.invalidSpaceHandle = 'That password doesn\'t match the one we have on file. Please try again.'	
    
};
module.exports = new AccountData;