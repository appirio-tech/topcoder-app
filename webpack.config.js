require('./node_modules/coffee-script/register')

if (process.env.TRAVIS_BRANCH == 'master') process.env.ENV = 'PROD'
else if (process.env.TRAVIS_BRANCH == 'qa-integration') process.env.ENV = 'QA'
else if (process.env.TRAVIS_BRANCH == 'dev') process.env.ENV = 'DEV'
else process.env.ENV = 'DEV'

var config = require('appirio-tech-webpack-config')({
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

if (process.env.TRAVIS_BRANCH) config.output.publicPath = process.env.ASSET_PREFIX

module.exports = config
