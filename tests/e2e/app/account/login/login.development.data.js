
// store user data in maps for ease of use and readability...
var LoginData = function() {
    this.userCredentials = [
//                            	{	'username' :'aqmansuri',
//                            		'password' :'appirio123' 
//                            	},
                            	{	'username' : 'DhananjayKumar1',
                            		'password' : 'appirio123'
                            	}
                           ],
                           
    this.wrongPasswordCredentials= [
                                    /*{
                                    	'username' : 'aqmansuri',
                                    	'password' : 'appirio123$'
                                    },*/
                                    {
                                    	'username' : 'DhananjayKumar1',
                                    	'password' : 'wrongpassword'
                                    }
                                    ],
   this.notExisitingCredentials = [
                                   {
                                	   'username' : 'aqmansuri1122q',
                                		'password':'notexist'   
                                   },
                                   {
                                	   'username' : 'aqmansuri1122qa',
                                	   'password' : 'notexist'
                                   }
                                   
                                   ]                                    
                           
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
  								'username' : 'ted@cloudworks-qa.com',
								'password' : 'Appirio#123'
							   }
  						 ],
  						 
  	this.gitCredentials = [ {
  								'username' : 'abdul-auto',
  								'password' : 'appirio123'
  								}
  							],	
  							
  this.spaceUserCredentials = [ {
	  							'username' : 'aq mansuri',
	  							'password' : 'appirio123'
  						},
  						{
  							    'username' :'Dhananjay Kumar1',
  							    'password' : 'appirio123'
  						}
  						],							
  						  	
  						  	
    						  
    						  
    this.baseUrl = 'http://www.topcoder-qa.com/login',
    this.dashBoardUrl = 'https://www.topcoder-qa.com/my-dashboard/',
    this.invalidPasswordMessage = 'That password is incorrect. Please check that you entered the right one.',
    this.invalidHandle = 'We couldn\'t find a member with that username. Please check that you entered it correctly.',
    this.invalidSpaceHandle = 'That password doesn\'t match the one we have on file. Please try again.'	
    
};
module.exports = new LoginData;