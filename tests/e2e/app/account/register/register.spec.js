var regPage = require('./register.object');
var regUser = require('./register.data');

describe('registerUser', function(){
	i=0;
	for(;i < regUser.userList.length; i++) {
		 (function(regUserCred) {
			 it('Register New User', function() {
				 regPage.get(regUser.baseUrl);
				 regPage.register(regUserCred, regUser.regSuccess);
			 });
		 })(regUser.userList[i]);
	 }
	
	i=0;
	for(;i < regUser.invalidLengthUserNameList.length; i++) {
		 (function(regUserCred) {
			 it('register Invalid Length Handle ', function() {
				 regPage.get(regUser.baseUrl);
				 regPage.registerInvalidLengthHandle(regUserCred, regUser.invalidLengthHandleMessage);
			 });
		 })(regUser.invalidLengthUserNameList[i]);
	 }
	
	i=0;
	for(;i < regUser.notAllowedUserNameList.length; i++) {
		 (function(regUserCred) {
			 it('Register not allowed handle ', function() {
				 regPage.get(regUser.baseUrl);
				 regPage.registerNotAllowedHandle(regUserCred, regUser.notAllowedHandleMessage);
			 });
		 })(regUser.notAllowedUserNameList[i]);
	 }
	
	i=0;
	for(;i < regUser.alreadyTakenUserNameList.length; i++) {
		 (function(regUserCred) {
			 it('register already taken handle ', function() {
				 regPage.get(regUser.baseUrl);
				 regPage.registerAlreadyTakenHandles(regUserCred, regUser.alreadyTakenHandleMessage);
			 });
		 })(regUser.alreadyTakenUserNameList[i]);
	 }
	i=0;
	for(;i < regUser.invalidEmailUserNameList.length; i++) {
		 (function(regUserCred) {
			 it('register invalid email ', function() {
				 regPage.get(regUser.baseUrl);
				 regPage.registerInvalidEmailUsers(regUserCred, regUser.invalidEmailMessage);
			 });
		 })(regUser.invalidEmailUserNameList[i]);
	 }
	i=0;
	for(;i < regUser.alreadyTakenEmailUserNameList.length; i++) {
		 (function(regUserCred) {
			 it('register already taken email ', function() {
				 regPage.get(regUser.baseUrl);
				 regPage.registerAlreadyTakenEmailUsers(regUserCred, regUser.alreadyTakenEmailMessage);
			 });
		 })(regUser.alreadyTakenEmailUserNameList[i]);
	 }
	
});