// user registration data
var rand = Math.floor(Math.random() * 100000);
var RegistrationData = function() {
    this.userList = [
                        {	
                            'firstname' : 'user_firstname_'+rand,
                            'lastname' : 'user_lastname_'+rand,
                            'country'  : 'India',
                            'username' : 'user_name_'+rand,
                            'email' : 'abdul.mansoori+'+rand+'@appirio.com',
                            'password' : 'appirio123'
                        },
                        {	
                            'firstname' : 'user_firstname_1'+rand,
                            'lastname' : 'user_lastname_1'+rand,
                            'country'  : 'India',
                            'username' : 'user_name1'+rand,
                            'email' : 'abdul.mansoori+'+rand+'1@appirio.com',
                            'password' : 'appirio123'
                        }
                    ],
    this.baseUrl = 'http://app.topcoder-qa.com/register/',
    this.invalidLengthHandleMessage = 'That username is not the correct length or format.',
    this.notAllowedHandleMessage = 'That username is not allowed.',
    this.alreadyTakenHandleMessage = 'That username is already taken.',
    this.invalidEmailMessage = 'Please enter a valid email address.',
    this.alreadyTakenEmailMessage = 'That email address is already taken.',
    this.regSuccess = 'Thanks for joining Topcoder.\nWe\'ve sent you a confirmation link. Please check your email and click the link to activate your account. If you can\'t find the message, please email support@topcoder.com.',
    
    this.invalidLengthUserNameList = [{
    							'firstname' : 'user_firstname_'+rand,
                                'lastname' : 'user_lastname_'+rand,
                                'country'  : 'India',
                                'username' : 'abdul.mansoori12345',
                                'email' : 'abdul'+rand+'@appirio.com',
                                'password' : 'user_password_$$'+rand	
    						}, {
    							'firstname' : 'user_firstname_'+rand,
                                'lastname' : 'user_lastname_'+rand,
                                'country'  : 'India',
                                'username' : 'a',
                                'email' : 'abdul'+rand+'@appirio.com',
                                'password' : 'user_password_$$'+rand	
    						}
    					],
  this.notAllowedUserNameList = [{
	  							'firstname' : 'user_firstname_'+rand,
                                'lastname' : 'user_lastname_'+rand,
                                'country'  : 'India',
                                'username' : 'ass',
                                'email' : 'abdul'+rand+'@appirio.com',
                                'password' : 'user_password_$$'+rand
  								},
  								{
  		  							'firstname' : 'user_firstname'+rand,
  	                                'lastname' : 'user_lastname'+rand,
  	                                'country'  : 'India',
  	                                'username' : 'ass',
  	                                'email' : 'abdul'+rand+'1@appirio.com',
  	                                'password' : 'user_password_$$'+rand
  	  								}
  							   ],
  this.alreadyTakenUserNameList = [{
							  'firstname' : 'user_firstname_'+rand,
						      'lastname' : 'user_lastname_'+rand,
						      'country'  : 'India',
						      'username' : 'aqmansuri',
						      'email' : 'abdul'+rand+'@appirio.com',
						      'password' : 'user_password_$$'+rand
  								},
  								{
  								  'firstname' : 'user_firstname'+rand,
  							      'lastname' : 'user_lastname'+rand,
  							      'country'  : 'India',
  							      'username' : 'Iamtong',
  							      'email' : 'abdul'+rand+'@appirio.com',
  							      'password' : 'user_password_$'+rand
  	  							}
  							],
 this.invalidEmailUserNameList = [{
	 						'firstname' : 'user_firstname_'+rand,
						      'lastname' : 'user_lastname_'+rand,
						      'country'  : 'India',
						      'username' : 'aq'+rand,
						      'email' : 'abdul.mansoori',
						      'password' : 'user_password_$$'+rand
  							},{
  		 						'firstname' : 'user_firstname_'+rand,
  						      'lastname' : 'user_lastname_'+rand,
  						      'country'  : 'India',
  						      'username' : 'aq'+rand,
  						      'email' : 'aqmansuri',
  						      'password' : 'user_password_$$'+rand
    							}
  							],
 this.alreadyTakenEmailUserNameList = [{
							 'firstname' : 'user_firstname_'+rand,
							 'lastname' : 'user_lastname_'+rand,
							 'country'  : 'India',
							 'username' : 'aq'+rand,
							 'email' : 'abdul.mansoori@appirio.com',
							 'password' : 'user_password_$$'+rand
						 },{
							 'firstname' : 'user_firstname_'+rand,
							 'lastname' : 'user_lastname_'+rand,
							 'country'  : 'India',
							 'username' : 'aq'+rand,
							 'email' : 'ted@cloudworks-qa.com',
							 'password' : 'user_password_$$'+rand
						 }];	
 this.githubUserList = [{
		 'firstname' : 'user_firstname_'+rand,
		 'lastname' : 'user_lastname_'+rand,
		 'country'  : 'India',
		 'username' : 'aq'+rand,
		 'email' : 'abdul.mansoori@appirio.com',
		 'password' : 'user_password_$$'+rand,
		 'githubUsername' : 'abdul-auto',
		 'githubPassword' : 'appirio123$'
	 }];	    
    
    
};
module.exports = new RegistrationData;