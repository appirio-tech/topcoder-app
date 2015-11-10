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
  
  
  
  
  this.goToDahsboardRestLinks = function(dashBoardUrl, loginUserCred) {
	  browser.driver.ignoreSynchronization = true;
		
	  var EC = protractor.ExpectedConditions;
	  browser.get(dashBoardUrl);
	  var pastSrms = element(by.partialLinkText('VIEW PAST SRMS'));
		 browser.actions().mouseMove(pastSrms).perform();
		 pastSrms.click().then(function(){
			 console.log('pastSrms '+pastSrms);
			 var upcoming = element(by.partialLinkText('UPCOMING'));
			 isClickable = EC.elementToBeClickable(upcoming);
			 browser.wait(isClickable, 70000);
			 
			 browser.get(dashBoardUrl);
			 
			 moneyEarned = element(by.css('.money-earned'));
			 isClickable = EC.elementToBeClickable(moneyEarned);
			 browser.wait(isClickable, 30000);
			 
			 var launchArena = element(by.partialLinkText('LAUNCH ARENA'));
			 browser.actions().mouseMove(launchArena).perform();
			 isClickable = EC.elementToBeClickable(launchArena);
			 browser.wait(isClickable, 70000);
			 
			 launchArena.click().then(function(){
				 
				 browser.get(dashBoardUrl);
				 
				 moneyEarned = element(by.css('.money-earned'));
				 isClickable = EC.elementToBeClickable(moneyEarned);
				 browser.wait(isClickable, 70000);
				 
					  var iosChallenges = element(by.css('.badge-and-challenges')).all(by.partialLinkText('VIEW CHALLENGES'));
					  iosChallenges.get(0).click().then(function(){
//						  var landingBanner = element(by.css('.landing-banner'));
//						  isClickable = EC.elementToBeClickable(landingBanner);
//						  browser.wait(isClickable, 170000);
						  
						  
						  browser.get(dashBoardUrl);
						  moneyEarned = element(by.css('.money-earned'));
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
  
  
  
  this.goToDashboardPage = function(dashBoardUrl,loginUserCred) {
	  
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
	  var moneyEarned = element(by.css('.money-earned'));
	  var isClickable = EC.elementToBeClickable(moneyEarned);
	  browser.wait(isClickable, 30000);
	  
	  var ratings = element(by.css('.ratings'));
	  var carouselCont = ratings.all(by.css('ul')).get(0);
	  var carouselNext = element(by.css('.rn-carousel-control-next'));
	  var subTrackList = element.all(by.repeater('subtracks in vm.subtrackRanksCollection'));
	  var subTrackCount = subTrackList.count();
	  var counter = 0;
	  carouselNext.click().then(function(displayed){
		  carouselNext = element(by.css('.rn-carousel-control-next'));
		  var carouselPrev = element(by.css('.rn-carousel-control-prev'));
		  isClickable = EC.elementToBeClickable(carouselPrev);
		  browser.wait(isClickable, 30000);
		  carouselPrev.click();
	  });

	  
	  
	  var tileViewChallenges = element(by.css('.tile-view')).all(by.css('challenge-tile'));
	  
	  expect(tileViewChallenges.count()).toEqual(loginUserCred.challengeCount);
	  
	  var listButton = element(by.partialButtonText('List'));
	  listButton.click().then(function(){
		   var listViewChallenges = element(by.css('.list-view')).all(by.css('challenge-tile'));
		   expect(listViewChallenges.count()).toEqual(2);
	  });
	  
	  var gridButton = element(by.partialButtonText('Grid'));
	  gridButton.click().then(function(){
		   tileViewChallenges = element(by.css('.tile-view')).all(by.css('challenge-tile'));
		   expect(tileViewChallenges.count()).toEqual(loginUserCred.challengeCount);
		   var allActiveChallengesPage = element(by.partialLinkText('VIEW MORE'));
			  browser.actions().mouseMove(allActiveChallengesPage).perform();
			  
			  allActiveChallengesPage.click().then(function(){
				  var myChallenges = element(by.css('.my-challenges'));
				  isClickable = EC.elementToBeClickable(myChallenges);
				  browser.wait(isClickable, 30000);
				  console.log(myChallenges.getText());
//				  expect(myChallenges.getText()).toContain('DASHBOARD // MY CHALLENGES');
				  
				  var tileView = element(by.css('.tile-view'));
				  var challengeList = tileView.all(by.css('challenge-tile'));
				  var firstChallenge = challengeList.get(0);
				  var firstChallengeLink = firstChallenge.all(by.css('.tile-view .active-challenge a')).get(0);
//				  firstChallengeLink.click().then(function(){
//					  var stepBox = element(by.id('stepBox'));
//					  isClickable = EC.elementToBeClickable(stepBox);
//					  browser.wait(isClickable, 30000);
//				  });
				  
				  browser.get(dashBoardUrl);
				  moneyEarned = element(by.css('.money-earned'));
				  isClickable = EC.elementToBeClickable(moneyEarned);
				  browser.wait(isClickable, 30000);
				  
				  var allPastChallenges = element(by.partialLinkText('PAST CHALLENGES'));
				  browser.actions().mouseMove(allPastChallenges).perform();
				  allPastChallenges.click().then(function(){
					  var myChallenges = element(by.css('.my-challenges'));
					  isClickable = EC.elementToBeClickable(myChallenges);
					  browser.wait(isClickable, 30000);
					  console.log(myChallenges.getText());
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
						  
					  });
						  
					  browser.get(dashBoardUrl);
					  moneyEarned = element(by.css('.money-earned'));
					  isClickable = EC.elementToBeClickable(moneyEarned);
					  browser.wait(isClickable, 30000);
					  var srmTiles = element(by.css('.srm-tiles')).all(by.css('srm-tile'));
					  expect(srmTiles.count()).toEqual(loginUserCred.srmCount);
					  
					  var practiceProblems = element(by.partialLinkText('PRACTICE PROBLEMS'));
					  practiceProblems.click().then(function(){
						  
						  browser.get(dashBoardUrl);
						  var menuItemHeaders = element.all(by.css('.menu-item-header'));
						  var nameHeader = menuItemHeaders.get(1);
						  var isClickable = EC.elementToBeClickable(nameHeader);
						  var moneyEarned = element(by.css('.money-earned'));
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
	  });
  });
	  
  };
	  
	  
	  
	  this.goToEmptyDashboardPage = function(dashBoardUrl,loginUserCred) {
		  
		  browser.driver.ignoreSynchronization = true;
		  var EC = protractor.ExpectedConditions;
		  
//		  browser.get(dashBoardUrl);
		  
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
		  var moneyEarned = element(by.css('.money-earned'));
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
			  var moneyEarned = element(by.css('.money-earned'));
			  isClickable = EC.elementToBeClickable(moneyEarned);
			  browser.wait(isClickable, 30000);
			 
//			 browser.navigate().back().then(function(){
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
								 
							 
//								 browser.get(dashBoardUrl);
//								 var menuItemHeaders = element.all(by.css('.menu-item-header'));
//								 var nameHeader = menuItemHeaders.get(1);
//								 var isClickable = EC.elementToBeClickable(nameHeader);
//								 var moneyEarned = element(by.css('.money-earned'));
//								 isClickable = EC.elementToBeClickable(moneyEarned);
//								 browser.wait(isClickable, 30000);
						 });
						 });
					  });
				 });
				  });
//			 });
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
//					  var iosState = element(by.css('.ios .unregistered .empty-state-placeholder'));
//					  isClickable = EC.elementToBeClickable(iosState);
//					  browser.wait(isClickable, 30000);
						
//					  expect(iosState.isPresent()).toEqual(true);
						
//					  var participateLink = iosState.all(by.partialLinkText('PARTICIPATE')).get(0);
//					  participateLink.click().then(function(){
							//////////////
							
						  var iosChallenges = element(by.css('.badge-and-challenges')).all(by.partialLinkText('VIEW CHALLENGES'));
						  iosChallenges.get(0).click().then(function(){
//								  var landingBanner = element(by.css('.landing-banner'));
//								  isClickable = EC.elementToBeClickable(landingBanner);
//								  browser.wait(isClickable, 170000);
								  
								  
							  browser.get(dashBoardUrl);
							  moneyEarned = element(by.css('.money-earned'));
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
									  
//								  element.all(by.css('.posts .post')).each(function(elem, index) {
								  blogLink.click().then(function(){
									  		browser.get(dashBoardUrl);
								  });
//										});
									  
								  });
							  });
//						});
						
					 });
				 });
		  };
	  
	  
	  
	 /** 
	  var allActiveChallengesPage = element(by.partialLinkText('VIEW ALL ACTIVE CHALLENGES'));
	  browser.actions().mouseMove(allActiveChallengesPage).perform();
	  allActiveChallengesPage.click().then(function(){
		 browser.get(dashBoardUrl);
		 var allPastChallenges = element(by.partialLinkText('VIEW ALL PAST CHALLENGES'));
		 browser.actions().mouseMove(allPastChallenges).perform();
		 allPastChallenges.click().then(function(){
			 browser.get(dashBoardUrl);
			 
		 });
	  });
	  
	  
	  var srmTiles = element(by.css('.srm-tiles')).all(by.css('srm-tile'));
	  expect(srmTiles.count()).toEqual(3);
	  var problemArchivesLink = element(by.partialLinkText('PROBLEM ARCHIVES'));
	  problemArchivesLink.click().then(function(){
		  browser.get(dashBoardUrl);
		  var matchEditorialLink = element(by.partialLinkText('MATCH EDITORIALS'));
		  isClickable = EC.elementToBeClickable(matchEditorialLink);
		  browser.wait(isClickable, 30000);
		  matchEditorialLink.click().then(function(){
			  var learnMoreLink = element(by.partialLinkText('LEARN MORE'));
			  isClickable = EC.elementToBeClickable(learnMoreLink);
			  browser.wait(isClickable, 30000);
			  learnMoreLink.click().then(function(){
				  console.log('hi');
			  });
		  });
		  
	  });**/
//		  });
//  };
   
  
};
module.exports = new MyDashboardPage();