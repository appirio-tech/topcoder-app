require('./node_modules/coffee-script/register')

const CI = process.env.TRAVIS_BRANCH

if (CI === 'master') {
  process.env.ENV = 'PROD'
  process.env.DOMAIN = 'topcoder.com'
  process.env.NODE_ENV = 'production'
} else if (CI === 'qa-integration') {
  process.env.ENV = 'QA'
  process.env.DOMAIN = 'topcoder-qa.com'
  process.env.NODE_ENV = 'production'
} else {
  process.env.ENV = 'DEV'
  process.env.DOMAIN = 'topcoder-dev.com'
  process.env.NODE_ENV = 'development'
}

var accountsAppURL = null
if (process.env.ACCOUNTS_APP_URL) {
  accountsAppURL = process.env.ACCOUNTS_APP_URL
}
var accountsConnectorURL = null
if (process.env.ACCOUNTS_APP_CONNECTOR_URL) {
  accountsConnectorURL = process.env.ACCOUNTS_APP_CONNECTOR_URL
}

const config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.jade',
  favicon: './assets/images/favicon.ico',
  uglifyOptions: {
    mangle: { except: ['Auth0'] }
  }
})

if (CI) config.output.publicPath = process.env.ASSET_PREFIX

if (accountsAppURL) {
  process.env.ACCOUNTS_APP_URL = accountsAppURL
}
if (accountsConnectorURL) {
  process.env.ACCOUNTS_APP_CONNECTOR_URL = accountsConnectorURL
}

module.exports = config
