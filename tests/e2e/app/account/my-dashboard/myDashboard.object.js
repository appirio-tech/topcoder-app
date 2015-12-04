var path = require('path');
var MyDashboardPage = function() {
 
  this.get = function(baseUrl) {
	browser.ignoreSynchronization = true;
    browser.get(baseUrl);
  };
 
  this.selectWindow = function(index) {
	  // wait for handles[index] to exist
	  browser.wait(function() {
	    return browser.getAllWindowHandles().then(function(handles) {
	      /**
	       * Assume that handles.length >= 1 and index >=0.
	       * So when calling selectWindow(index) return
	       * true if handles contains that window.
	       */
	      if (handles.length > index) {
	        return true;
	      }
	    });
	  }, 30000);
	  // here i know that the requested window exists

	  // switch to the window
	  return browser.getAllWindowHandles().then(function(handles) {
	    return browser.switchTo().window(handles[index]);
	  });
  };
  
  
  
  
  this.goToSrmLinks = function(dashBoardUrl, myDashboardData, loginUserCred) {
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
	  browser.get(dashBoardUrl);
	  
	  var moneyEarned = element(by.id('metrics'));
	  isClickable = EC.elementToBeClickable(moneyEarned);
	  browser.wait(isClickable, 30000);
	  
	  var srmTiles = element(by.css('.srm-tiles'));
	  isClickable = EC.elementToBeClickable(srmTiles);
	  browser.wait(isClickable, 30000);
	  
	  srmTiles.isDisplayed().then(function(displayed){
		  if(displayed){
			  var srmTile = srmTiles.all(by.css('srm-tile'));
			  srmTile.count().then(function(srmCounter){
			  
			  if(srmCounter > 0) {
				  var upcomingSrm = srmTile.get(0).all(by.css('.upcoming-srm a')).get(0);
				  upcomingSrm.click().then(function(){
					  browser.driver.wait(function(){
						  var bodyText = browser.driver.findElement(by.css('.bodyText'));
							 return true;
					  },30000);
					  
					  browser.get(dashBoardUrl);
					  moneyEarned = element(by.id('metrics'));
					  isClickable = EC.elementToBeClickable(moneyEarned);
					  browser.wait(isClickable, 30000);
			  }).then(function(){
			  var pastSrms = element(by.partialLinkText('VIEW PAST SRMS'));
			  isClickable = EC.elementToBeClickable(pastSrms);
			  browser.wait(isClickable, 30000);
			  browser.actions().mouseMove(pastSrms).perform();
			  pastSrms.click().then(function(){
				  var upcoming = element(by.partialLinkText('UPCOMING'));
				  isClickable = EC.elementToBeClickable(upcoming);
				  browser.wait(isClickable, 70000);
				  
				  browser.get(dashBoardUrl);
					 
				  moneyEarned = element(by.id('metrics'));
				  isClickable = EC.elementToBeClickable(moneyEarned);
				  browser.wait(isClickable, 30000);
					 
				  var launchArena = element(by.partialLinkText('LAUNCH ARENA'));
				  browser.actions().mouseMove(launchArena).perform();
				  isClickable = EC.elementToBeClickable(launchArena);
				  browser.wait(isClickable, 70000);
					 
				  launchArena.click().then(function(){
					  browser.get(dashBoardUrl);
					  
					  moneyEarned = element(by.id('metrics'));
					  isClickable = EC.elementToBeClickable(moneyEarned);
					  browser.wait(isClickable, 70000);
	  
					   var practiceProblems = element(by.partialLinkText('PRACTICE PROBLEMS'));
					   practiceProblems.click().then(function(){
		  
						   browser.get(dashBoardUrl);
						   var menuItemHeaders = element.all(by.css('.menu-item-header'));
						   var nameHeader = menuItemHeaders.get(1);
						   var isClickable = EC.elementToBeClickable(nameHeader);
						   var moneyEarned = element(by.id('metrics'));
						   isClickable = EC.elementToBeClickable(moneyEarned);
						   browser.wait(isClickable, 30000);
						   
						   var problemArchivesLink = element(by.partialLinkText('PROBLEM ARCHIVE'));
						   isClickable = EC.elementToBeClickable(problemArchivesLink);
						   browser.wait(isClickable, 30000);
						   expect(problemArchivesLink.waitReady()).toBeTruthy();
						   problemArchivesLink.click().then(function(){
							   browser.driver.wait(function(){
								   var loginBtn = browser.driver.findElement(by.name('class'));
								   return true;
							   },30000);
							   browser.navigate().back().then(function(){
			 
								   var matchEditorialLink = element(by.partialLinkText('LEARN MORE'));
								   isClickable = EC.elementToBeClickable(matchEditorialLink);
								   browser.wait(isClickable, 30000);
								   
								   matchEditorialLink.click().then(function(){
									   browser.driver.wait(function(){
										   var memberOnBoardingMsg = browser.driver.findElement(by.id('single-member-onboarding'));
										   return true;
									   },30000); 
				 
									   browser.get(dashBoardUrl);
									   var pastSrmsLink = element(by.partialLinkText('VIEW PAST SRMS'));
									   isClickable = EC.elementToBeClickable(pastSrmsLink);
									   browser.wait(isClickable, 30000);
				 
									   expect(pastSrmsLink.getAttribute('href')).toEqual(myDashboardData.baseUrlPrefix +''+ myDashboardData.pastSrms);
										 
									   pastSrmsLink.click().then(function(){
										   var findSrms = element(by.partialLinkText('FIND SRMS'));
										   isClickable = EC.elementToBeClickable(findSrms);
										   browser.wait(isClickable, 30000);
										   
										   findSrms.click().then(function(){
											   
										   });
									   });
								   });
								   });
							   });
						   });
					   });
			  });
		  });
		  }
	   });
	  }
	  });
  };
  
  
  this.goToIosChallenges = function(dashBoardUrl, loginUserCred) {
	  var EC = protractor.ExpectedConditions;  
	  
	  browser.get(dashBoardUrl);
	  var moneyEarned = element(by.id('metrics'));
	  var isClickable = EC.elementToBeClickable(moneyEarned);
	  browser.wait(isClickable, 30000);
	  
	  var iosEmptyCont = element(by.css('.ios empty-state-placeholder'));
	  iosEmptyCont.isDisplayed().then(function(displayed){
		 if(displayed) {
			 var helpLinks = iosEmptyCont.all(by.repeater('link in vm.helpLinks'));
			 var learnMoreLi = helpLinks.get(1);
			 var learMoreLink = learnMoreLi.all(by.css('a')).get(0);
			 learMoreLink.click().then(function(){
				 
				 var learMoreId = element(by.id('learn-more'));
				 isClickable = EC.elementToBeClickable(learMoreId);
				 browser.wait(isClickable, 30000);
				 
				 browser.navigate().back().then(function(){
					 moneyEarned = element(by.id('metrics'));
					 var isClickable = EC.elementToBeClickable(moneyEarned);
					 browser.wait(isClickable, 30000);
					 
					 iosEmptyCont = element(by.css('.ios empty-state-placeholder'));
					 helpLinks = iosEmptyCont.all(by.repeater('link in vm.helpLinks'));
					 var participateIos = helpLinks.get(0).all(by.css('a')).get(0);
					 participateIos.click().then(function(){
						 
					 });
					 
				 });
			 });
		 }
	  }).then(function(){
		  var iosChallenges = element(by.css('.badge-and-challenges')).all(by.partialLinkText('VIEW CHALLENGES'));
		  iosChallenges.get(0).click().then(function(){
		  
		  browser.get(dashBoardUrl);
		  moneyEarned = element(by.id('metrics'));
		  isClickable = EC.elementToBeClickable(moneyEarned);
		  browser.wait(isClickable, 70000);
		  
		  var iosCards = element(by.css('.badge-and-challenges')).all(by.css('ios-card'));
		  expect(iosCards.count()).toEqual(3);
		  var firstIos = iosCards.get(0);
		  var firstChallengeIos = firstIos.all(by.css('.top a')).get(0);
		  firstChallengeIos.click().then(function(){
			  var cdNgMain = element(by.id('cdNgMain'));
			  isClickable = EC.elementToBeClickable(cdNgMain);
			  browser.wait(isClickable, 70000);
			  
			  browser.get(dashBoardUrl);
			  moneyEarned = element(by.id('metrics'));
			  isClickable = EC.elementToBeClickable(moneyEarned);
			  browser.wait(isClickable, 70000);
			  var registrantIosLink = firstIos.all(by.css('.tile-view .challenge-links .registrants')).get(0);
			  
			  registrantIosLink.click().then(function(){
				  cdNgMain = element(by.id('cdNgMain'));
				  isClickable = EC.elementToBeClickable(cdNgMain);
				  browser.wait(isClickable, 70000);
				  
				  browser.get(dashBoardUrl);
				  moneyEarned = element(by.id('metrics'));
				  isClickable = EC.elementToBeClickable(moneyEarned);
				  browser.wait(isClickable, 70000);
				  
				  var submissionLink = firstIos.all(by.css('.tile-view .challenge-links .submissions')).get(0);
				  
				  submissionLink.click().then(function(){
					  cdNgMain = element(by.id('cdNgMain'));
					  isClickable = EC.elementToBeClickable(cdNgMain);
					  browser.wait(isClickable, 70000);
					  
					  browser.get(dashBoardUrl);
					  moneyEarned = element(by.id('metrics'));
					  isClickable = EC.elementToBeClickable(moneyEarned);
					  browser.wait(isClickable, 70000);
					  var forumIosLink = firstIos.all(by.css('.tile-view .challenge-links .forum')).get(0);
					  forumIosLink.click().then(function(){
						  browser.driver.wait(function(){
							  var forumMenuLink = browser.driver.findElement(by.css('.menu-link-community-forums'));
								 return true;
						  },30000);
						  
					  browser.get(dashBoardUrl);
					  moneyEarned = element(by.id('metrics'));
					  isClickable = EC.elementToBeClickable(moneyEarned);
					  browser.wait(isClickable, 70000);
			  
			  var postLinks = element.all(by.css('.posts .post'));
			  var postLink = postLinks.get(0);
			  expect(postLink.waitReady()).toBeTruthy();
			  
			  
			  
			  var blogMore = element(by.css('.blog-links a'));
			  blogMore.click().then(function(){
				  browser.driver.wait(function(){
				  var bodyTblogPageMainContentext = browser.driver.findElement(by.css('.blogPageMainContent'));
					 return true;
				 },30000);
				  
				  
				  browser.get(dashBoardUrl);
				  var postLinks = element.all(by.css('.posts .post'));
				  var postLink = postLinks.get(0);
				  expect(postLink.waitReady()).toBeTruthy();
				  
				  var blogLink = postLink.all(by.css('.blog-link a')).get(0);
				  expect(blogLink.waitReady()).toBeTruthy();
					  
				  blogLink.click().then(function(){
					  		browser.get(dashBoardUrl);
				  });
			  }); 
			  });
				  });
		  });
		  });
	  });
  });
  }
  
  
  this.carouselDashboard = function(dashBoardUrl,loginUserCred) {
	  
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
	  var moneyEarned = element(by.id('metrics'));
	  var isClickable = EC.elementToBeClickable(moneyEarned);
	  browser.wait(isClickable, 30000);
	  
	  if(loginUserCred.moneyEarned != ''){
		  moneyEarned = element(by.css('.money-earned'));
		  var isClickable = EC.elementToBeClickable(moneyEarned);
		  browser.wait(isClickable, 30000);
		  var dollarEarned = moneyEarned.all(by.css('.number')).get(0);
		  expect(dollarEarned.getText()).toEqual(loginUserCred.moneyEarned);
	  } 
	  
	  var ratings = element(by.css('.ratings'));
	  
	  ratings.isPresent().then(function(ratingAvail){
		  if(ratingAvail) {
			  var carouselCont = ratings.all(by.css('ul')).get(0);
			  var sliderCont = carouselCont.all(by.repeater('slides in slidesCollection'));
			  var totalCarouselItems = 0;
			  
			  sliderCont.each(function(elem, index){
				  elem.all(by.repeater('item in slides')).count().then(function(itemCounter){
					  totalCarouselItems = totalCarouselItems + itemCounter;
				  });
			  }).then(function() {
				  var totalSlides = (Math.floor(totalCarouselItems / 6)) + 1;
				  expect(sliderCont.count()).toEqual(totalSlides);
			  });
			  
			  
			  sliderCont.count().then(function(counter){
				 
				  for(var j=0; j < counter; j++){
					  var itemSliderCont = sliderCont.get(j).all(by.repeater('item in slides'));
					  itemSliderCont.count().then(function(itemCounter){
						  totalCarouselItems = totalCarouselItems + itemCounter;
					  });
				  }
				  
				  var totalSlides = Math.floor(totalCarouselItems / 6) + 1;
				  var carouselNext = element(by.css('.rn-carousel-control-next'));
				  isClickable = EC.elementToBeClickable(carouselNext);
				  browser.wait(isClickable, 30000);
				  var j = 0;
					  for(;j < totalSlides - 1; j++) {
						  carouselNext.click().then(function(){
							  carouselNext = element(by.css('.rn-carousel-control-next'));
							  var carouselPrev = element(by.css('.rn-carousel-control-prev'));
							  isClickable = EC.elementToBeClickable(carouselPrev);
							  browser.wait(isClickable, 30000);
							  expect(carouselPrev.isDisplayed()).toBeTruthy();
						  });
					  }
					  var carouselPrev = element(by.css('.rn-carousel-control-prev'));
					  for(;j > 0; j--) {
						  carouselPrev.click().then(function(){
							  carouselNext = element(by.css('.rn-carousel-control-next'));
							  isClickable = EC.elementToBeClickable(carouselNext);
							  browser.wait(isClickable, 30000);
							  expect(carouselNext.isDisplayed()).toBeTruthy();
							  carouselPrev = element(by.css('.rn-carousel-control-prev'));
						  });
					  }
					  
					  var itemSlider = sliderCont.get(0).all(by.repeater('item in slides'));
					  var trackLink = itemSlider.get(0).all(by.css('.track')).get(0);
					  var introJsWidget = true;
					  trackLink.all(by.css('.subtrack')).get(0).getText().then(function(subTrackText){
						  if(subTrackText == 'COPILOT'){
							  introJsWidget = false;
						  } 
						  trackLink.click().then(function(){
							  if(introJsWidget == true) {
								  var toolTip = element(by.css('.introjs-tooltip'));
								  var isClickable = EC.elementToBeClickable(toolTip);
								  browser.wait(isClickable, 30000);
								  var skipBtn = toolTip.all(by.css('.introjs-tooltipbuttons .introjs-skipbutton')).get(0);
								  isClickable = EC.elementToBeClickable(skipBtn);
								  browser.wait(isClickable, 30000);
								  skipBtn.click();
								  introJsWidget = false;;
							  }
							  var tab = element.all(by.repeater('tab in tabSet.tabs')).get(0);
							  var aDiv = tab.all(by.css('a div')).get(0);
							  expect(aDiv.waitReady()).toEqual(true);
							  expect(aDiv.isPresent()).toEqual(true);
							  expect(aDiv.getText()).toEqual('STATISTICS');
							  var pageInfo = element(by.css('.page-state-header header .ng-binding'));
							  pageInfo.getText().then(function(text){
								expect(text).toContain(subTrackText); 
								browser.navigate().back().then(function(){
									moneyEarned = element(by.id('metrics'));
									expect(moneyEarned.waitReady()).toBeTruthy();
									var isClickable = EC.elementToBeClickable(moneyEarned);
									browser.wait(isClickable, 30000);
								});
							 });
						  });
					  });
			  		});
		  } else {
		  }
	  });
	});
  };
  
  this.myChallengesDashboard = function(dashBoardUrl, myDashboardData, loginUserCred){
	  var EC = protractor.ExpectedConditions;
	  
	  browser.get(dashBoardUrl);
	  moneyEarned = element(by.id('metrics'));
	  expect(moneyEarned.waitReady()).toBeTruthy();
	  var isClickable = EC.elementToBeClickable(moneyEarned);
	  browser.wait(isClickable, 30000);
	  
	  var noChallenges = element(by.css('.noChallenges'));
	  noChallenges.isPresent().then(function(noChallengeCont){
		 if(noChallengeCont){
			 var titleText = noChallenges.all(by.css('empty-state-placeholder .title')).get(0);
			 expect(titleText.getText()).toEqual('MY CHALLENGES');
			 
			 var exploreOpenChallenges = noChallenges.all(by.partialLinkText('EXPLORE OPEN CHALLENGES')).get(0);
			 exploreOpenChallenges.click().then(function(){
				 var openChallengeHeader = element(by.css('mainContent')).all(by.css('.header-container .ng-binding')).get(0);
				 expect(openChallengeHeader.getText()).toEqual('ALL OPEN CHALLENGES');
				 
				 browser.get(dashBoardUrl);
				 moneyEarned = element(by.id('metrics'));
				 expect(moneyEarned.waitReady()).toBeTruthy();
				 var isClickable = EC.elementToBeClickable(moneyEarned);
				 browser.wait(isClickable, 30000);
			 });
		 } else {
			 var tileViewChallenges = element(by.css('.tile-view')).all(by.css('challenge-tile'));
			  if(loginUserCred.challengeCount <= 8){
				  expect(tileViewChallenges.count()).toEqual(loginUserCred.challengeCount);
			  } else {
				  expect(tileViewChallenges.count()).toEqual(8);
			  }
			  
			  var listButton = element(by.partialButtonText('List'));
			  listButton.click().then(function(){
				   var listViewChallenges = element(by.css('.list-view')).all(by.css('challenge-tile'));
				   if(loginUserCred.challengeCount < 8){
						  expect(listViewChallenges.count()).toEqual(loginUserCred.challengeCount);
				   } else {
						  expect(listViewChallenges.count()).toEqual(8);
				   }
			  });
			  
			  var gridButton = element(by.partialButtonText('Grid'));
			  gridButton.click().then(function(){
				   tileViewChallenges = element(by.css('.tile-view')).all(by.css('challenge-tile'));
				   
				   var challengeTileOne = tileViewChallenges.get(0);
				   isClickable = EC.elementToBeClickable(challengeTileOne);
				   browser.wait(isClickable, 30000);
					  
				   var firstChallengeLink = challengeTileOne.all(by.css('.active-challenge .top a')).get(0);
				   firstChallengeLink.click().then(function(){
						  var stepBox = element(by.id('stepBox'));
						  isClickable = EC.elementToBeClickable(stepBox);
						  browser.wait(isClickable, 30000);
					  
						  browser.navigate().back().then(function(){
							  moneyEarned = element(by.id('metrics'));
							  isClickable = EC.elementToBeClickable(moneyEarned);
							  browser.wait(isClickable, 30000);
							  
							  var registrantLink = challengeTileOne.all(by.css('.tile-view .active-challenge .challenge-links .registrants')).get(0);
							  
							  registrantLink.click().then(function(){
								  var stepBox = element(by.id('stepBox'));
								  isClickable = EC.elementToBeClickable(stepBox);
								  browser.wait(isClickable, 30000);
							  
								  browser.navigate().back().then(function(){
									  moneyEarned = element(by.id('metrics'));
									  isClickable = EC.elementToBeClickable(moneyEarned);
									  browser.wait(isClickable, 30000);
								  
								  
								   registrantLink = challengeTileOne.all(by.css('.tile-view .active-challenge .challenge-links .submissions')).get(0);	  
								   registrantLink.click().then(function(){
									   var stepBox = element(by.id('stepBox'));
									   isClickable = EC.elementToBeClickable(stepBox);
									   browser.wait(isClickable, 30000);
									   
									   browser.navigate().back().then(function(){
										   moneyEarned = element(by.id('metrics'));
										   isClickable = EC.elementToBeClickable(moneyEarned);
										   browser.wait(isClickable, 30000);
									   
										  
									   registrantLink = challengeTileOne.all(by.css('.tile-view .active-challenge .challenge-links .forum')).get(0);	  
									   registrantLink.click().then(function(){
										   var stepBox = element(by.id('stepBox'));
										   isClickable = EC.elementToBeClickable(stepBox);
										   browser.wait(isClickable, 30000);
										   
										   browser.get(dashBoardUrl);
										   moneyEarned = element(by.id('metrics'));
										   isClickable = EC.elementToBeClickable(moneyEarned);
										   browser.wait(isClickable, 30000);
									   });
									  });
								   });
								  });
							  });
						  });
				   }).then(function(){
					   
				   var viewAllChallengesCont = element(by.id('viewAllChallenges'));
				   var allActiveChallengesPage = viewAllChallengesCont.all(by.partialLinkText('VIEW MORE')).get(0);
				   allActiveChallengesPage.getAttribute('href').then(function(hrefValue){
					   expect(hrefValue).toEqual(myDashboardData.baseUrlPrefix +''+ myDashboardData.myChallengesViewMoreLink);
					   
					  browser.actions().mouseMove(allActiveChallengesPage).perform();
					  
					  allActiveChallengesPage.click().then(function(){
						  var myChallenges = element(by.css('.my-challenges'));
						  isClickable = EC.elementToBeClickable(myChallenges);
						  browser.wait(isClickable, 30000);
						  
						  var activeLink = element(by.partialLinkText('ACTIVE'));
						  isClickable = EC.elementToBeClickable(activeLink);
						  browser.wait(isClickable, 30000);
						  
						  var hasChallenges = element(by.css('.hasChallenges'));
						  expect(hasChallenges.isPresent()).toEqual(true);
						  
						  var tileView = element(by.css('.tile-view'));
						  browser.wait(isClickable, 30000);
						  isClickable = EC.elementToBeClickable(tileView);
						  
						  var challengeList = element(by.css('.tile-view')).all(by.css('challenge-tile'));
						  
						  if(loginUserCred.challengeCount <= 12){
							  expect(challengeList.count()).toEqual(loginUserCred.challengeCount);
						  } else {
							  var loadMoreBtn = element(by.partialLinkText('LOAD MORE'));
							  isClickable = EC.elementToBeClickable(loadMoreBtn);
							  browser.wait(isClickable, 30000);
							  loadMoreBtn.click().then(function(){
								  challengeList = element(by.css('.tile-view')).all(by.css('challenge-tile'));
								  expect(challengeList.count()).toEqual(loginUserCred.challengeCount);
							  });
						  }
						  
						  var firstChallenge = element(by.css('.hasChallenges div challenge-tile'));
						  browser.wait(isClickable, 30000);
						  isClickable = EC.elementToBeClickable(firstChallenge);
						  
						  var firstChallengeLink = firstChallenge.all(by.css('.active-challenge .top a')).get(0);
						  firstChallengeLink.click().then(function(){
							  var stepBox = element(by.id('stepBox'));
							  isClickable = EC.elementToBeClickable(stepBox);
							  browser.wait(isClickable, 30000);
						  
							  browser.navigate().back().then(function(){
								  activeLink = element(by.partialLinkText('ACTIVE'));
								  isClickable = EC.elementToBeClickable(activeLink);
								  browser.wait(isClickable, 30000);
								  
								  var registrantLink = firstChallenge.all(by.css('.tile-view .active-challenge .challenge-links .registrants')).get(0);
								  
								  registrantLink.click().then(function(){
									  var stepBox = element(by.id('stepBox'));
									  isClickable = EC.elementToBeClickable(stepBox);
									  browser.wait(isClickable, 30000);
								  
									  browser.navigate().back().then(function(){
									  
									  activeLink = element(by.partialLinkText('ACTIVE'));
									  isClickable = EC.elementToBeClickable(activeLink);
									  browser.wait(isClickable, 30000);
									  
									   registrantLink = firstChallenge.all(by.css('.tile-view .active-challenge .challenge-links .submissions')).get(0);	  
									   registrantLink.click().then(function(){
										   var stepBox = element(by.id('stepBox'));
										   isClickable = EC.elementToBeClickable(stepBox);
										   browser.wait(isClickable, 30000);
										   
										   browser.navigate().back().then(function(){
											   activeLink = element(by.partialLinkText('ACTIVE'));
											   isClickable = EC.elementToBeClickable(activeLink);
											   browser.wait(isClickable, 30000);
										   
											  
										   registrantLink = firstChallenge.all(by.css('.tile-view .active-challenge .challenge-links .forum')).get(0);	  
										   registrantLink.click().then(function(){
											   var stepBox = element(by.id('stepBox'));
											   isClickable = EC.elementToBeClickable(stepBox);
											   browser.wait(isClickable, 30000);
											   
											   browser.get(dashBoardUrl);
											   moneyEarned = element(by.id('metrics'));
											   isClickable = EC.elementToBeClickable(moneyEarned);
											   browser.wait(isClickable, 30000);
							  
											   var allPastChallenges = element(by.partialLinkText('PAST CHALLENGES'));
											   allPastChallenges.getAttribute('href').then(function(hrefValue){
												   expect(hrefValue).toEqual(myDashboardData.baseUrlPrefix + '' + myDashboardData.myChallengesPastLink);
											   
											   browser.actions().mouseMove(allPastChallenges).perform();
											   allPastChallenges.click().then(function(){
												   var myChallenges = element(by.css('.my-challenges'));
												   isClickable = EC.elementToBeClickable(myChallenges);
												   browser.wait(isClickable, 30000);
												   expect(myChallenges.getText()).toContain('MY CHALLENGES');
								  
												   tileView = element(by.css('.tile-view'));
												   isClickable = EC.elementToBeClickable(tileView);
												   browser.wait(isClickable, 30000);
								  
												   challengeList = tileView.all(by.css('challenge-tile'));
												   firstChallenge = challengeList.get(0);
												   firstChallengeLink = firstChallenge.all(by.css('.tile-view .completed-challenge a')).get(0);
												   firstChallengeLink.click().then(function(){
													   var stepBox = element(by.id('stepBox'));
													   isClickable = EC.elementToBeClickable(stepBox);
													   browser.wait(isClickable, 30000);
													   
													   browser.get(dashBoardUrl);
													   moneyEarned = element(by.id('metrics'));
													   isClickable = EC.elementToBeClickable(moneyEarned);
													   browser.wait(isClickable, 30000);
									  
												   });
											   });
										   });
										   });
									   });
									   });
								  });
								  });
							  });
					  });
					  });
				   });
			  });
			  });
		 }
	  });
	  
	  
	  
	  
  };
	  
	  
	  
	  this.goToEmptyDashboardPage = function(dashBoardUrl,loginUserCred) {
		  
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
		  var moneyEarned = element(by.id('metrics'));
		  isClickable = EC.elementToBeClickable(moneyEarned);
		  browser.wait(isClickable, 30000);
		  
		  
		  var noChallengeSection = element(by.css('.challenges .noChallenges'));
		  expect(noChallengeSection.waitReady()).toBeTruthy();
		  isClickable = EC.elementToBeClickable(noChallengeSection);
		  browser.wait(isClickable, 30000);
		  
		  var pastChallenges = element(by.partialLinkText('PAST CHALLENGES'));
		  isClickable = EC.elementToBeClickable(pastChallenges);
		  browser.wait(isClickable, 30000);
		  expect(pastChallenges.isPresent()).toEqual(true);
		  
		  pastChallenges.click().then(function(){
			  var completedChallenge = element.all(by.css('.completed-challenge')).get(0);
			  expect(completedChallenge.waitReady()).toBeTruthy();
			  isClickable = EC.elementToBeClickable(completedChallenge);
			  browser.wait(isClickable, 30000);
			  expect(completedChallenge.isPresent()).toEqual(true);
			  browser.navigate().back();
		  
			  var srmsElement = element(by.id('srms'));
			  var sectionTitle = srmsElement.all(by.css('.section-title')).get(0);
			  isClickable = EC.elementToBeClickable(sectionTitle);
			  browser.wait(isClickable, 30000);
			  expect(sectionTitle.isPresent()).toEqual(true);
		  
			  var srmLinksCard = element(by.css('.srm-links-card'));
			  expect(srmLinksCard.waitReady()).toBeTruthy();
			  expect(srmLinksCard.isPresent()).toEqual(true);
		  
			  var practiceProblems = element(by.partialLinkText('PRACTICE PROBLEMS'));
			  practiceProblems.click().then(function(){
			  
			  browser.get(dashBoardUrl);
			  var menuItemHeaders = element.all(by.css('.menu-item-header'));
			  var nameHeader = menuItemHeaders.get(1);
			  var isClickable = EC.elementToBeClickable(nameHeader);
			  var moneyEarned = element(by.id('metrics'));
			  isClickable = EC.elementToBeClickable(moneyEarned);
			  browser.wait(isClickable, 30000);
			 
				 var problemArchivesLink = element(by.partialLinkText('PROBLEM ARCHIVE'));
				 isClickable = EC.elementToBeClickable(problemArchivesLink);
				 browser.wait(isClickable, 30000);
				 expect(problemArchivesLink.waitReady()).toBeTruthy();
				 problemArchivesLink.click().then(function(){
					 browser.driver.wait(function(){
						 var loginBtn = browser.driver.findElement(by.name('class'));
						 return true;
					 },30000);
					 
					 browser.navigate().back().then(function(){
					 
					 var matchEditorialLink = element(by.partialLinkText('LEARN MORE'));
					 isClickable = EC.elementToBeClickable(matchEditorialLink);
					 browser.wait(isClickable, 30000);
					  
					 matchEditorialLink.click().then(function(){
						  
						  
						 browser.driver.wait(function(){
							 var memberOnBoardingMsg = browser.driver.findElement(by.id('single-member-onboarding'));
							 return true;
						 },30000); 
						 
						 browser.get(dashBoardUrl);
						 var pastSrmsLink = element(by.partialLinkText('VIEW PAST SRMS'));
						 isClickable = EC.elementToBeClickable(pastSrmsLink);
						 browser.wait(isClickable, 30000);
						 
						 pastSrmsLink.click().then(function(){
							 var findSrms = element(by.partialLinkText('FIND SRMS'));
							 isClickable = EC.elementToBeClickable(findSrms);
							 browser.wait(isClickable, 30000);
							 
							 findSrms.click().then(function(){
							 
						 });
						 });
					  });
				 });
				  });
		  });
		  
		  });
		  });
	  };
		  
		  
		  this.goToEmptyDahsboardRestLinks = function(dashBoardUrl, loginUserCred) {
			  browser.driver.ignoreSynchronization = true;
				
			  var EC = protractor.ExpectedConditions;
			  
			  var launchArena = element(by.partialLinkText('LAUNCH ARENA'));
			  isClickable = EC.elementToBeClickable(launchArena);
			  browser.wait(isClickable, 30000);
			  
			  launchArena.click().then(function(){
				  browser.navigate().back().then(function(){
							
						  var iosChallenges = element(by.css('.badge-and-challenges')).all(by.partialLinkText('VIEW CHALLENGES'));
						  iosChallenges.get(0).click().then(function(){
							  browser.get(dashBoardUrl);
							  moneyEarned = element(by.id('metrics'));
							  isClickable = EC.elementToBeClickable(moneyEarned);
							  browser.wait(isClickable, 70000);
							  
							  var iosCards = element(by.css('.badge-and-challenges')).all(by.css('ios-card'));
							  expect(iosCards.count()).toEqual(3);
							  var firstIos = iosCards.get(0);
							  var firstChallengeIos = firstIos.all(by.css('.top a')).get(0);
							  firstChallengeIos.click().then(function(){
								  var cdNgMain = element(by.id('cdNgMain'));
								  isClickable = EC.elementToBeClickable(cdNgMain);
								  browser.wait(isClickable, 70000);
								  
								  browser.get(dashBoardUrl);
								  
								  var postLinks = element.all(by.css('.posts .post'));
								  var postLink = postLinks.get(0);
								  expect(postLink.waitReady()).toBeTruthy();
								  
								  var blogLink = postLink.all(by.css('.blog-link a')).get(0);
								  expect(blogLink.waitReady()).toBeTruthy();
									  
								  blogLink.click().then(function(){
									  		browser.get(dashBoardUrl);
								  });
									  
								  });
							  });
						
					 });
				 });
		  };
};
module.exports = new MyDashboardPage();