var loginPage = require('../login/login.object');
var path = require('path');

var ProfilePage = function() {
 
  this.get = function(baseUrl) {
	  browser.ignoreSynchronization = true;
    browser.get(baseUrl);
  };
 
  
  
  this.goToProfilePage = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
	  
	  var toolTip = element(by.css('.introjs-tooltip'));
	  var isClickable = EC.elementToBeClickable(toolTip);
	  browser.wait(isClickable, 30000);
	  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
	  isClickable = EC.elementToBeClickable(skipBtn);
	  browser.wait(isClickable, 30000);
	  skipBtn.click().then(function() {
		  
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
		  toolTip = element(by.css('.introjs-tooltip'));
		  isClickable = EC.elementToBeClickable(toolTip);
		  browser.wait(isClickable, 30000);
		  skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
		  isClickable = EC.elementToBeClickable(skipBtn);
		  browser.wait(isClickable, 30000);
		  skipBtn.click().then(function() {
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 60000);
		  editProfile.click().then(function() {
			  var absolutePath = path.resolve(loginUserCred.profilePicDir, loginUserCred.profilePicFile);
			  var imageUpload = element(by.css('.file-upload'));
			  isClickable = EC.elementToBeClickable(imageUpload);
			  browser.wait(isClickable, 30000);
//			  var fileInputField = element(by.id('change-image-input'));
//			  $('input[type="file"]').sendKeys(absolutePath);
//			  fileInputField.sendKeys(absolutePath);
			  var countryId = element(by.id('countryId_value'));
			  countryId.clear();
			  countryId.sendKeys(loginUserCred.country);
			  var countryIdDropDown = element(by.id('countryId_dropdown'));
			  isClickable = EC.elementToBeClickable(countryIdDropDown);
			  browser.wait(isClickable, 30000);
			  countryIdDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
				  return elem.getInnerHtml().then(function(text){
					  return text.indexOf(loginUserCred.country) != -1 ;
				  })
			  }).then(function(filteredElements){
				  filteredElements[0].click();
			  });
			  
			  var shortBio = element(by.model('vm.userData.description'));
			  isClickable = EC.elementToBeClickable(shortBio);
			  browser.wait(isClickable, 60000);
			  shortBio.clear();
			  shortBio.sendKeys(loginUserCred.shortBio);
			  var selRep = element.all(by.repeater('track in [\'DESIGN\', \'DEVELOP\', \'DATA_SCIENCE\']'));

			  var designRep = selRep.get(0);
			  var designSwitch = designRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
			  var designButton = designRep.all(by.css('.onoffswitch')).get(0);
			  isClickable = EC.elementToBeClickable(designButton);
			  browser.wait(isClickable, 30000);
			  
			  designSwitch.getCssValue('background-color').then(function(backgroundColor){
				  if(backgroundColor == 'rgba(209, 211, 212, 1)') {
					  if(loginUserCred.design == 'y'){
						  designSwitch.click();
					  }
				  } else{
					  if(loginUserCred.design != 'y'){
						  designSwitch.click();
					  }
				  }
			  });
			  
			  var devRep = selRep.get(1);
			  var devSwitch = devRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
			  var devButton = devRep.all(by.css('.onoffswitch')).get(0);
			  isClickable = EC.elementToBeClickable(devButton);
			  browser.wait(isClickable, 30000);
			  
			  devSwitch.getCssValue('background-color').then(function(backgroundColor){
				  if(backgroundColor == 'rgba(209, 211, 212, 1)') {
					  if(loginUserCred.development == 'y'){
						  devSwitch.click();
					  }
				  } else{
					  if(loginUserCred.development != 'y'){
						  devSwitch.click();
					  }
				  }
			  });
			  
			  var dataScienceRep = selRep.get(2);
			  var dataScienceSwitch = dataScienceRep.all(by.css('.onoffswitch .onoffswitch-label')).get(0);
			  var dataScienceButton = dataScienceRep.all(by.css('.onoffswitch')).get(0);
			  isClickable = EC.elementToBeClickable(dataScienceButton);
			  browser.wait(isClickable, 30000);
			  
			  
			  dataScienceSwitch.getCssValue('background-color').then(function(backgroundColor){
				  if(backgroundColor == 'rgba(209, 211, 212, 1)') {
					  if(loginUserCred.dataScience == 'y'){
						  dataScienceSwitch.click();
					  }
				  } else{
					  if(loginUserCred.dataScience != 'y'){
						  dataScienceSwitch.click();
					  }
				  }
			  });
			  
			  
			  var submitBtn = element(by.css('.settings-container .save-section button'));
			  isClickable = EC.elementToBeClickable(submitBtn);
			  browser.wait(isClickable, 30000);
			  
			  if(loginUserCred.design == 'y' || loginUserCred.development == 'y' || loginUserCred.dataScience == 'y'){
				  browser.actions().mouseMove(submitBtn).perform();
				  submitBtn.click();
			  } else {
				  browser.actions().mouseMove(submitBtn).perform();
				  submitBtn.click().then(function(){
					  browser.driver.sleep(1000);
					  var toasterList = element.all(by.repeater('toaster in toasters'));
					  var firstToaster = toasterList.get(0);
					  isClickable = EC.elementToBeClickable(firstToaster);
					  browser.wait(isClickable, 30000);
					  var toastCloseBtn = firstToaster.all(by.css('.toast-close-button')).get(0);
					  isClickable = EC.elementToBeClickable(toastCloseBtn);
					  browser.wait(isClickable, 30000);
					  var toasterTitle = firstToaster.all(by.css('.toast-title')).get(0);
					  isClickable = EC.elementToBeClickable(toasterTitle);
					  browser.wait(isClickable, 30000);
					  toastCloseBtn.click();
					  
				  });
			  }
			  
			  
			  
			  
		  });
		  });
	  });
  });
  };
  
  
  this.verifyProfileSkill = function(dashBoardUrl, loginUserCred, profileData) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  
	  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
	  isClickable = EC.elementToBeClickable(editProfile);
	  browser.wait(isClickable, 60000);
	  
	  
	  
	  var skillSetList = element.all(by.repeater('skill in vm.skills'));
	  
	  var viewMoreVisible = false;
	  if(loginUserCred.skillSet.length > 10){
		  viewMoreVisible = true;
		  var moreBtn = element(by.css('.skills .more'));
		  expect(moreBtn.isDisplayed()).toBeTruthy();
		  moreBtn.click();
	  }
	  var emptyStateCont = element(by.css('.skills .empty-state'));
	  var emptyStatePlaceHolder = emptyStateCont.all(by.css('.empty-state-placeholder')).get(0);
		  
	  if(loginUserCred.skillSet.length != 0){
		  var skillElem = element(by.css('.skills .activity'));
		  
		  expect(skillElem.getText()).toEqual('SKILLS');
		  expect(emptyStatePlaceHolder.isDisplayed()).toEqual(false);
		  skillSetList.each(function(skillElem, index) {
		  // Will print 0 First, 1 Second, 2 Third.
		  var elem = skillElem.all(by.css(' skill-tile .name')).get(0);
		  elem.getText().then(function(text) {
			  var j=0;
			  var found = false;
			  for(;j<loginUserCred.skillSet.length; j++) {
				  if(loginUserCred.skillSet[j] == text) {
					  found=true;
					  break;
				  }
			  }
			  expect(found).toEqual(true);
		  });
		});
	  
	  if(viewMoreVisible) {
		  var lessBtn = element(by.partialButtonText('VIEW LESS'));
		  expect(lessBtn.isDisplayed()).toBeTruthy();
		  lessBtn.click();
	  }
  } else {
	  expect(emptyStatePlaceHolder.isDisplayed()).toEqual(true);
	  var skillTitle = emptyStatePlaceHolder.all(by.css('.title')).get(0);
	  expect(skillTitle.getText()).toEqual('SKILLS')
	  var sampleSkillRep = emptyStateCont.all(by.repeater('skill in vm.sampleSkills'));
	  expect(sampleSkillRep.count()).toEqual(3);
	  var helpLinkCont = emptyStateCont.all(by.repeater('link in vm.helpLinks'));
	  expect(helpLinkCont.count()).toEqual(1);
	  var addSkillLink = helpLinkCont.get(0).all(by.css('.add-skills')).get(0);
	  expect(addSkillLink.getText()).toEqual('ADD YOUR SKILLS');
  }
	  
	  var introJsCounter = 0;
	  emptyStateCont = element(by.css('.categories .empty-state'));
	  emptyStatePlaceHolder = emptyStateCont.all(by.css('.empty-state-placeholder')).get(0);
	  
	  
	  if(loginUserCred.challengeParticipation == 'n'){
		  expect(emptyStatePlaceHolder.isDisplayed()).toEqual(true);
		  var helpLinkCont = emptyStateCont.all(by.repeater('link in vm.helpLinks'));
		  expect(helpLinkCont.count()).toEqual(2);
		  var findChallenges = helpLinkCont.get(0).all(by.css('.find-challenges')).get(0);
		  expect(findChallenges.getText()).toEqual('EXPLORE CHALLENGES');
		  findChallenges.click().then(function(){
			  var activeChallengeElem = element(by.css('.layChallenges .header-container .ng-binding'));
			  expect(activeChallengeElem.getText()).toEqual('ALL OPEN CHALLENGES');
			  browser.navigate().back().then(function(){
				  editProfile = element(by.partialLinkText('EDIT PROFILE'));
				  isClickable = EC.elementToBeClickable(editProfile);
				  browser.wait(isClickable, 60000);
				  
				  var learnMore = helpLinkCont.get(1).all(by.css('.learn-more')).get(0);
				  expect(learnMore.getText()).toEqual('LEARN MORE');
				  learnMore.click().then(function(){
					  var pageElem = element(by.id('page'));
					  var mkSmooth = pageElem.all(by.css('.mk-smooth')).get(0);
					  expect(mkSmooth.getText()).toEqual('ABOUT TOPCODER');
					  browser.navigate().back().then(function(){
						  editProfile = element(by.partialLinkText('EDIT PROFILE'));
						  isClickable = EC.elementToBeClickable(editProfile);
						  browser.wait(isClickable, 60000);
					  });
				  });
			  });
		  });
		  
	  } else {
		  expect(emptyStatePlaceHolder.isDisplayed()).toEqual(false);
	  
	  
	  
	  
	  element.all(by.repeater('track in profileVm.tracks')).each(function(elem, index){
		  var activityType = elem.all(by.css('.name .ng-binding')).get(0);
		  expect(activityType.isPresent()).toEqual(true);
		  
		  activityType.getText().then(function(activityName){
			  if(activityName == 'COPILOT ACTIVITY') {
				  var firstTrack = elem.all(by.css('.subtrack')).get(0);
				  var subTrackName = firstTrack.all(by.css('.subtrack .name')).get(0);
				  subTrackName.getText().then(function(subTrackNameValue){
					  expect(subTrackNameValue).toEqual(profileData.copilotActivityType[0]);
					  var trackCounter = firstTrack.all(by.css('.ranking .number')).get(0);
					  
					  trackCounter.getText().then(function(percentageWin){
						  var foundPercentage = false;
						  if(percentageWin.match(/^\d+\.?\d?\d?%?$/) && parseFloat(percentageWin)<=100 && parseFloat(percentageWin)>=0){
							  foundPercentage = true;
							 }
							 expect(foundPercentage).toEqual(true);
							 var trackTag = firstTrack.all(by.css('.ranking .tag')).get(0);
							 expect(trackTag.getText()).toEqual(profileData.copilotActivityTypeTag);
					  });
				  });
			  }
			  
			  if(activityName == 'DEVELOPMENT ACTIVITY') {
				  elem.all(by.css('.subtrack')).each(function(subTrackElem, index){
					  
						  var subTrackName = subTrackElem.all(by.css('.subtrack .name')).get(0);
						  subTrackName.getText().then(function(subTrackNameValue){
							 if(subTrackNameValue == profileData.developmentActivityType[0] 
							 ||	 subTrackNameValue == profileData.developmentActivityType[1] 
							 || subTrackNameValue == profileData.developmentActivityType[2]
							 || subTrackNameValue == profileData.developmentActivityType[3]) {
								 var trackCounter = subTrackElem.all(by.css('.ranking .number')).get(0);
								 trackCounter.getText().then(function(textValue){
									 var isInteger = Math.round(textValue) === parseInt(textValue);
									 expect(isInteger).toEqual(true);
									 var trackTag = subTrackElem.all(by.css('.ranking .tag')).get(0);
									 expect(trackTag.getText()).toEqual(profileData.developeActivityTypeTag);
								 });
							 } else {
								 expect(true).toEqual(false);
							 }
							  
						  });
					  
				  });
			  }
			  
			  if(activityName == 'DESIGN ACTIVITY') {
				  elem.all(by.css('.subtrack')).each(function(subTrackElem, index){
					  var subTrackName = subTrackElem.all(by.css('.subtrack .name')).get(0);
					  expect(subTrackName.waitReady()).toEqual(true);
					  subTrackName.getText().then(function(subTrackNameValue){
						  var foundTrack = false;
						  for(var j=0; j < profileData.designActivityType.length; j++) {
							  if(profileData.designActivityType[j] == subTrackNameValue){
								  foundTrack = true;
							  }
						  }
						 if(foundTrack == true) {
							 var trackCounterElem = subTrackElem.all(by.css('.ranking .number')).get(0);
							 trackCounterElem.getText().then(function(trackCounter){
								 var isInteger = Math.round(trackCounter) === parseInt(trackCounter);
								 expect(isInteger).toEqual(true);
								 var trackTag = subTrackElem.all(by.css('.ranking .tag')).get(0);
								 expect(trackTag.getText()).toEqual(profileData.designActivityTypeTag);
							 });
							 
						 } else {
							 expect(foundTrack).toEqual(true);
						 }
					  });
					  
				  });
			  }
			  
			  
			  if(activityName == 'DATA SCIENCE ACTIVITY') {
				  elem.all(by.css('.subtrack')).each(function(subTrackElem, index){
					  var subTrackName = subTrackElem.all(by.css('.subtrack .name')).get(0);
					  expect(subTrackName.waitReady()).toEqual(true);
					  subTrackName.getText().then(function(subTrackNameValue){
						  var foundTrack = false;
						  for(var j=0; j < profileData.dataActivityType.length; j++) {
							  if(profileData.dataActivityType[j] == subTrackNameValue){
								  foundTrack = true;
							  }
						  }
						 if(foundTrack == true) {
							 var trackCounterElem = subTrackElem.all(by.css('.ranking .number')).get(0);
							 trackCounterElem.getText().then(function(trackCounter){
								 var isInteger = Math.round(trackCounter) === parseInt(trackCounter);
								 expect(isInteger).toEqual(true);
								 var trackTag = subTrackElem.all(by.css('.ranking .tag')).get(0);
								 expect(trackTag.getText()).toEqual(profileData.dataActivityTypeTag);
							 });
							 
						 } else {
							 expect(foundTrack).toEqual(true);
						 }
					  });
					  
				  });
			  }
		  });
	  });
  }
  };
  
  this.verifySubTrackPage = function(dashBoardUrl, loginUserCred, profileData){
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  var introJsCounter = true;
	  var profileTracks = element.all(by.repeater('track in profileVm.tracks'));
	  profileTracks.count().then(function(counter){
		  if (counter > 0){
			  var firstTrack = profileTracks.get(0);
			  var activityType = firstTrack.all(by.css('.name .ng-binding')).get(0);
			  activityType.getText().then(function(activityTypeText){
				  if(activityTypeText == 'COPILOT ACTIVITY'){
					  if(counter > 1) {
						  firstTrack = profileTracks.get(1);
					  } else {
						  introJsCounter = false;
					  }
				  } 
			 
			  var firstSubTrack = firstTrack.all(by.css('.subtrack')).get(0);
			  var subTrackName = firstSubTrack.all(by.css('.subtrack .name')).get(0);
			  subTrackName.getText().then(function(subTrackNameValue){
			  firstSubTrack.click().then(function(){
				  if(introJsCounter == true) {
					  var toolTip = element(by.css('.introjs-tooltip'));
					  var isClickable = EC.elementToBeClickable(toolTip);
					  browser.wait(isClickable, 30000);
					  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
					  isClickable = EC.elementToBeClickable(skipBtn);
					  browser.wait(isClickable, 30000);
					  skipBtn.click();
					  introJsCounter = false;;
				  }
				  var tab = element.all(by.repeater('tab in tabSet.tabs')).get(0);
				  var aDiv = tab.all(by.css('a div')).get(0);
				  expect(aDiv.waitReady()).toEqual(true);
				  expect(aDiv.isPresent()).toEqual(true);
				  expect(aDiv.getText()).toEqual('STATISTICS');
				  var pageInfo = element(by.css('.page-state-header header .ng-binding'));
				  pageInfo.getText().then(function(text){
					expect(text).toContain(subTrackNameValue); 
					browser.navigate().back().then(function(){
						editProfile = element(by.partialLinkText('EDIT PROFILE'));
						expect(editProfile.waitReady()).toEqual(true);
						isClickable = EC.elementToBeClickable(editProfile);
						browser.wait(isClickable, 60000);
					});
				 });
			  });
			  });
			  });
			  
		  } else {
			  expect(counter).toEqual(0);
		  }
	  })
  }
  
  
  
  this.verifyExternalLinks = function(dashBoardUrl, loginUserCred, profileData) {
	  browser.driver.ignoreSynchronization = true;
	  var EC = protractor.ExpectedConditions;
	  
	  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
	  isClickable = EC.elementToBeClickable(editProfile);
	  browser.wait(isClickable, 60000);
	  
	  if(loginUserCred.externalLinks.length == 0){
		  var emptyPlaceHolder = element(by.css('.external-links .empty-state .empty-state-placeholder'));
		  expect(emptyPlaceHolder.isDisplayed()).toBeTruthy();
		  var titleCont = emptyPlaceHolder.all(by.css('.title')).get(0);
		  expect(titleCont.getText()).toEqual('EXTERNAL LINKS');
		  var helpLink = emptyPlaceHolder.all(by.repeater('link in vm.helpLinks')).get(0);
		  var connectExternal = helpLink.all(by.css('.connect-external-accounts')).get(0);
		  expect(connectExternal.getText()).toEqual('CONNECT YOUR ACCOUNTS');
		  
		  connectExternal.click().then(function(){
			  var shortBio = element(by.model('vm.userData.description'));
			  isClickable = EC.elementToBeClickable(shortBio);
			  browser.wait(isClickable, 60000);
			  
			  expect(shortBio.isPresent()).toEqual(true);
			  
			  browser.navigate().back().then(function(){
				  editProfile = element(by.partialLinkText('EDIT PROFILE'));
				  isClickable = EC.elementToBeClickable(editProfile);
				  browser.wait(isClickable, 60000);
			  });
		  });
	  } else {
		  var webExternal = element(by.css('.external-links .activity'));
		  expect(webExternal.getText()).toEqual('ON THE WEB');
		  element.all(by.css('.external-link-tile')).each(function(externalElem, index){
			  var externalLogo = externalElem.all(by.css('.top .logo i')).get(0);
			  externalLogo.getAttribute('class').then(function(className){
				  var logoFound = false;
				  var externalName = '';
				  if(className == 'fa fa-github') {
					  externalName = 'github';
				  }
				  if(className == 'fa fa-dribbble') {
					  externalName = 'dribbble';
				  }
				  if(className == 'fa fa-stack-overflow') {
					  externalName = 'stackoverflow';
				  }
				  if(className == 'fa fa-bitbucket') {
					  externalName = 'bitbucket';
				  }
				  if(className == 'fa fa-globe') {
					  externalName = 'globe';
				  }
				  for(var j = 0; j < loginUserCred.externalLinks.length; j++) {
					  if(loginUserCred.externalLinks[j] == externalName) {
						  logoFound = true;
						  break;
					  }
				  }
				  expect(logoFound).toBeTruthy();
			  });
		  });
	  }
  }
  
  
  
  this.verifyProfileChanges = function(dashBoardUrl,loginUserCred){
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  
	  var toolTip = element(by.css('.introjs-tooltip'));
	  var isClickable = EC.elementToBeClickable(toolTip);
	  browser.wait(isClickable, 30000);
	  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
	  isClickable = EC.elementToBeClickable(skipBtn);
	  browser.wait(isClickable, 30000);
	  skipBtn.click().then(function() {
	  
	  
	  
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
		  toolTip = element(by.css('.introjs-tooltip'));
		  isClickable = EC.elementToBeClickable(toolTip);
		  browser.wait(isClickable, 30000);
		  skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
		  isClickable = EC.elementToBeClickable(skipBtn);
		  browser.wait(isClickable, 30000);
		  skipBtn.click().then(function() {
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 60000);
		  
		  var profilePic = element(by.css('.profile-widget-directive .pic'));
		  expect(profilePic.isPresent()).toBeTruthy();
		  
		  var handleName = element(by.css('.profile-widget-directive .info .handle'));
		  expect(handleName.getInnerHtml()).toEqual(loginUserCred.username.toLowerCase());
		  
		  var locationCont = element(by.css('.profile-widget-directive .info .location-challenges'));
		  expect(locationCont.getText()).toContain(loginUserCred.country);
		  var bar = locationCont.all(by.css('.bar')).get(0);
		  var wins = locationCont.all(by.css('.ng-binding')).get(0);
		  if(loginUserCred.totalWins == ''){
			  expect(bar.isDisplayed()).toEqual(false);
			  expect(wins.isDisplayed()).toEqual(false);
		  } else {
			  expect(bar.isPresent()).toBeTruthy();
			  expect(wins.getText()).toEqual(loginUserCred.totalWins);
		  }
		  
		  var tenure = element(by.css('.profile-widget-directive .tenure'));
		  expect(tenure.getText()).toEqual(loginUserCred.tenure);
		  
		  
		  editProfile.click().then(function() {

			  var countryId = element(by.id('countryId_value'));
			  isClickable = EC.elementToBeClickable(countryId);
			  browser.wait(isClickable, 30000);
			  browser.navigate().back().then(function(){
				  editProfile = element(by.partialLinkText('EDIT PROFILE'));
				  isClickable = EC.elementToBeClickable(editProfile);
				  browser.wait(isClickable, 60000);
				  
				  
				  var designNumber = 0, devNumber = 0,copilotNumber = 0;
				  if(loginUserCred.dataScience == 'y') {
					var dataIcon = element(by.css('.track .data-icon'));
					isClickable = EC.elementToBeClickable(dataIcon);
					browser.wait(isClickable, 60000);
					
					expect(dataIcon.isPresent()).toEqual(true);
					
					var dataName = element.all(by.css('.track .text')).get(0);
					expect(dataName.getInnerHtml()).toEqual('Data Scientist');
					
					designNumber = designNumber + 1;
					devNumber = devNumber + 1;
					copilotNumber = copilotNumber + 1;
				  }
				  
				  if(loginUserCred.design == 'y') {
					  var designIcon = element(by.css('.track .design-icon'));
					  isClickable = EC.elementToBeClickable(designIcon);
					  browser.wait(isClickable, 60000);
					  
					  expect(designIcon.isPresent()).toEqual(true);
					  
					  devNumber = devNumber + 1;
					  copilotNumber = copilotNumber + 1;
					  
					  var designName = element.all(by.css('.track .text')).get(designNumber);
					  expect(designName.getInnerHtml()).toEqual('Designer');
					  
					  
				  }
				  
				  if(loginUserCred.development == 'y') {
					  var devIcon = element(by.css('.track .develop-icon'));
					  isClickable = EC.elementToBeClickable(designIcon);
					  browser.wait(isClickable, 60000);
					  
					  expect(devIcon.isPresent()).toEqual(true);
					  
					  copilotNumber = copilotNumber + 1;
					  
					  var devName = element.all(by.css('.track .text')).get(devNumber);
					  expect(devName.getInnerHtml()).toEqual('Developer');
				  }
				  
				  if(loginUserCred.copilot == 'y') {
					  var copilotIcon = element(by.css('.track .copilot-icon'));
					  isClickable = EC.elementToBeClickable(copilotIcon);
					  browser.wait(isClickable, 60000);
					  
					  expect(copilotIcon.isPresent()).toEqual(true);
					  
					  var devName = element.all(by.css('.track .text')).get(copilotNumber);
					  expect(devName.getInnerHtml()).toEqual('Copilot');
				  }
				  
				  var description = element(by.css('.profile-widget-directive .description'));
				  isClickable = EC.elementToBeClickable(description);
				  browser.wait(isClickable, 60000);
				  
				  expect(description.isPresent()).toEqual(true);
				  
				  expect(description.getInnerHtml()).toEqual(loginUserCred.shortBio);
				  
				  var badgesLink = element(by.css('.links .badges'));
				  isClickable = EC.elementToBeClickable(badgesLink);
				  browser.wait(isClickable, 60000);
		  
				  badgesLink.click().then(function(){
					  var subBadge = element.all(by.css('.subBadge')).get(0);
					  expect(subBadge.isPresent()).toEqual(true);
					  
					  browser.refresh();
					  
					  editProfile = element(by.partialLinkText('EDIT PROFILE'));
					  isClickable = EC.elementToBeClickable(editProfile);
					  browser.wait(isClickable, 60000);
					  
					  var forumLink = element(by.css('.links .forums'));
					  forumLink.click().then(function(){
						  browser.driver.wait(function() {
							  var forumClass = browser.driver.findElement(by.css('.rtbcLink'));
							  return true;
						  },30000);
						  
						  browser.navigate().back().then(function(){
							  editProfile = element(by.partialLinkText('EDIT PROFILE'));
							  isClickable = EC.elementToBeClickable(editProfile);
							  browser.wait(isClickable, 60000);
						  });
					  });
					  
					  
					  
				  });
		  
			  });
	  });
		  });
	  });
	  });
  };
  
  
this.goToProfileSkill = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
	  var until = protractor.until;
	  
	  var toolTip = element(by.css('.introjs-tooltip'));
	  var isClickable = EC.elementToBeClickable(toolTip);
	  browser.wait(isClickable, 30000);
	  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
	  isClickable = EC.elementToBeClickable(skipBtn);
	  browser.wait(isClickable, 30000);
	  skipBtn.click().then(function() {
		  
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
		  toolTip = element(by.css('.introjs-tooltip'));
		  isClickable = EC.elementToBeClickable(toolTip);
		  browser.wait(isClickable, 30000);
		  skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
		  isClickable = EC.elementToBeClickable(skipBtn);
		  browser.wait(isClickable, 30000);
		  skipBtn.click().then(function() {

			  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
			  isClickable = EC.elementToBeClickable(editProfile);
			  browser.wait(isClickable, 60000);
			  editProfile.click().then(function() {
			  
			  var skillSet = element(by.id('tagId_value'));
			  isClickable = EC.elementToBeClickable(skillSet);
			  browser.wait(isClickable, 60000);
			  skillSet.clear();
				  skillSet.sendKeys(loginUserCred.skillSet[0]).then(function(){
					  browser.driver.manage().timeouts().implicitlyWait( 6000);
					  var skillSetDropDown = element(by.id('tagId_dropdown'));
					  expect(skillSetDropDown.waitReady()).toBeTruthy();
					  
					  var titleFirst = element(by.css('.angucomplete-title'));
					  expect(titleFirst.waitReady()).toBeTruthy();
					  
					  
					  skillSetDropDown.all(by.css('.angucomplete-title')).filter(function(elem, index){
						  return elem.getInnerHtml().then(function(text){
							  return text.indexOf(loginUserCred.skillSet[0]) != -1 ;
						  })
					  }).then(function(filteredElements){
						  filteredElements[0].click();
					  });
				  });
				  
				  
			  
		  });
		  });
	  });
  });
  };
  
  
  
  
  
  
this.goToProfileGitLogin = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
	  var until = protractor.until;
	  
	  var toolTip = element(by.css('.introjs-tooltip'));
	  var isClickable = EC.elementToBeClickable(toolTip);
	  browser.wait(isClickable, 30000);
	  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
	  isClickable = EC.elementToBeClickable(skipBtn);
	  browser.wait(isClickable, 30000);
	  skipBtn.click().then(function() {
		  
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
		  toolTip = element(by.css('.introjs-tooltip'));
		  isClickable = EC.elementToBeClickable(toolTip);
		  browser.wait(isClickable, 30000);
		  skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
		  isClickable = EC.elementToBeClickable(skipBtn);
		  browser.wait(isClickable, 30000);
		  skipBtn.click().then(function() {
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 60000);
		  editProfile.click().then(function() {
			  
			  
			  var accountList = element.all(by.repeater('account in accountList | orderBy:\'order\''));
			  var githubAccount = accountList.get(0);
			  var statusList = githubAccount.all(by.css('.status'));
			  if(statusList.get(0).getInnerHtml() == 'Disconnect') {
				if(statusList.get(0).getCssValue('display') == 'none') {
					var faGithub = element(by.css('.el-github'));
					faGithub.click();
					selectWindow(1);
					  browser.driver.wait(function() {
						  var emailId = browser.driver.findElement(by.id('login_field'));
						  emailId.sendKeys(loginUserCred.gitUsername);
						  return true;
					  },30000);
					  
					  browser.driver.wait(function(){
						 var password = browser.driver.findElement(by.id('password'));
						 password.sendKeys(loginUserCred.gitPassword);
						 return true;
					  },30000);
					  
					  browser.driver.wait(function(){
							 var signIn = browser.driver.findElement(by.name('commit'));
							 signIn.click();
							 return true;
					  },30000);
					  
					  browser.getAllWindowHandles().then(function (handles) {
						  browser.switchTo().window(handles[0]);
					  });
					  
					  if(githubAccount.all(by.css('.status')).get(0).getInnerHtml() == 'Connecting'){
						  expect(true).toEqual(true);
					  };
					
					
				}  
			  }
		  });
		  });
	  });
  });
  };
  
  
  
  
  
  
this.goToProfileBitBucketLogin = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
	  var until = protractor.until;
	  
	  var toolTip = element(by.css('.introjs-tooltip'));
	  var isClickable = EC.elementToBeClickable(toolTip);
	  browser.wait(isClickable, 30000);
	  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
	  isClickable = EC.elementToBeClickable(skipBtn);
	  browser.wait(isClickable, 30000);
	  skipBtn.click().then(function() {
		  
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  browser.wait(isClickable, 30000);
	  browser.actions().mouseMove(nameHeader).perform();
	  var profileHeader = element(by.repeater("item in vm.userMenu").row(1));
	  var mainMenuLiList = element.all(by.css('.main-menu li'));
	  var submenuLi = mainMenuLiList.get(1);
	  var profileLink = element(by.partialLinkText('MY PROFILE'));
	  
	  isClickable = EC.elementToBeClickable(profileLink);
	  browser.wait(isClickable, 30000);
	
	  profileLink.click().then(function() {
		  toolTip = element(by.css('.introjs-tooltip'));
		  isClickable = EC.elementToBeClickable(toolTip);
		  browser.wait(isClickable, 30000);
		  skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
		  isClickable = EC.elementToBeClickable(skipBtn);
		  browser.wait(isClickable, 30000);
		  skipBtn.click().then(function() {
		  
		  var editProfile = element(by.partialLinkText('EDIT PROFILE'));
		  isClickable = EC.elementToBeClickable(editProfile);
		  browser.wait(isClickable, 60000);
		  editProfile.click().then(function() {
			  var imageUpload = element(by.css('.file-upload'));
			  isClickable = EC.elementToBeClickable(imageUpload);
			  browser.wait(isClickable, 30000);
			  
			  
			  var accountList = element.all(by.css('.links .ext-tile'));
			  var githubAccount = accountList.get(6);
			  isClickable = EC.elementToBeClickable(githubAccount);
			  browser.wait(isClickable, 60000);
			  
			  var statusList = githubAccount.all(by.css('.status'));
			  expect(statusList.get(0).getInnerHtml()).toEqual('Disconnect');
			  statusList.get(0).getInnerHtml().then(function(statusType){
				  if(statusType == 'Disconnect'){
					  statusList.get(0).getCssValue('display').then(function(displayType) {
						  if(displayType == 'none') {
							  var faGithub = element(by.css('.el-bitbucket'));
								faGithub.click();
								loginPage.selectWindow(1);
								  browser.driver.wait(function() {
									  var emailId = browser.driver.findElement(by.id('id_username'));
									  emailId.sendKeys(loginUserCred.gitUserName);
									  return true;
								  },30000);
								  
								  browser.driver.wait(function(){
									 var password = browser.driver.findElement(by.id('id_password'));
									 password.sendKeys(loginUserCred.gitPassword);
									 return true;
								  },30000);
								  
								  browser.driver.wait(function(){
									  var signIn = browser.driver.findElement(by.name('submit'));
									  signIn.click().then(function(){
										  browser.driver.wait(function(){
											  var signIn1 = element(by.name('submit'));
											  signIn1.isPresent().then(function(present){
												 if(present == 'true'){
													 signIn1.click();
													 return true;
												 } else {
												 }
											  });

										  },60000);
									  });
									  return true;
								  },30000);
								  
								  
								  browser.getAllWindowHandles().then(function (handles) {
									  browser.switchTo().window(handles[0]);
								  });
								  
								  if(githubAccount.all(by.css('.status')).get(0).getInnerHtml() == 'Connecting'){
									  expect(true).toEqual(true);
								  };
						  } 
					  });
				  }else {
				  }
			  })
		  });
		  });
	  });
  });
  };
  
};
module.exports = new ProfilePage();