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
            'avatar': '//www.topcoder.com/i/m/callmekatootie.jpeg',
            'name': 'callmekatootie',
            'contestType': 'Development',
            'description': '',
            'class': 'develop'
          }, {
            'avatar': '//www.topcoder.com/i/m/besabestin.jpeg',
            'name': 'besabestin',
            'contestType': 'Development',
            'description': '',
            'class': 'develop'
          }, {
            'avatar': '//www.topcoder.com/i/m/chekspir.jpeg',
            'name': 'chekspir',
            'contestType': 'Design',
            'description': '',
            'class': 'design'
          }, {
            'avatar': '//www.topcoder.com/i/m/DaraK.png',
            'name': 'darak',
            'contestType': 'Design',
            'description': '',
            'class': 'design'
          }, {
            'avatar': '//topcoder-prod-media.s3.amazonaws.com/member/profile/scott_wu-1480977860221.jpeg',
            'name': 'scott_wu',
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
          'avatar': 'https://s3.amazonaws.com/app.topcoder-dev.com/images/ico-user-default.7aa28736.svg',
          'name': 'xudyh',
          'date': '20151020T000000Z',
          'country': 'China',
          'contests': ['SRM 672 DIVISION 1 WINNER']
        }, {
          'avatar': 'https://s3.amazonaws.com/app.topcoder-dev.com/images/ico-user-default.7aa28736.svg',
          'name': 'jiangshibiao2',
          'date': '20151020T000000Z',
          'country': 'China',
          'contests': ['SRM 672 DIVISION 2 WINNER']
        }],
        'MarathonWinner': [{
          'avatar': 'http://www.topcoder.com/i/m/eldidou.jpeg',
          'name': 'eldidou',
          'date': '20150915T000000Z',
          'country': 'France',
          'contests': ['MARATHON MATCH 88', 'ViralInfection']
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
