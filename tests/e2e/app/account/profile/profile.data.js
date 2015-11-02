
// store user data in maps for ease of use and readability...
var ProfileData = function() {
    this.userCredentials = [
                            	{	'username' :'aqmansuri',
                            		'password' :'appirio123', 
                            		'profilePicDir':'/Volumes/data',
                            		'profilePicFile': 'profilePic.jpg',
                            		'country'  :'India',
                            		'shortBio' :'1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456',
                            		'design'   :'y',
                            		'development' : 'y',
                            		'dataScience' : 'y',
                            		'githubUserName' : 'aqmansuri',
                            		'githubPassword' : 'appirio123'
                            	}/*,
                            	{	'username' : 'DhananjayKumar1',
                            		'password' : 'appirio123'
                            	}*/
                           ],
                           
   this.skillUserCred = [
                        {
                        'username' :'aqmansuri',
                		'password' :'appirio123',
                        'skillSet' : [ 'J', 'Javascript'],
                        'gitUserName' :'abdul-auto',
                        'gitPassword' : 'appirio123'
                        
   						}
                        ]
                           
    this.wrongPasswordCredentials= [
                                    {
                                    	'username' : 'aqmansuri',
                                    	'password' : 'appirio123$'
                                    },
                                    {
                                    	'username' : 'DhananjayKumar1',
                                    	'password' : 'wrongpassword'
                                    }
                                    ],
   this.notExisitingCredentials = [
                                   {
                                	   'username' : 'aqmansurinotexist',
                                		'password':'notexist'   
                                   },
                                   {
                                	   'username' : 'DhananjayKumar1notexist',
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
  								'username' : 'topcoderpuneet4@gmail.com',
								'password' : 'LavaIris123'
							   }
  						 ],
  						 
  	this.gitCredentials = [ {
  								'username' : 'auto-user9',
  								'password' : 'appirio123$'
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
  						  	
  						  	
    						  
    						  
    this.baseUrl = 'https://app.topcoder-qa.com/login';
    this.dashBoardUrl = 'https://app.topcoder-qa.com/my-dashboard/';
    this.invalidPasswordMessage = 'That password doesn\'t match the one we have on file. Please try again.';
    this.invalidHandle = 'This user does not exist.'
    this.invalidSpaceHandle = 'That password doesn\'t match the one we have on file. Please try again.'	
    
};
module.exports = new ProfileData;