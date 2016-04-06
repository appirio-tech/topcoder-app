import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('BannerDataService', BannerDataService)

  BannerDataService.$inject = ['CONSTANTS']

  function BannerDataService(CONSTANTS) {
    var bannersData = null
    _init()

    var service = {
      getBanner: getBanner
    }

    return service

    function getBanner(stateName) {
      if (bannersData[stateName]) {
        return bannersData[stateName]
      }
      return null
    }

    function _init() {
      bannersData = {
        'tco16': {
          title: '2016 Topcoder Open',
          img: require('../../assets/images/nav/ico-tco16.svg'),
          description: 'The Topcoder Open (TCO) is our annual online and onsite tournament to celebrate and reward the community.',
          ctas: [{
            title: 'Learn More',
            url: 'http://tco16.topcoder.com/latest/overview/',
            cssClass: 'tc-btn tc-btn-s tco-cta'
          }]
        }
      }
    }
  }
})()
