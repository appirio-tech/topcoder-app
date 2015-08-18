/* jshint -W079 */
var mockData = (function() {
  return {
    getMockUsers: getMockUsers,
    getMockStates: getMockStates,
    getMockChallenge: getMockChallenge,
    getMockChallengeWithUserDetails: getMockChallengeWithUserDetails,
    getMockSpotlightChallenges: getMockSpotlightChallenges,
    getMockiOSChallenges: getMockiOSChallenges,
    getMockChallengeDates: getMockChallengeDates,
    getMockUsersPeerReviews: getMockUsersPeerReviews,
    getMockBlogs: getMockBlogs,
    getMockUserProfile: getMockUserProfile,
    getMockMarathons: getMockMarathons,
    getMockProfile: getMockProfile,
    getMockStats: getMockStats,
    getMockSkills: getMockSkills,
    getMockSRMs: getMockSRMs,
    getMockSRMResults: getMockSRMResults
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
        "status": "Active",
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

  function getMockChallengeWithUserDetails() {
    return {
        updatedAt: "2015-07-31T16:01Z",
        createdAt: "2014-12-05T19:26Z",
        createdBy: "310233",
        updatedBy: "8547899",
        phases: [
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709912,
          phaseType: "Specification Submission",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-09T19:04Z",
          scheduledEndTime: "2015-02-09T19:06Z",
          actualStartTime: "2015-02-09T19:04Z",
          actualEndTime: "2015-02-09T19:06Z",
          fixedStartTime: "2015-02-09T19:02Z",
          duration: 172800000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709913,
          phaseType: "Specification Review",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-09T19:06Z",
          scheduledEndTime: "2015-02-09T20:34Z",
          actualStartTime: "2015-02-09T19:06Z",
          actualEndTime: "2015-02-09T20:34Z",
          fixedStartTime: null,
          duration: 10739064
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709914,
          phaseType: "Registration",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-09T20:34Z",
          scheduledEndTime: "2015-02-11T20:34Z",
          actualStartTime: "2015-02-09T20:34Z",
          actualEndTime: "2015-02-11T20:34Z",
          fixedStartTime: "2015-02-06T09:00Z",
          duration: 172800000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709915,
          phaseType: "Submission",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-09T20:40Z",
          scheduledEndTime: "2015-02-15T20:40Z",
          actualStartTime: "2015-02-09T20:40Z",
          actualEndTime: "2015-02-15T20:40Z",
          fixedStartTime: null,
          duration: 518400000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709916,
          phaseType: "Screening",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-15T20:40Z",
          scheduledEndTime: "2015-02-16T04:52Z",
          actualStartTime: "2015-02-15T20:40Z",
          actualEndTime: "2015-02-16T04:52Z",
          fixedStartTime: null,
          duration: 43200000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709917,
          phaseType: "Review",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-16T04:52Z",
          scheduledEndTime: "2015-02-18T01:20Z",
          actualStartTime: "2015-02-16T04:52Z",
          actualEndTime: "2015-02-18T01:20Z",
          fixedStartTime: null,
          duration: 172800000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709918,
          phaseType: "Appeals",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-18T01:20Z",
          scheduledEndTime: "2015-02-19T01:21Z",
          actualStartTime: "2015-02-18T01:20Z",
          actualEndTime: "2015-02-19T01:21Z",
          fixedStartTime: null,
          duration: 86400000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709919,
          phaseType: "Appeals Response",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-19T01:21Z",
          scheduledEndTime: "2015-02-19T07:11Z",
          actualStartTime: "2015-02-19T01:21Z",
          actualEndTime: "2015-02-19T07:11Z",
          fixedStartTime: null,
          duration: 43200000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709920,
          phaseType: "Aggregation",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-19T07:11Z",
          scheduledEndTime: "2015-02-19T07:23Z",
          actualStartTime: "2015-02-19T07:11Z",
          actualEndTime: "2015-02-19T07:23Z",
          fixedStartTime: null,
          duration: 43200000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709921,
          phaseType: "Final Fix",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-19T07:23Z",
          scheduledEndTime: "2015-02-19T12:22Z",
          actualStartTime: "2015-02-19T07:23Z",
          actualEndTime: "2015-02-19T12:22Z",
          fixedStartTime: null,
          duration: 86400000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709922,
          phaseType: "Final Review",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-19T12:22Z",
          scheduledEndTime: "2015-02-19T20:23Z",
          actualStartTime: "2015-02-19T12:22Z",
          actualEndTime: "2015-02-19T20:23Z",
          fixedStartTime: null,
          duration: 43200000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2014-12-05T19:26Z",
          createdBy: "310233",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 709923,
          phaseType: "Approval",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-19T20:23Z",
          scheduledEndTime: "2015-02-20T04:15Z",
          actualStartTime: "2015-02-19T20:23Z",
          actualEndTime: "2015-02-20T04:15Z",
          fixedStartTime: null,
          duration: 432000000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2015-02-20T04:15Z",
          createdBy: "22841596",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 730658,
          phaseType: "Final Fix",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-20T04:17Z",
          scheduledEndTime: "2015-02-20T06:19Z",
          actualStartTime: "2015-02-20T04:17Z",
          actualEndTime: "2015-02-20T06:19Z",
          fixedStartTime: null,
          duration: 86400000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2015-02-20T04:15Z",
          createdBy: "22841596",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 730659,
          phaseType: "Final Review",
          phaseStatus: "Closed",
          scheduledStartTime: "2015-02-20T06:19Z",
          scheduledEndTime: "2015-02-21T08:33Z",
          actualStartTime: "2015-02-20T06:19Z",
          actualEndTime: "2015-02-21T08:33Z",
          fixedStartTime: null,
          duration: 43200000
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2015-02-21T08:32Z",
          createdBy: "22841596",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 731090,
          phaseType: "Final Fix",
          phaseStatus: "Open",
          scheduledStartTime: "2015-02-21T08:35Z",
          scheduledEndTime: "2015-08-08T08:34Z",
          actualStartTime: "2015-02-21T08:35Z",
          actualEndTime: null,
          fixedStartTime: null,
          duration: 14511596853
          },
          {
          updatedAt: "2015-07-31T16:01Z",
          createdAt: "2015-02-21T08:32Z",
          createdBy: "22841596",
          updatedBy: "8547899",
          challengeId: 30047653,
          id: 731091,
          phaseType: "Final Review",
          phaseStatus: "Scheduled",
          scheduledStartTime: "2015-08-08T08:34Z",
          scheduledEndTime: "2015-08-08T20:34Z",
          actualStartTime: null,
          actualEndTime: null,
          fixedStartTime: null,
          duration: 43200000
          }
        ],
        technologies: "Angular.js, PhoneGap",
        status: "Active",
        track: "DEVELOP",
        subTrack: "Assembly Competition",
        challengeName: "Learn and Earn Cordova App Assembly",
        projectType: "Assembly Competition",
        reviewType: "COMMUNITY",
        challengeDesc: "<p>We have built a UI prototype based upon AngularJS, and your task in this contest is to incorporate it into an existing Cordova application provided by the client. You will be provided the&nbsp;<span>codebase which interacts with client&#39;s internal REST API, the Cordova App should interact the REST API in the same way.</span></p> <p><span>Note that you should try to reuse the Angular services and controllers from client&#39;s Cordova App as much as possible.&nbsp;</span></p> <p>To gain access to the client application code, you must request it from the copilot.&nbsp;</p> <p>Please note that we unable to access the client&#39;s internal REST API directly, so you are responsible for analyzing the provided codebase and use $httpBackend to mockup the response for all REST API invocations. You can load the repsonses from local JSON files directly.&nbsp;</p> ",
        challengeId: 30047653,
        userId: [
          10336829
        ],
        forumId: 27103,
        numSubmissions: 2,
        numRegistrants: 35,
        registrationStartDate: "2015-02-09T20:34Z",
        registrationEndDate: "2015-02-11T20:34Z",
        checkpointSubmissionEndDate: null,
        submissionEndDate: "2015-02-15T20:40Z",
        platforms: "Mobile",
        numberOfCheckpointPrizes: 0,
        totalCheckpointPrize: null,
        challengeIsPrivate: false,
        upcomingPhase: {
        updatedAt: "2015-07-31T16:01Z",
        createdAt: "2015-02-21T08:32Z",
        createdBy: "22841596",
        updatedBy: "8547899",
        challengeId: 30047653,
        id: 731091,
        phaseType: "Final Review",
        phaseStatus: "Scheduled",
        scheduledStartTime: "2015-08-08T08:34Z",
        scheduledEndTime: "2015-08-08T20:34Z",
        actualStartTime: null,
        actualEndTime: null,
        fixedStartTime: null,
        duration: 43200000
        },
        userDetails: {
          roles: [
            "Reviewer"
          ],
          hasUserSubmittedForReview: false,
          submissionReviewScore: 0,
          winningPlacements: null
        }
      };
  }

  function getMockSpotlightChallenges() {
    return [
      {
        challengeName: 'Styx iOS Video Mobile App Bug Fixes - 177+214',
        challengeType: 'Code',
        totalPrize: '1200',
        registrationStartDate: '2015-05-01T00:00:00.000-0400',
        numRegistrants: 21,
        numSubmissions: 8
      },
      {
        challengeName: 'Styx iOS Video Mobile App Bug Fixes - 177+214',
        challengeType: 'Code',
        totalPrize: '1200',
        registrationStartDate: '2015-05-01T00:00:00.000-0400',
        numRegistrants: 21,
        numSubmissions: 8
      }
    ];
  }

  function getMockiOSChallenges() {
    return [
      {
        challengeName: 'Peer Review Load Test 0.4',
        technologies: ['iOS'],
        platforms: ['iOS'],
        reviewType: 'PEER',
        status: 'Active',
        registrationEndDate: '2015-06-11T03:16:00.000-0400',
        numRegistrants: 1058,
        numSubmissions: 1034,
        challengeType: 'Code',
        challengeCommunity: 'develop',
        challengeId: 30049290
      },
      {
        challengeName: 'Real World iOS Challenge - 1',
        technologies: ['Swift'],
        platforms: [],
        totalPrize: 200,
        reviewType: 'INTERNAL',
        status: 'Active',
        registrationEndDate: '2015-06-27T11:01:00.000-0400',
        numRegistrants: 5,
        numSubmissions: 5,
        challengeType: 'Design First2Finish',
        challengeCommunity: 'develop',
        challengeId: 30049240
      },
      {
        challengeName: 'Lifelog iOS Mobile App using Swift UI Assembly 1 - realworldswift',
        technologies: ['SWIFT', 'iOS'],
        platforms: ['iOS'],
        totalPrize: 1950,
        reviewType: 'COMMUNITY',
        status: 'Active',
        registrationEndDate: '2015-03-25T11:49:18.335-0400',
        numRegistrants: 28,
        numSubmissions: 0,
        challengeType: 'Assembly Competition',
        challengeCommunity: 'develop',
        challengeId: 30049013
      }
    ];
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

  function getMockMarathons() {
    return [
      {
        "roundId": 15761,
        "fullName": "USAID and Humanity United",
        "shortName": "Tech Challenge for Atrocity Prevention",
        "startDate": "08.22.2013 13:30 EDT",
        "endDate": "08.22.2013 13:30 EDT",
        "winnerHandle": "nhzp339",
        "winnerScore": 376.79
      },
      {
        "roundId": 15684,
        "fullName": "Marathon Match 81",
        "shortName": "Marathon Match 81",
        "startDate": "06.05.2013 12:43 EDT",
        "endDate": "06.05.2013 12:43 EDT",
        "winnerHandle": "ACRush",
        "winnerScore": 999534.81
      }
    ];
  }

  function getMockProfile() {
    return {
      "updatedAt": "2015-07-10T01:40Z",
      "createdAt": "2001-07-24T16:44Z",
      "createdBy": null,
      "updatedBy": null,
      "firstName": "F_NAME",
      "lastName": "L_NAME",
      "otherLangName": "NIAL",
      "handle": "rakesh",
      "email": "email@domain.com.z",
      "description": "abc",
      "quote": "def",
      "address": {
        "streetAddr1": "123",
        "streetAddr2": "456",
        "city": "Sunnyvale",
        "zip": "94086",
        "stateCode": "CA",
        "addressTypeId": 1,
        "addressType": "office"
      },
      "homeCountryCode": 840,
      "competitionCountryCode": 840,
      "homeCountry": "United States",
      "competitionCountry": "United States",
      "photo": {
        "imageId": 22202176,
        "photoUrl": "https://topcoder-dev-media.s3.amazonaws.com/member_profile/userId-123123123.png"
      },
      "tracks": [
        "DEVELOP",
        "DESIGN",
        "DATA_SCIENCE"
      ]
    };
  }

  function getMockStats() {
    return {
      "updatedAt": null,
      "createdAt": null,
      "createdBy": null,
      "updatedBy": null,
      "numWins": null,
      "numChallenges": null,
      "developStats": {
          "challenges": 557,
          "wins": 88,
          "challengeStats": [
           {
              "phaseId": 112,
              "subTrackName": "Design     ",
              "challenges": 348
            },
            {
              "phaseId": 117,
              "subTrackName": "Specification",
              "challenges": 12
            },
            {
              "phaseId": 118,
              "subTrackName": "Architecture",
              "challenges": 146
            },
            {
              "phaseId": 124,
              "subTrackName": "Test Suites",
              "challenges": 2
            },
            {
              "phaseId": 125,
              "subTrackName": "Assembly Competition",
              "challenges": 15
            },
            {
              "phaseId": 130,
              "subTrackName": "UI Prototype Competition",
              "challenges": 1
            },
            {
              "phaseId": 134,
              "subTrackName": "Conceptualization",
              "challenges": 31
            },
            {
              "phaseId": 137,
              "subTrackName": "Test Scenarios",
              "challenges": 1
            },
            {
              "phaseId": 149,
              "subTrackName": "First2Finish",
              "challenges": 1
            }
          ],
          "rankStats": [
              {
                  "phaseId": 112,
                  "subTrackName": "Design",
                  "rating": 1616,
                  "activePercentile": 0,
                  "activeRank": 0,
                  "activeCountryRank": 0,
                  "activeSchoolRank": 0,
                  "overallPercentile": 91.7508,
                  "overallRank": 49,
                  "overallCountryRank": 8,
                  "overallSchoolRank": 0,
                  "volatility": 441,
                  "reliability": 0
              },
              {
                  "phaseId": 118,
                  "subTrackName": "Architecture",
                  "rating": 1172,
                  "activePercentile": 0,
                  "activeRank": 0,
                  "activeCountryRank": 0,
                  "activeSchoolRank": 0,
                  "overallPercentile": 63.4409,
                  "overallRank": 34,
                  "overallCountryRank": 3,
                  "overallSchoolRank": 0,
                  "volatility": 232,
                  "reliability": 0.0667
              },
              {
                  "phaseId": 125,
                  "subTrackName": "Assembly Competition",
                  "rating": 1566,
                  "activePercentile": 0,
                  "activeRank": 0,
                  "activeCountryRank": 0,
                  "activeSchoolRank": 0,
                  "overallPercentile": 91.7448,
                  "overallRank": 44,
                  "overallCountryRank": 4,
                  "overallSchoolRank": 0,
                  "volatility": 307,
                  "reliability": 0.2222
              }
          ],
          "submissionStats": [
              {
                  "phaseId": 149,
                  "subTrackName": "First2Finish",
                  "numRatings": 1,
                  "submissions": 0,
                  "submissionRate": 0,
                  "passedScreening": 0,
                  "screeningSuccessRate": 0,
                  "passedReview": 0,
                  "reviewSuccessRate": 0,
                  "appeals": 0,
                  "appealSuccessRate": 0,
                  "maxScore": 0,
                  "minScore": 0,
                  "avgScore": 0,
                  "avgPlacement": 0,
                  "numWins": 0,
                  "numChallenges": null,
                  "winPercent": 0
              },
              {
                  "phaseId": 118,
                  "subTrackName": "Architecture",
                  "numRatings": 120,
                  "submissions": 36,
                  "submissionRate": 0.3,
                  "passedScreening": 34,
                  "screeningSuccessRate": 0.9444444444444444,
                  "passedReview": 34,
                  "reviewSuccessRate": 0.9444444444444444,
                  "appeals": 315,
                  "appealSuccessRate": 0.3904761904761905,
                  "maxScore": 98.2,
                  "minScore": 0,
                  "avgScore": 89.91176470588235,
                  "avgPlacement": 1.2647058823529411,
                  "numWins": 27,
                  "numChallenges": null,
                  "winPercent": 0.75
              },
              {
                  "phaseId": 134,
                  "subTrackName": "Conceptualization",
                  "numRatings": 30,
                  "submissions": 7,
                  "submissionRate": 0.2333333333333333,
                  "passedScreening": 7,
                  "screeningSuccessRate": 1,
                  "passedReview": 3,
                  "reviewSuccessRate": 0.42857142857142855,
                  "appeals": 6,
                  "appealSuccessRate": 0.3333333333333333,
                  "maxScore": 90.31,
                  "minScore": 82.6,
                  "avgScore": 86.80333333333333,
                  "avgPlacement": 2.6666666666666665,
                  "numWins": 0,
                  "numChallenges": null,
                  "winPercent": 0
              },
              {
                  "phaseId": 112,
                  "subTrackName": "Design     ",
                  "numRatings": 327,
                  "submissions": 155,
                  "submissionRate": 0.4740061162079511,
                  "passedScreening": 153,
                  "screeningSuccessRate": 0.9870967741935484,
                  "passedReview": 151,
                  "reviewSuccessRate": 0.9741935483870968,
                  "appeals": 685,
                  "appealSuccessRate": 0.5430656934306569,
                  "maxScore": 98.34,
                  "minScore": 67.23,
                  "avgScore": 89.51681818181818,
                  "avgPlacement": 1.9025974025974026,
                  "numWins": 75,
                  "numChallenges": null,
                  "winPercent": 0.4838709677419355
              },
              {
                  "phaseId": 130,
                  "subTrackName": "UI Prototype Competition",
                  "numRatings": 1,
                  "submissions": 0,
                  "submissionRate": 0,
                  "passedScreening": 0,
                  "screeningSuccessRate": 0,
                  "passedReview": 0,
                  "reviewSuccessRate": 0,
                  "appeals": 0,
                  "appealSuccessRate": 0,
                  "maxScore": 0,
                  "minScore": 0,
                  "avgScore": 0,
                  "avgPlacement": 0,
                  "numWins": 0,
                  "numChallenges": null,
                  "winPercent": 0
              },
              {
                  "phaseId": 117,
                  "subTrackName": "Specification",
                  "numRatings": 11,
                  "submissions": 0,
                  "submissionRate": 0,
                  "passedScreening": 0,
                  "screeningSuccessRate": 0,
                  "passedReview": 0,
                  "reviewSuccessRate": 0,
                  "appeals": 0,
                  "appealSuccessRate": 0,
                  "maxScore": 0,
                  "minScore": 0,
                  "avgScore": 0,
                  "avgPlacement": 0,
                  "numWins": 0,
                  "numChallenges": null,
                  "winPercent": 0
              },
              {
                  "phaseId": 137,
                  "subTrackName": "Test Scenarios",
                  "numRatings": 1,
                  "submissions": 0,
                  "submissionRate": 0,
                  "passedScreening": 0,
                  "screeningSuccessRate": 0,
                  "passedReview": 0,
                  "reviewSuccessRate": 0,
                  "appeals": 0,
                  "appealSuccessRate": 0,
                  "maxScore": 0,
                  "minScore": 0,
                  "avgScore": 0,
                  "avgPlacement": 0,
                  "numWins": 0,
                  "numChallenges": null,
                  "winPercent": 0
              },
              {
                  "phaseId": 125,
                  "subTrackName": "Assembly Competition",
                  "numRatings": 10,
                  "submissions": 2,
                  "submissionRate": 0.2,
                  "passedScreening": 2,
                  "screeningSuccessRate": 1,
                  "passedReview": 2,
                  "reviewSuccessRate": 1,
                  "appeals": 18,
                  "appealSuccessRate": 0.5555555555555556,
                  "maxScore": 98.96,
                  "minScore": 96.04,
                  "avgScore": 97.5,
                  "avgPlacement": 3,
                  "numWins": 0,
                  "numChallenges": null,
                  "winPercent": 0
              },
              {
                  "phaseId": 124,
                  "subTrackName": "Test Suites",
                  "numRatings": 2,
                  "submissions": 0,
                  "submissionRate": 0,
                  "passedScreening": 0,
                  "screeningSuccessRate": 0,
                  "passedReview": 0,
                  "reviewSuccessRate": 0,
                  "appeals": 0,
                  "appealSuccessRate": 0,
                  "maxScore": 0,
                  "minScore": 0,
                  "avgScore": 0,
                  "avgPlacement": 0,
                  "numWins": 0,
                  "numChallenges": null,
                  "winPercent": 0
              }
          ],
          "historyStats": [
          {
              "phaseId": 112,
              "subTrackName": "Design",
              "projectId": 10681741,
              "componentName": "Hashing Utility",
              "ratingDate": "11/11/04 9:00 AM",
              "newRating": 1029
          }
          ],
          "distributionStats": [
            {
              "phaseId": 112,
              "range0To099": 0,
              "range100To199": 0,
              "range200To299": 0,
              "range300To399": 0,
              "range400To499": 0,
              "range500To599": 0,
              "range600To699": 0,
              "range700To799": 0,
              "range800To899": 0,
              "range900To999": 0,
              "range1000To1099": 0,
              "range1100To1199": 0,
              "range1200To1299": 0,
              "range1300To1399": 0,
              "range1400To1499": 0,
              "range1500To1599": 0,
              "range1600To699": null,
              "range1700To1799": 0,
              "range1800To1899": 0,
              "range1900To1999": 0,
              "range2000To2099": 0,
              "range2100To2199": 0,
              "range2200To2299": 0,
              "range2300To2399": 0,
              "range2400To2499": 0,
              "range2500To2599": 0,
              "range2600To2699": 0,
              "range2700To2799": 0,
              "range2800To2899": 0,
              "range2900To2999": 0,
              "range3000To3099": 0,
              "range3100To3199": 0,
              "range3200To3299": 0,
              "range3300To3399": 0,
              "range3400To3499": 0,
              "range3500To3599": 0,
              "range3600To3699": 0,
              "range3700To3799": 0,
              "range3800To3899": 0,
              "range3900To3999": 0
            },
            {
              "phaseId": 118,
              "range0To099": 0,
              "range100To199": 0,
              "range200To299": 0,
              "range300To399": 0,
              "range400To499": 0,
              "range500To599": 0,
              "range600To699": 0,
              "range700To799": 0,
              "range800To899": 0,
              "range900To999": 0,
              "range1000To1099": 0,
              "range1100To1199": 1,
              "range1200To1299": 0,
              "range1300To1399": 0,
              "range1400To1499": 0,
              "range1500To1599": 0,
              "range1600To699": null,
              "range1700To1799": 0,
              "range1800To1899": 0,
              "range1900To1999": 0,
              "range2000To2099": 0,
              "range2100To2199": 0,
              "range2200To2299": 0,
              "range2300To2399": 0,
              "range2400To2499": 0,
              "range2500To2599": 0,
              "range2600To2699": 0,
              "range2700To2799": 0,
              "range2800To2899": 0,
              "range2900To2999": 0,
              "range3000To3099": 0,
              "range3100To3199": 0,
              "range3200To3299": 0,
              "range3300To3399": 0,
              "range3400To3499": 0,
              "range3500To3599": 0,
              "range3600To3699": 0,
              "range3700To3799": 0,
              "range3800To3899": 0,
              "range3900To3999": 0
            },
            {
              "phaseId": 125,
              "range0To099": 0,
              "range100To199": 0,
              "range200To299": 0,
              "range300To399": 0,
              "range400To499": 0,
              "range500To599": 0,
              "range600To699": 0,
              "range700To799": 0,
              "range800To899": 0,
              "range900To999": 0,
              "range1000To1099": 0,
              "range1100To1199": 0,
              "range1200To1299": 0,
              "range1300To1399": 0,
              "range1400To1499": 0,
              "range1500To1599": 1,
              "range1600To699": null,
              "range1700To1799": 0,
              "range1800To1899": 0,
              "range1900To1999": 0,
              "range2000To2099": 0,
              "range2100To2199": 0,
              "range2200To2299": 0,
              "range2300To2399": 0,
              "range2400To2499": 0,
              "range2500To2599": 0,
              "range2600To2699": 0,
              "range2700To2799": 0,
              "range2800To2899": 0,
              "range2900To2999": 0,
              "range3000To3099": 0,
              "range3100To3199": 0,
              "range3200To3299": 0,
              "range3300To3399": 0,
              "range3400To3499": 0,
              "range3500To3599": 0,
              "range3600To3699": 0,
              "range3700To3799": 0,
              "range3800To3899": 0,
              "range3900To3999": 0
            }
          ],
          "ratingStats": [
              {
                  "phaseId": 112,
                  "subTrackName": "Design",
                  "maxRating": 1940,
                  "minRating": 1029
              },
              {
                  "phaseId": 118,
                  "subTrackName": "Architecture",
                  "maxRating": 1260,
                  "minRating": 973
              },
              {
                  "phaseId": 125,
                  "subTrackName": "Assembly Competition",
                  "maxRating": 1566,
                  "minRating": 1515
              }
          ]
      },
      "designStats": {
          "challenges": null,
          "wins": null,
          "rankStats": {},
          "submissionStats": [],
          "ratingStats": {}
      },
      "dataScienceStats": {
          "challenges": 2,
          "wins": 0,
          "srmStats": {
          "challenges": 2,
          "wins": 0,
          "srmRankStats": [
          {
              "rating": 1012,
              "percentile": 0,
              "rank": null,
              "countryRank": null,
              "schoolRank": null,
              "volatility": 266,
              "maximumRating": 1134,
              "minimumRating": 972,
              "defaultLanguage": "C#",
              "competitions": 4,
              "mostRecentEventName": "SRM 223",
              "mostRecentEventDate": "2004-12-18T08:00Z"
          }
          ],
          "srmChallengeStats": [
          {
              "levelName": "Level One",
              "challenges": 0,
              "failedChallenges": 0
          },
          {
              "levelName": "Level Two",
              "challenges": 1,
              "failedChallenges": 0
          },
          {
              "levelName": "Level Three",
              "challenges": 1,
              "failedChallenges": 1
          }
          ],
          "srmDivisionStats": [
          {
              "levelName": null,
              "problemsSubmitted": null,
              "problemsFailed": null,
              "problemsSysByTest": null
          },
          {
              "levelName": null,
              "problemsSubmitted": null,
              "problemsFailed": null,
              "problemsSysByTest": null
          },
          {
              "levelName": null,
              "problemsSubmitted": null,
              "problemsFailed": null,
              "problemsSysByTest": null
          }
          ],
          "srmHistoryStats": [
          {
              "challengeId": 5864,
              "challengeName": "SRM 218",
              "date": "2004-11-04T08:00Z",
              "rating": 1134,
              "placement": 1091,
              "percentile": 56.36
          },
          {
              "challengeId": 5865,
              "challengeName": "SRM 219",
              "date": "2004-11-20T08:00Z",
              "rating": 1089,
              "placement": 1232,
              "percentile": 51.0139
          },
          {
              "challengeId": 5867,
              "challengeName": "SRM 221",
              "date": "2004-12-01T08:00Z",
              "rating": 972,
              "placement": 1525,
              "percentile": 39.6279
          },
          {
              "challengeId": 5869,
              "challengeName": "SRM 223",
              "date": "2004-12-18T08:00Z",
              "rating": 1012,
              "placement": 1424,
              "percentile": 43.7821
          }
          ],
          "srmDistributionStats": [
          {
              "range0To099": 27,
              "range100To199": 92,
              "range200To299": 255,
              "range300To399": 972,
              "range400To499": 2145,
              "range500To599": 3790,
              "range600To699": 5424,
              "range700To799": 7719,
              "range800To899": 8509,
              "range900To999": 7491,
              "range1000To1099": 5682,
              "range1100To1199": 5387,
              "range1200To1299": 4531,
              "range1300To1399": 3069,
              "range1400To1499": 2077,
              "range1500To1599": 1494,
              "range1600To1699": 953,
              "range1700To1799": 709,
              "range1800To1899": 502,
              "range1900To1999": 398,
              "range2000To2099": 266,
              "range2100To2199": 189,
              "range2200To2299": 156,
              "range2300To2399": 118,
              "range2400To2499": 89,
              "range2500To2599": 69,
              "range2600To2699": 46,
              "range2700To2799": 36,
              "range2800To2899": 17,
              "range2900To2999": 21,
              "range2900To3099": null,
              "range3100To3199": 8,
              "range3200To3299": 5,
              "range3300To3399": 3,
              "range3400To3499": 2,
              "range3500To3599": 0,
              "range3600To3699": 1,
              "range3700To3799": 1,
              "range3800To3899": 0,
              "range3900To3999": null
          }
          ]
      },
      "marathonMatchStats": {
        "challenges": 0,
        "wins": 0,
        "marathonRankStats": [
          {
            "rating": null,
            "competitions": 0,
            "avgRank": null,
            "avgNumSubmissions": null,
            "bestRank": null,
            "wins": 0,
            "topFiveFinishes": 0,
            "topTenFinishes": 0,
            "rank": 0,
            "percentile": 0,
            "volatility": null,
            "minimumRating": null,
            "maximumRating": null,
            "countryRank": null,
            "mostRecentEventName": null,
            "mostRecentEventDate": null,
            "schoolRank": null,
            "defaultLanguage": "C#"
          }
        ],
        "marathonHistoryStats": [],
        "marathonDistributionStats": [
          {
            "range0To099": null,
            "range100To199": 0,
            "range200To299": 0,
            "range300To399": 2,
            "range400To499": 18,
            "range500To599": 56,
            "range600To699": 245,
            "range700To799": 586,
            "range800To899": 718,
            "range900To999": 761,
            "range1000To1099": 776,
            "range1100To1199": 715,
            "range1200To1299": 628,
            "range1300To1399": 557,
            "range1400To1499": 394,
            "range1500To1599": 248,
            "range1600To1699": 175,
            "range1700To1799": 95,
            "range1800To1899": null,
            "range1900To1999": 48,
            "range2000To2099": 27,
            "range2100To2199": 18,
            "range2200To2299": 12,
            "range2300To2399": 10,
            "range2400To2499": 4,
            "range2500To2599": 4,
            "range2600To2699": 1,
            "range2700To2799": 3,
            "range2800To2899": 4,
            "range2900To2999": 0,
            "range2900To3099": null,
            "range3100To3199": 0,
            "range3200To3299": 0,
            "range3300To3399": 0,
            "range3400To3499": 0,
            "range3500To3599": 0,
            "range3600To3699": 0,
            "range3700To3799": 0,
            "range3800To3899": 0,
            "range3900To3999": 0
          }
        ]
      }
      },
      "copilotStats": {
          "contests":2264,
          "projects":90,
          "failures":238,
          "reposts":157,
          "activeContests":23,
          "activeProjects":3,
          "fulfillment":89.49
      }

    };
  }

  function getMockSkills() {
    return {
      "success": true,
      "status": 200,
      "metadata": null,
      "content": {
        "updatedAt": null,
        "createdAt": null,
        "createdBy": null,
        "updatedBy": null,
        "skills": [
          ".NET",
          ".NET System.Addins",
          "AJAX",
          "Android",
          "Backbone.js",
          "CSS",
          "HTML",
          "HTML5",
          "HTTP",
          "Java",
          "JavaScript",
          "Node.js",
          "SWIFT",
          "iOS"
        ]
      }
    };
  }

  function getMockSRMs() {
    return [
      {
        "updatedAt": null,
        "createdAt": null,
        "createdBy": null,
        "updatedBy": null,
        "id": 4460,
        "name": "Holder",
        "status": "FUTURE",
        "type": "SINGLE_ROUND_MATCH",
        "startDate": "8/30/15 12:00 AM",
        "endDate": "8/30/15 12:00 AM"
      },
      {
        "updatedAt": null,
        "createdAt": null,
        "createdBy": null,
        "updatedBy": null,
        "id": 4465,
        "name": "Single Round Match 135",
        "status": "FUTURE",
        "type": "SINGLE_ROUND_MATCH",
        "startDate": "8/30/15 12:00 AM",
        "endDate": "8/30/15 12:00 AM"
      },
      {
        "updatedAt": null,
        "createdAt": null,
        "createdBy": null,
        "updatedBy": null,
        "id": 14623,
        "name": "Single Round Match 636",
        "status": "FUTURE",
        "type": "SINGLE_ROUND_MATCH",
        "startDate": "9/28/15 12:00 AM",
        "endDate": "9/28/15 12:00 AM"
      }
    ];
  }

  function getMockSRMResults() {
    return [
      {
        "updatedAt": null,
        "createdAt": null,
        "createdBy": null,
        "updatedBy": null,
        "userId": 22688955,
        "contestId": 4460,
        "oldRating": 0,
        "newRating": 637,
        "rated": 1,
        "roomPlacement": 19,
        "division": 2,
        "finalPoints": -25.0,
        "divisionPlacement": 633,
        "ovarallRank": null
      },
      {
        "updatedAt": null,
        "createdAt": null,
        "createdBy": null,
        "updatedBy": null,
        "userId": 22688955,
        "contestId": 4465,
        "oldRating": 637,
        "newRating": 637,
        "rated": 0,
        "roomPlacement": 12,
        "division": 2,
        "finalPoints": 0.0,
        "divisionPlacement": 270,
        "ovarallRank": null
      },
      {
        "updatedAt": null,
        "createdAt": null,
        "createdBy": null,
        "updatedBy": null,
        "userId": 22688955,
        "contestId": 14623,
        "oldRating": 637,
        "newRating": 635,
        "rated": 1,
        "roomPlacement": 5,
        "division": 2,
        "finalPoints": 127.32,
        "divisionPlacement": 463,
        "ovarallRank": null
      }
    ];
  }


})();
