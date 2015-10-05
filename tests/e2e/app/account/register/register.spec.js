var regPage = require('./register.object');
var regUser = require('./register.data');

describe('registerUser', function(){
	console.log(regUser.userList.length);
	var i=0;/*
	for(;i < regUser.userList.length; i++) {
	 (function(regUserCred) {
		 it('register new user', function() {
			 console.log('regUser.baseUrl'+regUser.baseUrl);
			 regPage.get(regUser.baseUrl);
			 regPage.register(regUserCred);
		 });
	 })(regUser.userList[i]);
	}
	
	i=0;
	for(;i < regUser.invalidLengthUserNameList.length; i++) {
		 (function(regUserCred) {
			 it('register Invalid Length Handle ', function() {
				 console.log('regUser.baseUrl'+regUser.baseUrl);
				 regPage.get(regUser.baseUrl);
				 regPage.registerInvalidLengthHandle(regUserCred, regUser.invalidLengthHandleMessage);
			 });
		 })(regUser.invalidLengthUserNameList[i]);
	 }
	
	i=0;
	for(;i < regUser.notAllowedUserNameList.length; i++) {
		 (function(regUserCred) {
			 it('register not allowed handle ', function() {
				 console.log('regUser.baseUrl'+regUser.baseUrl);
				 regPage.get(regUser.baseUrl);
				 regPage.registerNotAllowedHandle(regUserCred, regUser.notAllowedHandleMessage);
			 });
		 })(regUser.notAllowedUserNameList[i]);
	 }
	
	i=0;
	for(;i < regUser.alreadyTakenUserNameList.length; i++) {
		 (function(regUserCred) {
			 it('register already taken handle ', function() {
				 console.log('regUser.baseUrl'+regUser.baseUrl);
				 regPage.get(regUser.baseUrl);
				 regPage.registerAlreadyTakenHandles(regUserCred, regUser.alreadyTakenHandleMessage);
			 });
		 })(regUser.alreadyTakenUserNameList[i]);
	 }
	i=0;
	for(;i < regUser.invalidEmailUserNameList.length; i++) {
		 (function(regUserCred) {
			 it('register invalid email ', function() {
				 console.log('regUser.baseUrl'+regUser.baseUrl);
				 regPage.get(regUser.baseUrl);
				 regPage.registerInvalidEmailUsers(regUserCred, regUser.invalidEmailMessage);
			 });
		 })(regUser.invalidEmailUserNameList[i]);
	 }
	i=0;
	for(;i < regUser.alreadyTakenEmailUserNameList.length; i++) {
		 (function(regUserCred) {
			 it('register already taken email ', function() {
				 console.log('regUser.baseUrl'+regUser.baseUrl);
				 regPage.get(regUser.baseUrl);
				 regPage.registerAlreadyTakenEmailUsers(regUserCred, regUser.alreadyTakenEmailMessage);
				 console.log('right below');
			 });
		 })(regUser.alreadyTakenEmailUserNameList[i]);
	 }
	*/
	i=0;
	for(;i < regUser.githubUserList.length; i++) {
		 (function(regUserCred) {
			 it('register github users', function() {
				 console.log('regUser.baseUrl'+regUser.baseUrl);
				 regPage.get(regUser.baseUrl);
				 regPage.registerGithubUsers(regUserCred);
				 console.log('right below');
			 });
		 })(regUser.githubUserList[i]);
	 }
	
});