import angular from 'angular'

(function() {
  'use strict'

  angular.module('topcoder').filter('externalLinkColor', externalLinkColor)

  function externalLinkColor() {
    return function(provider) {
      provider = provider.replace(/ /g, '').toLowerCase()

      var providerColors = {
        'el-weblinks': '#82A0AA',
        'el-bitbucket': '#205081',
        'el-dribbble': '#EA4C89',
        'el-linkedin': '#127CB5',
        'el-twitter': '#62AADC',
        'el-stackoverflow': '#E5712A',
        'el-behance': '#188CFC',
        'el-github': '#4B3D74'
      }

      return providerColors[provider] || '#D1D3D4'
    }
  }
})()
