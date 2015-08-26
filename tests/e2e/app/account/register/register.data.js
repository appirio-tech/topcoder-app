// user registration data
var rand = Math.floor(Math.random() * 100000);
var RegistrationData = function() {
    this.userList = [
                        {	
                            'firstname' : 'user_firstname_'+rand,
                            'lastname' : 'user_lastname_'+rand,
                            'country'  : '',
                            'username' : 'user_name_'+rand,
                            'email' : 'rjain'+rand+'@appirio.com',
                            'password' : 'user_password_$$'+rand
                        }
                    ],
    this.baseUrl = 'http://app.topcoder-dev.com/register/';
    
};
module.exports = new RegistrationData;