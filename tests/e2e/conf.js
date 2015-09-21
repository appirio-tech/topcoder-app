
exports.config = {
    //seleniumServerJar: "node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.45.0.jar",
    seleniumAddress: 'http://localhost:4444/wd/hub',
	//specs: ['specs/regression/*Spec.js'],
	suites: {
//		regression0: 'app/auth/reg.spec.js'
//		regression1: 'app/account/login/login.spec.js'//,
//		regression2: 'app/manage/newproject.spec.js'//,
//	    regression3: 'app/manage/manage.spec.js',
        regression4: 'app/account/register/register.spec.js'//,
//        regression5: 'app/account/reset-password/reset-password.spec.js'
	  },
    //baseUrl: 'http://qualityshepherd.com/angular',
    //framework: 'jasmine2',
	  
//	  allScriptsTimeout: 500000,

  onPrepare: function(){
  	require('protractor-linkuisref-locator')(protractor);
  	require('jasmine-reporters');
  	var HtmlReporter = require('protractor-html-screenshot-reporter');
      // set implicit wait times in ms...
      //browser.manage().timeouts().pageLoadTimeout(10000);
      browser.manage().timeouts().implicitlyWait(2000);
      
      var reporter=new HtmlReporter({
        baseDirectory: '/Volumes/Data/supplyGit/topcoder-app/tests/e2e/report', // a location to store screen shots.
      	docTitle: 'Protractor Demo Reporter',
        docName:    'protractor-demo-tests-report.html'
      });
      
      jasmine.getEnv().addReporter(
    		reporter
      );
  },
  
  capabilities: {
	  'browserName': 'chrome'
	},

	jasmineNodeOpts: {
		isVerbose: true,
		includeStackTrace: true,
		showColors: true,
		defaultTimeoutInterval: 30000,
        print: function() {}
	}
};