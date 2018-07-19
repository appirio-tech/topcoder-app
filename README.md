#### Dev [![Build Status](https://travis-ci.org/appirio-tech/topcoder-app.svg?branch=dev)](https://travis-ci.org/appirio-tech/topcoder-app) QA [![Build Status](https://travis-ci.org/appirio-tech/topcoder-app.svg?branch=qa-integration)](https://travis-ci.org/appirio-tech/topcoder-app) Master [![Build Status](https://travis-ci.org/appirio-tech/topcoder-app.svg?branch=master)](https://travis-ci.org/appirio-tech/topcoder-app)
# Topcoder-App

Topcoder-App is an Angular application that contains dashboard, profile, settings, login/registration, and design submissions.

The technologies used are NPM, Webpack, ES2015, Jade, SCSS, and Angular 1.x. 

## Installation

We use node 5.x and npm 3.x, so you may need to download a new version of node. The easiest way is to download [nvm](https://github.com/creationix/nvm). We have a `.nvmrc` file in the root of the project, so you can just run `nvm use` to switch to the correct version of node.

Install dependencies by running the following in the root of the project:
 - `npm i`
 - **Note:** You must use npm 3. Type `npm -v` to ensure you have a 3.x version.

In order to test a logged in user, you must make an entry in your `/etc/hosts` file, pointing `local.topcoder-dev.com` to `localhost`. For example, open your `/etc/hosts` file with something like `vim /etc/hosts` and add `127.0.0.1 local.topcoder-dev.com`.

## NPM Commands
- To run locally: `npm start` and head to `local.topcoder-dev.com:3000/login`
- To create the build: `npm run build`
- To run code linting: `npm run lint`
- To run the tests: `npm test`

## Running against Production backend
To run this App against the production backend, you should configure your system in a way that a call to `local.topcoder.com` redirects to `localhost:3000` where the App is running. Then you just `npm run start-prod`, go to `local.topcoder.com` and use your credentials for the production web site (and, sure, be careful with what you are doing, it all will go through the production TopCoder API).

To make the mentioned configuration on Ubuntu 16.04 you:
- Add `127.0.0.1 local.topcoder.com` to your `/etc/hosts`
- `$ sudo apt install libcap2-bin`
- `$ which node` to figure out your `path/to/node`
- `$ sudo setcap cap_net_bind_service=+ep /path/to/node`
- Now run the App.

*Disclaimer: I have no idea, what setcap does here, and how safe it is, but it does the job. Feel free to add your comments / modify this section, if you know more about it. Also, if you know how to make such configuration on other OS, please add it here.*
 
## Test Users
- general member user accounts:  
  - ksmith/Topcoder123$
  - dan_developer/dantopcoder123
- Create your own:
  - You may register your own account at https://local.topcoder-dev.com/register

# Configuration

### Notifications in the Dashboard

There's a constant `VIDEO_DEFAULT_HEIGHT` has been added to /app/topcoder.constants.js, the value will be used as the default height when a banner expanded.

To add a new notification, append a new configuration object to /app/my-dashboard/notifications/news.json, the configuration object has following properties:

- customTag: allows to show a custom tag in the collapsed notification, similarly to the LIVE tag. If provided, it should be an object with three fields: `text` - the label on the tag, `color` - text color of the tag (defaults to white), `background` - background color of the tag (defaults to red, the same as for LIVE tag).
- header: header text displayed when collapsed.
- details: details text displayed when collapsed.
- headerExpand: header text displayed when expanded, use `header` if this property is falsy
- detailsExpand: details text displayed when expanded, use `details` if this property is falsy
- backgroundImage: background image used when expaneded, the path is relative to /assets/images/news
- redirectTo: the url will redirect to when user click the `Learn more` button, will hide the button if this property is falsy
- redirectText: the text will be displayed on the `Learn more` button, will hide the button if this property is falsy
- videoCode: the video resource code to embed when expanded
- live: show the live flag or not when collapsed
- liveExpand: show the live flag or not when expanded
- height: height of the expanded view, any non-falsy value of this property will override the default height, i.e. `VIDEO_DEFAULT_HEIGHT` in /app/topcoder.constants.js

### Banners in the Dashboard

You can edit `/app/my-dashboard/notifications/notifications.jade` to update the banners. Element with class `banner-row` represents a row of banners, anchor element with class `banner` represents a banner, you can place as many banners as you want in a row, just make sure it have a proper appearance, all banners in one row have same width.
  
# Recommended Developer Tools

Syntax highlighting for ES6 and React JSX
- Install [babel](https://packagecontrol.io/packages/Babel) via the package manager in Sublime Text
  - **Note:** Sublime Text 3 is required for this plugin
- Set the plugin as the default syntax for a particular extension
  - Open a file with the `.js` extension
  - Select `View` from the menu
  - Then `Syntax -> Open all with current extension as...`
  - Then `Babel -> JavaScript (Babel)`
  - Repeat for any other extensions, e.g. `.jsx`

Recommended Theme
- Install [Oceanic Next Color Theme](https://github.com/voronianski/oceanic-next-color-scheme) via the Sublime Text package manager.
- Add the following to `Sublime Text -> Preferences -> Settings-User` (`⌘ + ,` on Mac)
```
{
  "color_scheme": "Packages/Oceanic Next Color Scheme/Oceanic Next.tmTheme",
  "theme": "Oceanic Next.sublime-theme"
}
```

JavaScript linting
- Install [ESLint](http://eslint.org/docs/user-guide/getting-started) with `npm i -g eslint`
- For new projects, you can create a local `.eslintrc.json` file by running `eslint --init`
  - **Note:** If you're using ES6, make sure you add `"modules": true` to `"ecmaFeatures"` and `"node": true` to `"env"` in your `.eslintrc.json` file
  - **Note:** If you are using React, make sure you have `eslint` and `eslint-plugin-react` as `devDependencies` in your `package.json` file

Automatic JavaScript linting in Sublime Text
- Install [SublimeLinter](http://sublimelinter.readthedocs.org/en/latest/installation.html) following the instructions under "Installing via Package Control"
- Install [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint) with the package manager. The package is called `SublimeLinter-contrib-eslint`

### Testing

The tests folder contains mock data (`tests/test-helpers/mock-data.js`). To run tests, use `npm test`.

Spec files live alongside the code they are testing. For example, in peer-review you have `review-status.controller.js` and `review-status.spec.js` in the same review-status folder.

### Description of Files and Folders

#### app
This folder holds all of our Angular JavaScript and Jade files. Here you'll find the top level Angular app in `topcoder.module.js`. It has all of our submodules as dependencies (tc.peer-review, tc.account, etc.). Each submodule has its own folder, including its own Angular module declaration, e.g. `peer-review/peer-review.module.js`. All files are named according to their Angular component, e.g. `review-status.controller.js`, `peer-review.routes.js`.

#### app/services
Services live in their own folder. All services are part of the tc.services module, which is a dependency of `topcoder.module.js`.

#### assets
  - The assets folder contains CSS, fonts, images, and scripts
  - CSS
    - Each Angular submodule has a CSS folder with the same name
    - All files are in the `.scss` format
  - Scripts
    - This folder contains our analytics, e.g. Google, New Relic, etc.

## UI-Router and States
See any `*.routes.js` file as an example.

**Important:** Make sure the url in your routes files ends with a slash `/`

## Contributing

### Style Guide and Naming Conventions

  - Our travis build runs `npm run lint` and `npm test`, so make sure your code adheres to the code style enforced by our linters
  - Please use ES2015 syntax whenever possible
  - Use the Angular style guide mentioned below

In general, follow this [AngularJS style guide](https://github.com/johnpapa/angular-styleguide), which covers JavaScript code style, JavaScript variable naming, and file naming conventions. One deviation is in the naming of services, where we follow the same pattern as controllers, e.g. UserService, ProfileService.

### Pull Requests

To contribute to the repository, please create a feature branch off of the dev branch. Once you're finished working on the feature, make a pull request to merge it into dev. Then, make sure to delete the branch when it's no longer used.
Further, please make sure every pull request has passed the build checks, which appears just before the "Merge pull request" button in github. We are trying to show the unit tests results as well along with the build.

### Adding New Content

Jade Files
  - Use `index.jade` any other module's Jade files as a guide for syntax
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
  - Follow the [BEM](https://en.bem.info/method/naming-convention/) naming convention
  - Use variables, mixins, and classes as much as possible from our [style guide](https://github.com/appirio-tech/styles)
  - Reuse our [UI Components](https://github.com/appirio-tech/ng-ui-components)
  - When adding media queries, nest them inside the element, rather than creating a new section
  ```
  .box {
    height: 50px;
    width: 50px;
    @media screen and (min-width: 768px) {
      height: 100px;
      width: 100px;
    }

    .inside-box {
      font-size: 14px;
      @media screen and (min-width: 768px) {
        font-size: 18px;
      }
    }
  }
  ```
  - This repository uses flexbox for arranging content. The use of any extra CSS libraries should be discussed with the team

JavaScript
  - Use ES2015
  - See this section on [naming conventions and style guide](https://github.com/appirio-tech/topcoder-app/blob/dev/README.md#style-guide-and-naming-conventions)

Creating New Views/Pages
  - To add a new page, create a folder in the app directory and follow the naming conventions found elsewhere, e.g. `login.controller.js`, `login.jade`, `login.spec.js`, etc.  Make sure to add a new state in the submodule's routes file.
