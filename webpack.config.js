require('./node_modules/coffee-script/register')

if (process.env.TRAVIS_BRANCH == 'master') process.env.ENV = 'PROD'
if (process.env.TRAVIS_BRANCH == 'dev') process.env.ENV = 'DEV'
if (process.env.TRAVIS_BRANCH == 'qa') process.env.ENV = 'QA'

const config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.html'
})

module.exports = config
