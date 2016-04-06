/*eslint-disable*/
require('./node_modules/coffee-script/register')

const CI = process.env.TRAVIS_BRANCH

console.log('before **************', process.env.ENV)
if (CI == 'master')         process.env.ENV = 'PROD'
if (CI == 'qa-integration') process.env.ENV = 'QA'
if (CI == 'dev')            process.env.ENV = 'DEV'

console.log('***************', CI)
console.log('***************', process.env.ENV)

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
