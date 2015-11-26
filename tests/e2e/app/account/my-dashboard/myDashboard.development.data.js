
// store user data in maps for ease of use and readability...
var MyDashboardData = function() {
    this.emptyUserCredentials = [
                            	{
                            		'username' : 'aqmansuri',
                            		'password' : 'appirio123'
                            	}
                            ],
                            
     this.userCredentials = [                            
                                  {	'username' :'Iamtong',
                            		'password' :'appirio123',
                            		'developement': true,
                            		'challengeCount':2,
                            		'srmCount' : 3,
                            		'moneyEarned':'$564,381',
                            		'carouselCheck' : 'y',
                            		'emptyCarousel' : false,
                            		'totalCarouselItems' : 11
                            		
                                  }
                                  /*,
                            	{	'username' : 'DhananjayKumar1',
                            		'password' : 'appirio123'
                            	}*/
                           ],
    						  
    this.baseUrl = 'https://app.topcoder-qa.com/login',
    this.dashBoardUrl = 'https://app.topcoder-qa.com/my-dashboard/',
    this.myChallengesViewMore = '/my-challenges/?status=active',
    this.myChallengesPast = '/my-challenges/?status=completed',
    this.pastSrms = '/my-srms/';
    
    
};
module.exports = new MyDashboardData;