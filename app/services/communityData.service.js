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
            'avatar': '//www.topcoder.com/wp-content/uploads/2015/05/f0rc0d3r_jan2016.png',
            'name': 'f0rc0d3r',
            'contestType': 'Design',
            'description': 'Three first place wins in design totalling $4500',
            'class': 'design'
          }, {
            'avatar': '//www.topcoder.com/wp-content/uploads/2015/05/vvvpig_jan2016.png',
            'name': 'vvvpig',
            'contestType': 'Development',
            'description': 'Eight first place wins in design totalling $9300',
            'class': 'develop'
          }, {
            'avatar': '//www.topcoder.com/wp-content/uploads/2015/05/grumpy_gordon_jan2016.png',
            'name': 'grumpy_gordon',
            'contestType': 'Data Science',
            'description': 'Rating increase of 316 pts in Nov SRMs, vaulting into Div 1',
            'class': 'data-science'
          }, {
            'avatar': '//www.topcoder.com/wp-content/uploads/2015/05/thomaskranitsas_jan2016.png',
            'name': 'thomaskranitsas',
            'contestType': 'Development Rookie',
            'description': 'Won first place in his first two challenges!',
            'class': 'develop'
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
