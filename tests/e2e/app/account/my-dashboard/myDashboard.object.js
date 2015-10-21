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
							  
							  element.all(by.css('.posts .post')).each(function(elem, index) {
								  elem.all(by.css('.blog-link a')).get(0).click().then(function(){
									  browser.get(dashBoardUrl);
								  });
								});
							  
						  });
						  
						  
						  
					  });
					  
				  });
				  
			  });
  };
  
  
  
  this.goToDashboardPage = function(dashBoardUrl,loginUserCred) {
	  
	  browser.driver.ignoreSynchronization = true;
	
	  var EC = protractor.ExpectedConditions;
	  var menuItemHeaders = element.all(by.css('.menu-item-header'));
	  var nameHeader = menuItemHeaders.get(1);
	  var isClickable = EC.elementToBeClickable(nameHeader);
	  var moneyEarned = element(by.css('.money-earned'));
	  isClickable = EC.elementToBeClickable(moneyEarned);
	  browser.wait(isClickable, 30000);
	  
	  var ratings = element(by.css('.ratings'));
	  var carouselCont = ratings.all(by.css('ul')).get(0);
	  var carouselNext = element(by.css('.rn-carousel-control-next'));
	  var subTrackList = element.all(by.repeater('subtracks in vm.subtrackRanksCollection'));
	  var subTrackCount = subTrackList.count();
	  var counter = 0;
	  carouselNext.click().then(function(displayed){
		  carouselNext = element(by.css('.rn-carousel-control-next'));
	  });

	  var carouselPrev = element(by.css('.rn-carousel-control-prev'));
	  carouselPrev.click();
	  
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
//					  firstChallengeLink.click().then(function(){
//						  var stepBox = element(by.id('stepBox'));
//						  isClickable = EC.elementToBeClickable(stepBox);
//						  browser.wait(isClickable, 30000);
//						  
//					  });
						  
						  browser.get(dashBoardUrl);
							 moneyEarned = element(by.css('.money-earned'));
							 isClickable = EC.elementToBeClickable(moneyEarned);
							 browser.wait(isClickable, 30000);
							 var srmTiles = element(by.css('.srm-tiles')).all(by.css('srm-tile'));
							 expect(srmTiles.count()).toEqual(loginUserCred.srmCount);
							 var problemArchivesLink = element(by.partialLinkText('PROBLEM ARCHIVES'));
							 problemArchivesLink.click().then(function(){
//								 browser.ignoreSynchronization = true;
//								 browser.driver.wait(function() {
//									 console.log('bodyText');
//									  var bodyText = browser.driver.findElement(By.id('StayFocusd-infobar'));
//									  console.log('bodyText'+bodyText);
////									  isClickable = EC.elementToBeClickable(bodyText);
//									  
//									  return true;
//								  },30000);
								 
								 
								 browser.get(dashBoardUrl);
								 moneyEarned = element(by.css('.money-earned'));
								 isClickable = EC.elementToBeClickable(moneyEarned);
								 browser.wait(isClickable, 30000);
								 
								 var matchEditorialLink = element(by.partialLinkText('MATCH EDITORIALS'));
								 isClickable = EC.elementToBeClickable(matchEditorialLink);
								 browser.wait(isClickable, 30000);
								 browser.ignoreSynchronization = true;
								 matchEditorialLink.click().then(function(){
//									 browser.ignoreSynchronization = true;
//									 browser.driver.wait(function() { 
//										 browser.ignoreSynchronization = true;
//										 var bodyText = browser.driver.findElement(by.css('.logoSpaceLink'));
////										 isClickable = EC.elementToBeClickable(bodyText);
//										 browser.driver.get(dashBoardUrl);
//										 console.log('bodyText');
//										 return true;
//									 },70000);
									 
								 browser.get(dashBoardUrl);
								 
								 moneyEarned = element(by.css('.money-earned'));
								 isClickable = EC.elementToBeClickable(moneyEarned);
								 browser.wait(isClickable, 30000);
								 
								 var learnMoreLink = element(by.partialLinkText('LEARN MORE'));
								 isClickable = EC.elementToBeClickable(learnMoreLink);
								 browser.wait(isClickable, 30000);
								 
								 learnMoreLink.click().then(function(){
//									 browser.driver.wait(function() { 
//										 var overviewPageTitle = browser.driver.findElement(by.css('.overviewPageTitle'));
//										 isClickable = EC.elementToBeClickable(overviewPageTitle);
//										 console.log('in learnmore');
//										 return true;
//									  },30000);	 
										 
									 browser.get(dashBoardUrl);
									 moneyEarned = element(by.css('.money-earned'));
									 isClickable = EC.elementToBeClickable(moneyEarned);
									 browser.wait(isClickable, 30000);
									 
//									 var pastSrms = element(by.partialLinkText('VIEW PAST SRMS'));
//									 browser.actions().mouseMove(pastSrms).perform();
//									 pastSrms.click().then(function(){
//										 console.log('pastSrms '+pastSrms);
//										 var upcoming = element(by.partialLinkText('UPCOMING'));
//										 isClickable = EC.elementToBeClickable(upcoming);
//										 browser.wait(isClickable, 70000);
//										 
//										 browser.get(dashBoardUrl);
//										 
//										 moneyEarned = element(by.css('.money-earned'));
//										 isClickable = EC.elementToBeClickable(moneyEarned);
//										 browser.wait(isClickable, 30000);
//										 
//										 var launchArena = element(by.partialLinkText('LAUNCH ARENA'));
//										 browser.actions().mouseMove(launchArena).perform();
//										 isClickable = EC.elementToBeClickable(launchArena);
//										 browser.wait(isClickable, 70000);
//										 
//										 launchArena.click().then(function(){
//											 browser.get(dashBoardUrl);
//											 moneyEarned = element(by.css('.money-earned'));
//											 isClickable = EC.elementToBeClickable(moneyEarned);
//											 browser.wait(isClickable, 70000);
//											 
//												  var iosChallenges = element(by.css('.badge-and-challenges')).all(by.partialLinkText('View Challenges'));
//												  iosChallenges.get(0).click().then(function(){
//													  browser.get(dashBoardUrl);
//													  moneyEarned = element(by.css('.money-earned'));
//													  isClickable = EC.elementToBeClickable(moneyEarned);
//													  browser.wait(isClickable, 70000);
//													  
//													  var iosCards = element(by.css('.badge-and-challenges')).all(by.css('ios-card'));
//													  expect(iosCards.count()).toEqual(3);
//													  var firstIos = iosCards.get(0);
//													  var firstChallengeIos = firstIos.all(by.css('.top a')).get(0);
//													  firstChallengeIos.click();
//													  
//													  element.all(by.repeater('blog in vm.blogPosts | orderBy : pubDate | limitTo : 4')).each(function(elem, index) {
//														  
//														  elem.all(by.css('.blog-link a')).get(0).click().then(function(){
//															  browser.get(dashBoardUrl);
//														  });
//														});
//													  
//												  });
//												  
//											  });
//											  
//										  });
									  });
								  });
								  
							  });
						  
//					  });
					  
					  
//					  browser.driver.wait(function() {
//						  var emailId = browser.driver.findElement(by.id('username_or_email'));
//						  console.log('twitter username');
//						  emailId.sendKeys(loginUser1.username);
//						  return true;
//					  },30000);
					
				 });
			  });
	  });
	  
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
	  
  };
   
  
};
module.exports = new MyDashboardPage();