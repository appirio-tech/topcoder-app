## ap-work-client ProtractorJS e2e framework
### Prerequisites
Install Node.js
on OSX use homebrew brew install node
on Windows use chocolatey choco install nodejs
Run following commands to install protractor, protractor uisref locatator package and selenium webdriver installation.
npm install -g protractor
npm install protractor-linkuisref-locator
npm install jasmine-reporters@^1.0.0
npm install protractor-html-screenshot-reporter --save-dev We have to set NODE_PATH in environment variable.
export NODE_PATH=/usr/local/lib/node_modules/npm/node_modules
webdriver-manager update
start up a server with:
webdriver-manager start

Open another terminal and go to location of your conf.js file and run following command:
protractor conf.js
### For more reference on protractor.js, please visithttps://angular.github.io/protractor/#/tutorial
Page Object Pattern is used for testing any particular type of action like login, create new project, manage project etc.
There are generally 3 js files for every specific type of test case creation. Suppose you are creating test case for login funcitonality then
1.  login.data.js - It contain data needed for testing like user name and password in json format.
2.  login.object.js - It is created to follow Page Object Pattern to separate internal logics from main sequence of test case. 
     It contain all functions needed by particular test case like 
    - opening browser and 
    - navigate to particular login page url
3. login.spec.js - It contain all sequence for particular type of test case.
4. conf.js - It contain all configuration needed to setup for protractor js. 
   Replace baseDirectory parameter of HtmlReporter with your local project repo location for report folder.
   baseDirectory: '/Volumes/Data/gitDemand/ap-work-client/test/e2e/report'
