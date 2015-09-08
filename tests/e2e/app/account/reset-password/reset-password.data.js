
// store user data in maps for ease of use and readability...
var ResetPasswordData = function() {
    this.userNameList = [
                            	{	'username' :'abdul.mansoori@appirio.com'
                            	},
                            	{	'username' : 'DhananjayKumar1'
                            	}
                           ],
                           
    this.notExistingUserList = [ 	
                              	{
                              		'username' : 'aqmansuri1123@gmail.com'
    							},
    							{
    								'username' : 'aqmansuri334@gmail.com'
    							}
                             ]
    this.passwordAlreadySentUserList = [ 	
                              	{
                              		'username' : 'abdul.mansoori@appirio.com'
    							}/*,
    							{
    								'username' : 'abdul.mansoori@appirio.com'
    							}*/
                             ]
    this.notExistingUserMessage = 'We couldn\'t find a member with that email address. Please check that you entered it correctly. If you continue to have trouble, please contact',
    this.passwordAlreadySent='You already requested a reset link recently. Please check your inbox or spam folder. If you have any trouble, please contact',
                           
    this.twitterCredentials = [ {
    								'username' : 'ChristinoBolder',
    								'password' : 'Appirio123'
    							}
    						  ],
    						  
    this.fbCredentials = [ {
  								'username' : 'topcoderpuneet4@gmail.com',
  								'password' : 'LavaIris123'
  							   }
    					 ],
  						  	
  	this.googleCredentials = [ {
  								'username' : 'topcoderpuneet4@gmail.com',
								'password' : 'LavaIris123'
							   }
  						 ],
  						 
  	this.gitCredentials = [ {
  								'username' : 'auto-user9',
  								'password' : 'appirio123$'
  								}
  							],					 
  						  	
  						  	
    						  
    						  
    this.baseUrl = 'http://app.topcoder-dev.com/login';
    
};
module.exports = new ResetPasswordData;