
// store user data in maps for ease of use and readability...
var LoginData = function() {
    this.userCredentials = [
                            	{	'username' :'aqmansuri',
                            		'password' :'appirio123' 
                            	},
                            	{	'username' : 'DhananjayKumar1',
                            		'password' : 'appirio123'
                            	}
                           ],
                           
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
module.exports = new LoginData;