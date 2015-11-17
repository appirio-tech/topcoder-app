# Topcoder-App
Test
This repository houses any new topcoder pages or refactored Angular apps/pages from the tc-site repository.

The technologies used are Jade, SCSS, Angular, and Gulp.

## Installation

If you don't have compass installed, run the following:
 - Windows - gem install compass
 - Linux/OS X - sudo gem install compass

Install dependencies by running the following in the root of the project:
 - npm install
 - bower install

In order to test a logged in user, you must make an entry in your /etc/hosts file, pointing local.topcoder-dev.com to localhost. For example, open your /etc/hosts file with something like `vim /etc/hosts` and add `127.0.0.1 local.topcoder-dev.com`. After you run `gulp serve`, which launches a new window or tab, change `http://localhost:3000/sample/` to `http://local.topcoder-dev.com:3000/sample/`. You will then be able to login and pick up information from the cookies with `.topcoder-dev.com` as the domain.

## Gulpfile Commands
- Run `gulp` to get the full list of commands
- To run locally without minification: `gulp serve`
- To create the build: `gulp build`
- To serve the build: `gulp serve-build`
- To run the test runner and view specs.html: `gulp serve-specs`

### Testing

Running `gulp test` will perform a single run of the unit tests with Karma in the command line.
Running `gulp autotest` will keep the server running and watching files in the command line.

To read about the file and folder structure of tests, read [this section](https://github.com/appirio-tech/topcoder-app#tests)

### Description of Files and Folders

#### .tmp
When you run `gulp serve`, it looks in .tmp for Jade files converted to HTML and SCSS files converted to CSS. It grabs JavaScript files from /app. Bower components are injected by the `gulp wiredep` task, as well as any custom JavaScript files and custom CSS.

#### app
This folder holds all of our Angular JavaScript and Jade files. Here you'll find the top level Angular app in topcoder.module.js. It has all of our submodules as dependencies (tc.peer-review, tc.account, etc.). Each submodule has its own folder, including its own Angular module declaration, e.g. 'peer-review/peer-review.module.js'. All files are named according to their Angular component, e.g. review-status.controller.js, peer-review.routes.js.

#### app/services
Services live in their own folder. All services are part of the tc.services module, which is a dependency of topcoder.module.js.

#### assets
  - The assets folder contains CSS, fonts, images, and scripts.
  - CSS
    - Each Angular submodule has a CSS folder with the same name. For each page, there is a unique class name at the top level of the html. For example, login.jade will have a wrapper called .login-container, and in login.css the top level scss class will be .login-container, with all other login CSS nested inside.
    - This repository uses flexbox for arranging content. The use of any extra CSS libraries should be discussed with the team.
  - Scripts
    - This folder contains any vendor JavaScript that does not come from bower. (Basically anything we've been using a CDN to get, but that we want to have a local copy of. This allows us to handle minification and concatenation ourselves and put it on our own CDN).

#### build
This is the optimized code ready for production. You can serve it by running `grunt serve-build`. In here we have minified, concatenated vendor.js and app.js as well as minified and concatenated app.css. Running `grunt build` also creates a templates.js file which stores all our HTML in Angular's $templateCache. This is created in .tmp, injected in the index.html, and concatenated with the rest of the app JavaScript. The last step in creating the build folder is that all of our files are revved and rewritten to have a unique filename, allowing us to put them on our CDN.

#### tests
The tests folder contains mock data (tests/test-helpers/mock-data.js). It also has a file for integration tests down the road, but this is not currently wired up (server-integration/someDataService.spec.js). To run tests, use the `gulp serve-specs` task. This serves up specs.html, where you can see all the tests passing. It will watch files and reload as you work on code and save.

Spec files live alongside the code they are testing. For example, in peer-review you have review-status.controller.js and review-status.spec.js in the same review-status folder. If you want to see an example of tests, use review-status.spec.js as an example of controller tests and services/challenge.service.spec.js as an example of service tests.

## UI-Router and States
See any *.routes.js file as an example.

## Contributing

### Style Guide and Naming Conventions

In general, follow this [AngularJS style guide](https://github.com/johnpapa/angular-styleguide), which covers JavaScript code style, JavaScript variable naming, and file naming conventions. One deviation is in the naming of services, where we follow the same pattern as controllers, e.g. UserService, ProfileService.

### Pull Requests

To contribute to the repository, please create a feature branch off of the dev branch. Once you're finished working on the feature, make a pull request to merge it into dev. Then, make sure to delete the branch when it's no longer used.

### Adding New Content

Jade Files
  - Use index.jade any other module's Jade files as a guide for syntax
  - You (usually) don't need to write the div tag
  - Add a blank line in between sibling tags and when going back one indentation level:
```
    .wrapper
      h1 Lorem ipsum
      
      p Sibling tag
      
    .wrapper2
      p Child
```

SCSS Files
  - Use SCSS syntax, but do not overly nest
  - Use variables and mixins as much as possible
  - Store new variables and mixins in the appropriate file in `assets/css/partials`
  - Since a class with the current state name is added to the ui-view (see the Creating New Views/Pages section), wrap your .scss file with this class, in order to write specific SCSS in its own file for that page.

JavaScript
  - See this section on [naming conventions and style guide](https://github.com/appirio-tech/topcoder-app/blob/dev/README.md#style-guide-and-naming-conventions)

Creating New Views/Pages
  - To add a new page, create a folder in the app directory and follow the naming conventions found elsewhere, e.g. login.controller.js, login.jade, login.spec.js, etc.  Make sure to add a new state in the submodule's routes file.
