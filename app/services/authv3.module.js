'use strict'

import angular from 'angular'
require('angular-jwt')
import { getFreshToken, configureConnector } from 'tc-accounts'

configureConnector({
  connectorUrl: process.env.CONNECTOR_URL,
  frameId: 'tc-accounts-iframe'
})

const dependencies = ['angular-jwt']

const config = function($httpProvider, jwtInterceptorProvider) {
  function jwtInterceptor() {
    return getFreshToken()
  }

  jwtInterceptorProvider.tokenGetter = jwtInterceptor

  $httpProvider.interceptors.push('jwtInterceptor')
}

config.$inject = ['$httpProvider', 'jwtInterceptorProvider']

angular.module('appirio-tech-ng-auth', dependencies).config(config)

// These must come after the module definition
require('./userv3.service.js')