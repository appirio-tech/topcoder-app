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

## Guide to the Gulpfile

- To run locally without minification: `gulp serve`

- To build dist folder
 - `gulp build`

- To serve the build
 - `gulp serve-build`

- To run the test runner and view specs.html
 - `gulp serve-specs`

### Testing

Running `gulp test` will perform a single run of the unit tests with karma.
Running `gulp autotest` will keep the server running and watching files.

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

JS/ES6
  - Follow this [AngularJS style guide](https://github.com/johnpapa/angular-styleguide)

Creating New Views/Pages
  - Todo - change the following to be relevant to this particular repo:
  - To add a new page, create a folder in the app directory and a new state in app.routes.coffee
  - Name the new folder the same as the state name
  - In order to keep the SCSS files modular, a class is automatically added with the name of the state to the ui-view div in index.jade. For example, if you create a new `/feature1` state and navigate there, the div with the content will look like this: `<div class="view-container feature1">`. This allows you to have your own feature1.scss file. Use the landing.scss file as an example, where you can see how all the styles are nested in `.landing`.
