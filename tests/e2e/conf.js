
exports.config = {
    //seleniumServerJar: "node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.45.0.jar",
    seleniumAddress: 'http://localhost:4444/wd/hub',
	//specs: ['specs/regression/*Spec.js'],
	suites: {
		regression1: 'app/account/login/login.spec.js',
        regression2: 'app/account/register/register.spec.js',
        regression3: 'app/account/profile/profile.spec.js',
        regression4: 'app/account/account/account.spec.js',
        regression5: 'app/account/my-dashboard/myDashboard.spec.js',
        regression6: 'app/account/reset-password/reset-password.spec.js'
	  },
    //baseUrl: 'http://qualityshepherd.com/angular',
    //framework: 'jasmine2',
	  
//	  allScriptsTimeout: 500000,

  onPrepare: function(){
	  browser.manage().window().setSize(1280, 1080);
  	require('protractor-linkuisref-locator')(protractor);
//  	require('jasmine-reporters');
  	require('./waitReady.js');
  	var HtmlReporter = require('protractor-html-screenshot-reporter');
      // set implicit wait times in ms...
      //browser.manage().timeouts().pageLoadTimeout(10000);
      browser.manage().timeouts().implicitlyWait(2000);
      
      var reporter=new HtmlReporter({
        baseDirectory: 'tests/e2e/report', // a location to store screen shots.
      	docTitle: 'Protractor Demo Reporter',
        docName:    'protractor-demo-tests-report.html'
      });
      
      jasmine.getEnv().addReporter(
    		reporter
      );
  },
  
  capabilities: {
	  'browserName': 'firefox'
	},

	jasmineNodeOpts: {
		isVerbose: true,
		includeStackTrace: true,
		showColors: true,
		defaultTimeoutInterval: 600000,
        print: function() {}
	}
};