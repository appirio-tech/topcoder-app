# Topcoder-App
This repository houses any new topcoder pages or refactored angular apps/pages from the tc-site repository.

The technologies used are Jade, SCSS, ES6, Angular, and Gulp.

## Installation

If you don't have compass installed, run the following:
 - Windows - gem install compass
 - Linux/OS X - sudo gem install compass

Install dependencies by running the following in the root of the project:
 - npm install
 - bower install

## Gulpfile Commands
- Run `gulp` to get the full list of commands
- To run locally without minification: `gulp serve`
- To create the build: `gulp build`
- To serve the build: `gulp serve-build`
- To run the test runner and view specs.html: `gulp serve-specs`

### Testing

Running `gulp test` will perform a single run of the unit tests with karma in the command line.
Running `gulp autotest` will keep the server running and watching files in the command line.

## Contributing

### Pull Requests

To contribute to the repository, please create a feature branch off of the dev branch. Once you're finished working on the feature, make a pull request to merge it into dev. Then, make sure to delete the branch when it's no longer used.

### Adding New Content

Jade Files
  - Use index.jade any other module's jade files as a guide for syntax
  - You (usually) don't need to write the div tag

SCSS Files
  - Use SCSS syntax (nesting)
  - Use variables and mixins as much as possible
  - Store new variables and mixins in the appropriate file in `assets/css/partials`
  - Since a class with the current state name is added to the ui-view (see the Creating New Views/Pages section), wrap your .scss file with this class, in order to write specific scss in its own file for that page.

JS/ES6
  - Follow this [AngularJS style guide](https://github.com/johnpapa/angular-styleguide)

Creating New Views/Pages
  - To add a new page, create a folder in the app directory and follow the naming conventions found elsewhere, e.g. login.controller.js, login.jade, login.spec.js, etc.  Make sure to add a new state in the module's routes file.
  - In order to keep the SCSS files modular, a class is automatically added with the name of the state to the ui-view div in index.jade. For example, if you create a new `/feature1` state and navigate there, the div with the content will look like this: `<div class="view-container feature1">`.
