import angular from 'angular'

(function() {
  'use strict'

  angular.module('tc.services').factory('CommunityDataService', CommunityDataService)

  CommunityDataService.$inject = ['$q']

  function CommunityDataService($q) {
    var service = {
      getMembersData: getMembersData,
      getStatisticsData: getStatisticsData
    }
    return service

    ///////////////////////

    function getMembersData() {
      var deferred = $q.defer()
      var data = {
        'memberLeaderboard': [
          {
            'avatar': '//www.topcoder.com/i/m/Sky_.jpeg',
            'name': 'Sky_',
            'contestType': 'Development',
            'description': '',
            'class': 'develop'
          }, {
            'avatar': '//topcoder-prod-media.s3.amazonaws.com/member/profile/birdofpreyru-1474623113239.jpeg',
            'name': 'birdofpreyru',
            'contestType': 'Development',
            'description': '',
            'class': 'develop'
          }, {
            'avatar': '//topcoder-prod-media.s3.amazonaws.com/member/profile/thomaskranitsas-1478960109561.jpeg',
            'name': 'thomaskranitsas',
            'contestType': 'Development',
            'description': '',
            'class': 'develop'
          }, {
            'avatar': '//topcoder-prod-media.s3.amazonaws.com/member/profile/Ravijune-1471983063227.jpeg',
            'name': 'Ravijune',
            'contestType': 'Design',
            'description': '',
            'class': 'design'
          }, {
            'avatar': '//www.topcoder.com/i/m/f0rc0d3r.jpeg',
            'name': 'f0rc0d3r',
            'contestType': 'Design',
            'description': '',
            'class': 'design'
          }, {
            'avatar': '//www.topcoder.com/i/m/ltaravilse.jpeg',
            'name': 'ltaravilse',
            'contestType': 'Data Science',
            'description': '',
            'class': 'data-science'
          }
        ],
        'copilots': [{
          'avatar': '//www.topcoder.com/i/m/maroosh.jpeg',
          'name': 'maroosh',
          'country': 'Jordan'
        }, {
          'avatar': '//www.topcoder.com/i/m/Ghostar.jpeg',
          'name': 'Ghostar',
          'country': 'United States'
        }, {
          'avatar': '//www.topcoder.com/i/m/fajar.mln.png',
          'name': 'fajar.mln',
          'country': 'Indonesia'
        }, {
          'avatar': '//www.topcoder.com/i/m/Wendell.jpeg',
          'name': 'Wendell',
          'country': 'China'
        }, {
          'avatar': '//www.topcoder.com/i/m/callmekatootie.jpeg',
          'name': 'callmekatootie',
          'country': 'India'
        }, {
          'avatar': '//www.topcoder.com/i/m/elkhawajah.jpeg',
          'name': 'elkhawajah',
          'country': 'Jordan'
        }]
      }
      deferred.resolve(data)
      return deferred.promise
    }

    function getStatisticsData() {
      var deferred = $q.defer()
      var data = {
        'SRMWinners': [{
          'avatar': 'ttps://s3.amazonaws.com/app.topcoder-dev.com/images/ico-user-default.7aa28736.svg',
          'name': 'Deretin',
          'date': '20170630T000000Z',
          'country': 'UKRAINE',
          'contests': ['SRM 717 DIVISION 1 WINNER']
        }, {
          'avatar': 'https://s3.amazonaws.com/app.topcoder-dev.com/images/ico-user-default.7aa28736.svg',
          'name': 'Denisson',
          'date': '20170630T000000Z',
          'country': 'RUSSIAN FEDERATION',
          'contests': ['SRM 717 DIVISION 2 WINNER']
        }],
        'MarathonWinner': [{
          'avatar': 'https://s3.amazonaws.com/app.topcoder-dev.com/images/ico-user-default.7aa28736.svg',
          'name': 'hakomo',
          'date': '20170301T000000Z',
          'country': 'JAPAN',
          'contests': ['MARATHON MATCH 93', 'CrossStitch']
        }],
        'TopPerformers': [{
          'contestType': 'Design',
          'class': 'design',
          'performers': [{
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }]
        }, {
          'contestType': 'Development',
          'class': 'develop',
          'performers': [{
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }]
        }, {
          'contestType': 'Data Science',
          'class': 'data-science',
          'performers': [{
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }, {
            'name': 'jQluvix',
            'wins': 900
          }, {
            'name': 'Truahm',
            'wins': 850
          }]
        }]
      }
      deferred.resolve(data)
      return deferred.promise
    }
  }

})()
