/* jshint -W079 */
var mockData = (function() {
  return {
    getMockUsers: getMockUsers,
    getMockStates: getMockStates,
    getMockChallenge: getMockChallenge,
    getMockChallengeDates: getMockChallengeDates,
    getMockUsersPeerReviews: getMockUsersPeerReviews,
    getMockBlogs: getMockBlogs,
    getMockUserProfile: getMockUserProfile
  };

  function getMockStates() {
    return [
      {
        state: 'login',
        config: {
          url: '/login',
          templateUrl: 'login/login.html',
          title: 'login'
        }
      }
    ];
  }

  function getMockUsers() {
    return [
      {
        id: 1017109,
        firstName: 'Nick',
        lastName: 'Sibelius',
        city: 'San Francisco',
        state: 'CA'
      },
      {
        id: 1017105,
        firstName: 'David',
        lastName: 'Bartok',
        city: 'Portland',
        state: 'OR'
      }
    ];
  }

  function getMockChallenge() {
    return {
      "data": {
        "challengeType": "Code",
        "challengeName": "Swift Peer Review 2",
        "challengeId": 30049140,
        "projectId": 8619,
        "forumId": "28423",
        "detailedRequirements": "<p>This is a test challenge</p>\n",
        "finalSubmissionGuidelines": "<p>...</p>\n",
        "reviewScorecardId": "30001821",
        "cmcTaskId": "",
        "numberOfCheckpointsPrizes": 0,
        "topCheckPointPrize": "",
        "postingDate": "2015-04-01T17:02:38.606-0400",
        "registrationEndDate": "2015-04-03T09:41:57.633-0400",
        "checkpointSubmissionEndDate": "",
        "submissionEndDate": "2015-04-03T09:51:21.299-0400",
        "reviewType": "PEER",
        "type": "develop",
        "forumLink": "http://apps.topcoder.com/forums/?module=Category&categoryID=28423",
        "appealsEndDate": "2015-05-01T00:00:00.000-0400",
        "currentStatus": "Active",
        "challengeCommunity": "develop",
        "directUrl": "https://www.topcoder.com/direct/contest/detail.action?projectId=30049140",
        "technology": [
          "SWIFT",
          "iOS"
        ],
        "prize": [],
        "currentPhaseName": "Review",
        "currentPhaseRemainingTime": -5163519,
        "currentPhaseEndDate": "2015-05-01T00:00:00.000-0400",
        "Documents": [],
        "platforms": [
          "iOS"
        ],
        "event": {
          "id": 3445,
          "description": "Swift Developer Program",
          "shortDescription": "swiftprogram"
        },
        "serverInformation": {
          "serverName": "TopCoder API",
          "apiVersion": "0.0.1",
          "requestDuration": 69,
          "currentTime": 1435601894786
        },
        "requesterInformation": {
          "id": "43d437b236d87c6360b589afe40d2b71006e4c34-RvzavyG1JoTJmgH1",
          "remoteIP": "12.251.243.22",
          "receivedParams": {
            "apiVersion": "v2",
            "challengeId": "30049140",
            "action": "getChallenge"
          }
        }
      }
    }
  }

  function getMockChallengeDates() {
    return {
      "data": {
        "id":"-13e20d1e:14e4052be45:-7f73",
        "result": {
          "success":true,
          "status":200,
          "metadata":null,
          "content":[
            {
              "updatedAt":null,
              "createdAt":null,
              "createdBy":null,
              "updatedBy":null,
              "scheduledStartTime":"2015-04-03T13:58Z",
              "scheduledEndTime":"2015-05-01T04:00Z",
              "actualStartTime":"2015-04-03T13:58Z",
              "actualEndTime":null
            }
          ]
        },
        "version":"v3"
      }
    };
  }

  function getMockUsersPeerReviews() {
    return {
      "data": {
        "id":"-13e20d1e:14e4052be45:-7f71",
        "result": {
          "success":true,
          "status":200,
          "metadata":null,
          "content":[
            {
              "updatedAt":"2015-06-15T17:23Z",
              "createdAt":"2015-06-12T22:25Z",
              "createdBy":"2000003",
              "updatedBy":"2000003",
              "id":388840,
              "resourceId":null,
              "submissionId":506562,
              "projectPhaseId":null,
              "scorecardId":null,
              "committed":1,
              "uploadId":506581,
              "score":100.0,
              "initialScore":100.0,
              "reviewerUserId":2000003,
              "submitterUserId":1800109
            },
            {
              "updatedAt":"2015-06-23T19:32Z",
              "createdAt":"2015-06-15T17:23Z",
              "createdBy":"2000003",
              "updatedBy":"2000003",
              "id":388850,
              "resourceId":null,
              "submissionId":506597,
              "projectPhaseId":null,
              "scorecardId":null,
              "committed":0,
              "uploadId":506616,
              "score":0.0,
              "initialScore":0.0,
              "reviewerUserId":2000003,
              "submitterUserId":2000007
            },
            {
              "updatedAt":"2015-06-23T18:24Z",
              "createdAt":"2015-06-15T21:10Z",
              "createdBy":"2000003",
              "updatedBy":"2000003",
              "id":388851,
              "resourceId":null,
              "submissionId":506557,
              "projectPhaseId":null,
              "scorecardId":null,
              "committed":1,
              "uploadId":506576,
              "score":13.199999809265137,
              "initialScore":66.0,
              "reviewerUserId":2000003,
              "submitterUserId":1800103
            },
            {
              "updatedAt":"2015-06-23T19:32Z",
              "createdAt":"2015-06-23T19:32Z",
              "createdBy":"2000003",
              "updatedBy":"2000003",
              "id":388860,
              "resourceId":null,
              "submissionId":506570,
              "projectPhaseId":null,
              "scorecardId":null,
              "committed":0,
              "uploadId":506589,
              "score":0.0,
              "initialScore":0.0,
              "reviewerUserId":2000003,
              "submitterUserId":1800125
            },
            {
              "updatedAt":"2015-06-23T19:32Z",
              "createdAt":"2015-06-23T19:32Z",
              "createdBy":"2000003",
              "updatedBy":"2000003",
              "id":388861,
              "resourceId":null,
              "submissionId":506583,
              "projectPhaseId":null,
              "scorecardId":null,
              "committed":0,
              "uploadId":506602,
              "score":0.0,
              "initialScore":0.0,
              "reviewerUserId":2000003,
              "submitterUserId":1800159
            }
          ]
        },
        "version":"v3"
      }
    }
  }

  function getMockBlogs() {
    return [{
      title: 'blog1',
      link: 'http://blog.topcoder.com/blog1',
      pubDate: new Date(),
      description: '<p>Blog 1 description</p>'
    }, {
      title: 'blog2',
      link: 'http://blog.topcoder.com/blog2',
      pubDate: new Date(),
      description: '<p>Blog 2 description</p>'
    }];
  }

  function getMockUserProfile() {
    return {
      data: 
      {
        "handle": "vikasrohit",
        "country": "India",
        "memberSince": "2007-07-08T13:46:00.000-0400",
        "quote": "Trying to be TopCoder....",
        "photoLink": "/i/m/vikasrohit.jpeg",
        "copilot": false,
        "overallEarning": 10653.27,
        "ratingSummary": [
          {
            "name": "Development",
            "rating": 800,
            "colorStyle": "color: #999999"
          },
          {
            "name": "Assembly",
            "rating": 866,
            "colorStyle": "color: #999999"
          },
          {
            "name": "Design",
            "rating": 879,
            "colorStyle": "color: #999999"
          },
          {
            "name": "Algorithm",
            "rating": 566,
            "colorStyle": "color: #999999"
          },
          {
            "name": "Marathon Match",
            "rating": 961,
            "colorStyle": "color: #00A900"
          }
        ]
      }
    };
  }

})();
