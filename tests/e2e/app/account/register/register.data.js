// user registration data
var rand = Math.floor(Math.random() * 100000);
var RegistrationData = function() {
    this.userList = [
                        {	
                            'firstname' : 'user_firstname_'+rand,
                            'lastname' : 'user_lastname_'+rand,
                            'country'  : 'India',
                            'username' : 'user_name_'+rand,
                            'email' : 'rjain'+rand+'@appirio.com',
                            'password' : 'user_password_$$'+rand
                        }
                    ],
    this.baseUrl = 'http://app.topcoder-qa.com/register/',
    this.invalidLengthHandleMessage = 'That username is not the correct length or format.',
    this.notAllowedHandleMessage = 'That username is not allowed.',
    this.alreadyTakenHandleMessage = 'That username is already taken.',
    this.invalidEmailMessage = 'Please enter a valid email address.',
    this.alreadyTakenEmailMessage = 'That email address is already taken.'
    
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
  								}
  							   ],
  this.alreadyTakenUserNameList = [{
							  'firstname' : 'user_firstname_'+rand,
						      'lastname' : 'user_lastname_'+rand,
						      'country'  : 'India',
						      'username' : 'abdul'+rand,
						      'email' : 'abdul.mansoori@appirio.com',
						      'password' : 'user_password_$$'+rand
  							}],
 this.invalidEmailUserNameList = [{
	 						'firstname' : 'user_firstname_'+rand,
						      'lastname' : 'user_lastname_'+rand,
						      'country'  : 'India',
						      'username' : 'aq'+rand,
						      'email' : 'abdul.mansoori',
						      'password' : 'user_password_$$'+rand
  							}],
 this.alreadyTakenEmailUserNameList = [{
							 'firstname' : 'user_firstname_'+rand,
							 'lastname' : 'user_lastname_'+rand,
							 'country'  : '',
							 'username' : 'aq'+rand,
							 'email' : 'abdul.mansoori@appirio.com',
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