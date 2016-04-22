require('./node_modules/coffee-script/register')

const CI = process.env.TRAVIS_BRANCH

if (CI === 'master') {
  process.env.ENV = 'PROD'
  process.env.DOMAIN = 'topcoder.com'
} else if (CI === 'qa') {
  process.env.ENV = 'QA'
  process.env.DOMAIN = 'topcoder-qa.com'
} else {
  process.env.ENV = 'DEV'
  process.env.DOMAIN = 'topcoder-dev.com'
}


process.env.CONNECTOR_URL = `https://accounts.${process.env.DOMAIN}/connector.html`
process.env.ACCOUNTS_APP_URL = `https://accounts.${process.env.DOMAIN}/tc`

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

module.exports = config
