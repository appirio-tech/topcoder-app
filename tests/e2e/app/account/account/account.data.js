
// store user data in maps for ease of use and readability...
var AccountData = function() {
    this.userCredentials = [
                            	{	'username' :'aqmansuri',
                            		'password' :'appirio123',
                            		'email' : 'abdul.mansoori+2@appirio.com',
                            		'newPassword' : 'appirio123$',
                            		'firstName' :'Abdul',
                            		'lastName' : 'Qadir',
                            		'address1' :'10001, Adarsh Nagar',
                            		'address2' :'Golden Transport',
                            		'city' :'Jaipur',
                            		'state' : 'RJ',
                            		'zipCode' : '302004',
                            		'country' : 'United States'
                            	}
                           ],
     this.invalidLengthUserCredentials = [
                                          {	'username' :'aqmansuri',
                                        	'password' :'appirio123',
                                        	'newPassword' : 'app',
                                          }
                                          ],    
                                          
     this.invalidLengthNameCredentials = [
                                          {	'username' :'aqmansuri',
                                        	'password' : 'appirio123',  
                                        	'firstName' :'',
                                        	'lastName' : 'Qadir',
                                        	'country' : ''
                                          }
                                          ],
    this.changePasswordCredentials = [
                                         {	'username' :'aqmansuri',
                                        	'password' : 'appirio123',  
                                        	'newPassword':'appirio123$'
                                         }
                                         ],                                       
    						  
    this.baseUrl = 'https://app.topcoder-qa.com/login',
    this.dashBoardUrl = 'https://app.topcoder-qa.com/my-dashboard/',
    this.invalidPasswordMessage = 'That password doesn\'t match the one we have on file. Please try again.',
    this.invalidHandle = 'This user does not exist.',
    this.invalidSpaceHandle = 'That password doesn\'t match the one we have on file. Please try again.',	
    this.requiredFieldMsg = 'This is a required field.',
    this.emptyCountryMsg = 'Please choose a country from the list.'
    
};
module.exports = new AccountData;