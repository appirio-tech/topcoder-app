(function() {
  'use strict';

  angular.module('tc.services').factory('CommunityDataService', CommunityDataService);

  CommunityDataService.$inject = ['$q'];

  function CommunityDataService($q) {
    var service = {
      getMembersData: getMembersData,
      getStatisticsData: getStatisticsData
    };
    return service;

    ///////////////////////

    function getMembersData() {
      var deferred = $q.defer();
      var data = {
        "memberLeaderboard": [
        {
          "avatar": "//www.topcoder.com/wp-content/uploads/2015/05/iamtong_oct2015.png",
          "name": "iamtong ",
          "contestType": "Design",
          "description": "Won $6500 in design challenges.",
          "class": "design"
        }, {
          "avatar": "//www.topcoder.com/wp-content/uploads/2015/05/cjalmeida_oct2015.png",
          "name": "cjalmeida",
          "contestType": "Development",
          "description": "Won $4500 in development challenges.",
          "class": "develop"
        }, {
          "avatar": "//www.topcoder.com/wp-content/uploads/2015/05/islands_oct2015.png",
          "name": "islands",
          "contestType": "Data Science",
          "description": "Advanced from Div 2 to Div 1 & total rating increase of 424 pts.",
          "class": "data-science"
        }, {
          "avatar": "https://s3.amazonaws.com/app.topcoder-dev.com/images/ico-user-default.7aa28736.svg",
          "name": "WinkTales",
          "contestType": "Dev Rookie",
          "description": "Already won 2 challenges in his short 2.5 month time with Topcoder",
          "class": "develop"
        }],
        "copilots": [{
          "avatar": "//community.topcoder.com/i/m/maroosh.jpeg",
          "name": "maroosh",
          "country": "Jordan"
        }, {
          "avatar": "//community.topcoder.com/i/m/Ghostar.jpeg",
          "name": "Ghostar",
          "country": "United States"
        }, {
          "avatar": "//community.topcoder.com/i/m/hohosky.png",
          "name": "hohosky",
          "country": "China"
        }, {
          "avatar": "//community.topcoder.com/i/m/Wendell.jpeg",
          "name": "Wendell",
          "country": "China"
        }, {
          "avatar": "//community.topcoder.com/i/m/callmekatootie.jpeg",
          "name": "callmekatootie",
          "country": "India"
        }, {
          "avatar": "//community.topcoder.com/i/m/iSpartan.jpeg",
          "name": "iSpartan",
          "country": "United States"
        }]
      };
      deferred.resolve(data);
      return deferred.promise;
    }

    function getStatisticsData() {
      var deferred = $q.defer();
      var data = {
        "SRMWinners": [{
          "avatar": "https://s3.amazonaws.com/app.topcoder-dev.com/images/ico-user-default.7aa28736.svg",
          "name": "xudyh",
          "date": "20151020T000000Z",
          "country": "China",
          "contests": ["SRM 672 DIVISION 1 WINNER"]
        }, {
          "avatar": "https://s3.amazonaws.com/app.topcoder-dev.com/images/ico-user-default.7aa28736.svg",
          "name": "jiangshibiao2",
          "date": "20151020T000000Z",
          "country": "China",
          "contests": ["SRM 672 DIVISION 2 WINNER"]
        }],
        "MarathonWinner": [{
          "avatar": "http://www.topcoder.com/i/m/eldidou.jpeg",
          "name": "eldidou",
          "date": "20150915T000000Z",
          "country": "France",
          "contests": ["MARATHON MATCH 88", "ViralInfection"]
        }],
        "TopPerformers": [{
          "contestType": "Design",
          "class": "design",
          "performers": [{
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }]
        }, {
          "contestType": "Development",
          "class": "develop",
          "performers": [{
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }]
        }, {
          "contestType": "Data Science",
          "class": "data-science",
          "performers": [{
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }, {
            "name": "jQluvix",
            "wins": 900
          }, {
            "name": "Truahm",
            "wins": 850
          }]
        }]
      };
      deferred.resolve(data);
      return deferred.promise;
    }
  }

})();
