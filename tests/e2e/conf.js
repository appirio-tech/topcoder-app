
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
	suites: {
  	regression1: 'app/account/login/login.spec.js',
    regression4: 'app/account/register/register.spec.js'
  },

  onPrepare: function(){
  	require('protractor-linkuisref-locator')(protractor);
  	require('jasmine-reporters');
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