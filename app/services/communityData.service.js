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
            'avatar': '//www.topcoder.com/wp-content/uploads/2015/05/tewibowo_feb2016.png',
            'name': 'Tewibowo',
            'contestType': 'Design',
            'description': 'Won $4,175 in 6 challenges',
            'class': 'design'
          }, {
            'avatar': '//www.topcoder.com/wp-content/uploads/2015/05/billsedison_feb2016.png',
            'name': 'billsedison',
            'contestType': 'Development',
            'description': 'Four wins for $4,500',
            'class': 'develop'
          }, {
            'avatar': '//www.topcoder.com/wp-content/uploads/2015/05/anubhav94_feb2016.png',
            'name': 'anubhav94',
            'contestType': 'Data Science',
            'description': 'Gained 336 rating points within all 3 December SRMs',
            'class': 'data-science'
          }, {
            'avatar': '//www.topcoder.com/wp-content/uploads/2015/05/johnalok_feb2016.png',
            'name': 'johnalok',
            'contestType': 'Design Rookie',
            'description': 'Won first place within 2 weeks of joining!',
            'class': 'design'
          }
        ],
        'copilots': [{
          'avatar': '//community.topcoder.com/i/m/maroosh.jpeg',
          'name': 'maroosh',
          'country': 'Jordan'
        }, {
          'avatar': '//community.topcoder.com/i/m/Ghostar.jpeg',
          'name': 'Ghostar',
          'country': 'United States'
        }, {
          'avatar': '//community.topcoder.com/i/m/hohosky.png',
          'name': 'hohosky',
          'country': 'China'
        }, {
          'avatar': '//community.topcoder.com/i/m/Wendell.jpeg',
          'name': 'Wendell',
          'country': 'China'
        }, {
          'avatar': '//community.topcoder.com/i/m/callmekatootie.jpeg',
          'name': 'callmekatootie',
          'country': 'India'
        }, {
          'avatar': '//community.topcoder.com/i/m/iSpartan.jpeg',
          'name': 'iSpartan',
          'country': 'United States'
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
