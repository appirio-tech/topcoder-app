
// store user data in maps for ease of use and readability...
var ProfileData = function() {
 
	
	this.designActivityType = [
	                           'WEB DESING',
	                           'DESIGN FIRST2FINISH',
	                           'LOGO DESIGN',
	                           'BANNERS / ICONS',
	                           'APPLICATION FRONT-END DESIGN',
	                           'WIDGET OR MOBILE SCREEN DESIGN',
	                           'FRONT-END FLASH',
	                           'PRINT / PRESENTATION',
	                           'STUDIO OTHER',
	                           'WIREFRAMES',
	                           'IDEA GENERATION'
	                           ],
	this.developmentActivityType  =['SPECIFICATION',
	                                'DEVELOPMENT',
	                                'DESIGN',
	                                'ASSEMBLY'
//	                                'SPECIFICATION',
//	                                'DEVELOPMENT',
//	                                'DESIGN'
	                               ],                         
	                           
  this.developmentActivityTypeOld = [
	'Software Conceptualization',
	'Software Specification',
	'Architecture',
	'Component Design',
	'Component Development',
	'RIA Component',
	'RIA Build',
	'UI Prototype',
	'Software Assembly',
	'Test Suites',
	'Test Scenarios',
	'Content Creation',
	'Reporting',
	'Bug Hunt',
	'First2Finish',
	'Code'
	],	   
	
	this.dataActivityType = ['SRM', 'MARATHON MATCH' ],
	this.copilotActivityType = ['COPILOT'],
	this.copilotActivityTypeTag = 'FULFILLMENT',	
	this.developeActivityTypeTag = 'RATING',
	this.designActivityTypeTag = 'WINS',
	this.dataActivityTypeTag = 'RATING',
		
	
	                           
    this.profileUpdateInfo = [
                              {	'username' :'vikasrohit',
                          		'password' :'appirio123', 
                          		'profilePicDir':'/Volumes/data',
                          		'profilePicFile': 'profilePic.jpg',
                          		'country'  :'British Indian Ocean Territory',
                          		'shortBio' :'Trying to be TopCoder..',
                          		'design'   :'n',
                          		'development' : 'n',
                          		'dataScience' : 'n',
                          		'copilot' : 'n',
                          		'githubUserName' : 'aqmansuri',
                          		'githubPassword' : 'appirio123',
                          		'skillSet' : ['.NET', 'ADO.NET', 'Advanced Math', 'Ajax','Brute Force',
                          		              'C#', 'CSS', 'Dynamic Programming', 'Eclipse', 'EJB',
                          		              'Scala', 'Java','JavaScript'],
                          		'externalLinks' : ['stackoverflow', 'bitbucket', 'github', 'globe'],
                          		'totalWins' : '7 WINS',
                          		'tenure' : 'MEMBER SINCE JULY, 2007'
                          	}/*,
                              {	'username' :'Iamtong',
		'password' :'appirio123', 
		'profilePicDir':'/Volumes/data',
		'profilePicFile': 'profilePic.jpg',
		'country'  :'UNITED ARAB EMIRATES',
		'shortBio' :'hirr',
		'design'   :'y',
		'development' : 'y',
		'dataScience' : 'y',
		'githubUserName' : 'aqmansuri',
		'githubPassword' : 'appirio123',
		'skillSet' : ['Scala', 'Unit-Testing'],
        'externalLinks' : ['github'],
        'totalWins' : '135 WINS',
        'tenure' : 'MEMBER SINCE MAY, 2009'
	},
                              
//                              , 
                              
                              
                            	{	'username' :'aqmansuri',
                            		'password' :'appirio123', 
                            		'profilePicDir':'/Volumes/data',
                            		'profilePicFile': 'profilePic.jpg',
                            		'country'  :'BRITISH INDIAN OCEAN TERRITORY',
                            		'shortBio' :'1',
                            		'design'   :'y',
                            		'development' : 'y',
                            		'dataScience' : 'y',
                            		'githubUserName' : 'aqmansuri',
                            		'githubPassword' : 'appirio123',
                            		'copilot' : 'n',
                              		'githubUserName' : 'aqmansuri',
                               		'githubPassword' : 'appirio123',
                               		'skillSet' : [],
                               		'externalLinks' : [],
                              		'totalWins' : '',
                               		'tenure' : 'MEMBER SINCE DECEMBER, 2013',
                               		'challengeParticipation' :'n'
                            			
                            			
                            	}/*,
                            	{	'username' : 'DhananjayKumar1',
                            		'password' : 'appirio123'
                            	}*/
                           ],
                           
   this.skillUserCred = [
                        {
                        'username' :'aqmansuri',
                		'password' :'appirio123',
                        'skillSet' : [ 'Dynamic Programmin', 'Javascript'],
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