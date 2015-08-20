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
      "userId": 10336829,
      "challenges": 411,
      "wins": 166,
      "DEVELOP": {
        "challenges": 400,
        "wins": 166,
        "subTracks": [
          {
            "id": 112,
            "name": "DESIGN",
            "challenges": 56,
            "rank": {
              "rating": 2125,
              "activePercentile": 0,
              "activeRank": 0,
              "activeCountryRank": 0,
              "activeSchoolRank": 0,
              "overallPercentile": 96.8013,
              "overallRank": 19,
              "overallCountryRank": 8,
              "overallSchoolRank": 0,
              "volatility": 446,
              "reliability": 0.6667
            },
            "submissions": {
              "numRatings": 51,
              "submissions": 21,
              "submissionRate": 0.4117647058823529,
              "passedScreening": 21,
              "screeningSuccessRate": 1,
              "passedReview": 21,
              "reviewSuccessRate": 1,
              "appeals": 125,
              "appealSuccessRate": 0.488,
              "maxScore": 99.71,
              "minScore": 85.85,
              "avgScore": 96.59619047619047,
              "avgPlacement": 1.1428571428571428,
              "wins": 19,
              "winPercent": 0.9047619047619048
            },
            "rating": {
              "maxRating": 2183,
              "minRating": 1318
            }
          },
          {
            "id": 113,
            "name": "DEVELOPMENT",
            "challenges": 93,
            "rank": {
              "rating": 1332,
              "activePercentile": 0,
              "activeRank": 0,
              "activeCountryRank": 0,
              "activeSchoolRank": 0,
              "overallPercentile": 82.3051,
              "overallRank": 261,
              "overallCountryRank": 167,
              "overallSchoolRank": 0,
              "volatility": 251,
              "reliability": 0.4667
            },
            "submissions": {
              "numRatings": 86,
              "submissions": 46,
              "submissionRate": 0.5348837209302325,
              "passedScreening": 46,
              "screeningSuccessRate": 1,
              "passedReview": 45,
              "reviewSuccessRate": 0.9782608695652174,
              "appeals": 144,
              "appealSuccessRate": 0.4583333333333333,
              "maxScore": 98.21,
              "minScore": 72.85,
              "avgScore": 89.0163043478261,
              "avgPlacement": 2.0217391304347827,
              "wins": 22,
              "winPercent": 0.4782608695652174
            },
            "rating": {
              "maxRating": 1768,
              "minRating": 1156
            }
          },
          {
            "id": 117,
            "name": "SPECIFICATION",
            "challenges": 4,
            "rank": {
              "rating": 1378,
              "activePercentile": 0,
              "activeRank": 0,
              "activeCountryRank": 0,
              "activeSchoolRank": 0,
              "overallPercentile": 85.2941,
              "overallRank": 10,
              "overallCountryRank": 5,
              "overallSchoolRank": 0,
              "volatility": 385,
              "reliability": 1
            },
            "submissions": {
              "numRatings": 4,
              "submissions": 1,
              "submissionRate": 0.25,
              "passedScreening": 1,
              "screeningSuccessRate": 1,
              "passedReview": 1,
              "reviewSuccessRate": 1,
              "appeals": 3,
              "appealSuccessRate": 0.3333333333333333,
              "maxScore": 97.78,
              "minScore": 97.78,
              "avgScore": 97.78,
              "avgPlacement": 1,
              "wins": 1,
              "winPercent": 1
            },
            "rating": {
              "maxRating": 1378,
              "minRating": 1378
            }
          },
          {
            "id": 118,
            "name": "ARCHITECTURE",
            "challenges": 184,
            "rank": {
              "rating": 2437,
              "activePercentile": 94.1176,
              "activeRank": 1,
              "activeCountryRank": 1,
              "activeSchoolRank": 0,
              "overallPercentile": 98.9247,
              "overallRank": 1,
              "overallCountryRank": 1,
              "overallSchoolRank": 0,
              "volatility": 155,
              "reliability": 0.9333
            },
            "submissions": {
              "numRatings": 158,
              "submissions": 114,
              "submissionRate": 0.7215189873417721,
              "passedScreening": 113,
              "screeningSuccessRate": 0.9912280701754386,
              "passedReview": 113,
              "reviewSuccessRate": 0.9912280701754386,
              "appeals": 779,
              "appealSuccessRate": 0.40821566110397944,
              "maxScore": 100,
              "minScore": 87.53,
              "avgScore": 96.77159292035398,
              "avgPlacement": 1.0442477876106195,
              "wins": 108,
              "winPercent": 0.9473684210526315
            },
            "rating": {
              "maxRating": 2538,
              "minRating": 1549
            }
          },
          {
            "id": 120,
            "name": "BUG_HUNT",
            "challenges": 1,
            "rank": null,
            "submissions": {
              "numRatings": 1,
              "submissions": 1,
              "submissionRate": 1,
              "passedScreening": 0,
              "screeningSuccessRate": 0,
              "passedReview": 0,
              "reviewSuccessRate": 0,
              "appeals": 0,
              "appealSuccessRate": 0,
              "maxScore": 10,
              "minScore": 10,
              "avgScore": 10,
              "avgPlacement": 2,
              "wins": 0,
              "winPercent": 0
            },
            "rating": {
              "maxRating": 0,
              "minRating": 0
            }
          },
          {
            "id": 125,
            "name": "ASSEMBLY_COMPETITION",
            "challenges": 22,
            "rank": {
              "rating": 1733,
              "activePercentile": 91.5033,
              "activeRank": 13,
              "activeCountryRank": 8,
              "activeSchoolRank": 0,
              "overallPercentile": 95.3096,
              "overallRank": 25,
              "overallCountryRank": 16,
              "overallSchoolRank": 0,
              "volatility": 416,
              "reliability": 0.8
            },
            "submissions": {
              "numRatings": 19,
              "submissions": 16,
              "submissionRate": 0.8421052631578947,
              "passedScreening": 16,
              "screeningSuccessRate": 1,
              "passedReview": 16,
              "reviewSuccessRate": 1,
              "appeals": 70,
              "appealSuccessRate": 0.35714285714285715,
              "maxScore": 99.82,
              "minScore": 87.55,
              "avgScore": 97.01375,
              "avgPlacement": 1.1875,
              "wins": 14,
              "winPercent": 0.875
            },
            "rating": {
              "maxRating": 2060,
              "minRating": 1497
            }
          },
          {
            "id": 134,
            "name": "CONCEPTUALIZATION",
            "challenges": 6,
            "rank": null,
            "submissions": {
              "numRatings": 6,
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
              "wins": 0,
              "winPercent": 0
            },
            "rating": {
              "maxRating": 0,
              "minRating": 0
            }
          },
          {
            "id": 140,
            "name": "COPILOT_POSTING",
            "challenges": 27,
            "rank": null,
            "submissions": {
              "numRatings": 22,
              "submissions": 1,
              "submissionRate": 0.04545454545454546,
              "passedScreening": 0,
              "screeningSuccessRate": 0,
              "passedReview": 0,
              "reviewSuccessRate": 0,
              "appeals": 0,
              "appealSuccessRate": 0,
              "maxScore": 10,
              "minScore": 10,
              "avgScore": 10,
              "avgPlacement": 6,
              "wins": 0,
              "winPercent": 0
            },
            "rating": {
              "maxRating": 0,
              "minRating": 0
            }
          },
          {
            "id": 146,
            "name": "CONTENT_CREATION",
            "challenges": 1,
            "rank": null,
            "submissions": {
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
              "wins": 0,
              "winPercent": 0
            },
            "rating": {
              "maxRating": 0,
              "minRating": 0
            }
          },
          {
            "id": 149,
            "name": "FIRST_2_FINISH",
            "challenges": 1,
            "rank": null,
            "submissions": {
              "numRatings": 1,
              "submissions": 1,
              "submissionRate": 1,
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
              "wins": 0,
              "winPercent": 0
            },
            "rating": {
              "maxRating": 0,
              "minRating": 0
            }
          },
          {
            "id": 150,
            "name": "CODE",
            "challenges": 5,
            "rank": null,
            "submissions": {
              "numRatings": 5,
              "submissions": 4,
              "submissionRate": 0.8,
              "passedScreening": 3,
              "screeningSuccessRate": 0.75,
              "passedReview": 3,
              "reviewSuccessRate": 0.75,
              "appeals": 9,
              "appealSuccessRate": 0.3333333333333333,
              "maxScore": 100,
              "minScore": 82.5,
              "avgScore": 92.29333333333334,
              "avgPlacement": 4.333333333333333,
              "wins": 2,
              "winPercent": 0.5
            },
            "rating": {
              "maxRating": 0,
              "minRating": 0
            }
          }
        ]
      },
      "DESIGN": {
        "challenges": 1,
        "wins": 0,
        "subTracks": [
          {
            "id": 22,
            "name": "IDEA_GENERATION",
            "submissions": {
              "submissions": 0,
              "passedScreening": 0,
              "wins": 0,
              "failedContests": 0,
              "completedContests": 0,
              "challenges": 0
            }
          },
          {
            "id": 18,
            "name": "WIREFRAMES",
            "submissions": {
              "submissions": 0,
              "passedScreening": 0,
              "wins": 0,
              "failedContests": 0,
              "completedContests": 0,
              "challenges": 0
            }
          },
          {
            "id": 40,
            "name": "DESIGN_FIRST_2_FINISH",
            "submissions": {
              "submissions": 0,
              "passedScreening": 0,
              "wins": 0,
              "failedContests": 0,
              "completedContests": 0,
              "challenges": 1
            }
          },
          {
            "id": 17,
            "name": "WEB_DESIGNS",
            "submissions": {
              "submissions": 0,
              "passedScreening": 0,
              "wins": 0,
              "failedContests": 0,
              "completedContests": 0,
              "challenges": 0
            }
          },
          {
            "id": 21,
            "name": "PRINT_OR_PRESENTATION",
            "submissions": {
              "submissions": 0,
              "passedScreening": 0,
              "wins": 0,
              "failedContests": 0,
              "completedContests": 0,
              "challenges": 0
            }
          }
        ]
      },
      "DATA_SCIENCE": {
        "challenges": 10,
        "wins": 0,
        "srm": {
          "challenges": 10,
          "wins": 0,
          "rank": {
            "rating": 799,
            "percentile": 26.15,
            "rank": 6280,
            "countryRank": 1127,
            "schoolRank": 0,
            "volatility": 473,
            "maximumRating": 1247,
            "minimumRating": 799,
            "defaultLanguage": "Java",
            "competitions": 15,
            "mostRecentEventName": "SRM 621",
            "mostRecentEventDate": "2014-05-20T05:00Z"
          },
          "challengeDetails": [
            {
              "levelName": "Level Three",
              "challenges": 3,
              "failedChallenges": 1
            },
            {
              "levelName": "Level Two",
              "challenges": 4,
              "failedChallenges": 2
            },
            {
              "levelName": "Level One",
              "challenges": 3,
              "failedChallenges": 3
            }
          ],
          "division1": [
            {
              "levelName": "Level Three",
              "problemsSubmitted": 0,
              "problemsFailed": 0,
              "problemsSysByTest": 0
            },
            {
              "levelName": "Level One",
              "problemsSubmitted": 4,
              "problemsFailed": 0,
              "problemsSysByTest": 2
            },
            {
              "levelName": "Level Two",
              "problemsSubmitted": 2,
              "problemsFailed": 1,
              "problemsSysByTest": 1
            }
          ],
          "division2": [
            {
              "levelName": "Level Three",
              "problemsSubmitted": 3,
              "problemsFailed": 1,
              "problemsSysByTest": 0
            },
            {
              "levelName": "Level Two",
              "problemsSubmitted": 9,
              "problemsFailed": 2,
              "problemsSysByTest": 1
            },
            {
              "levelName": "Level One",
              "problemsSubmitted": 9,
              "problemsFailed": 0,
              "problemsSysByTest": 1
            }
          ]
        },
        "marathonMatch": {
          "rank": {
            "rating": 0,
            "competitions": 0,
            "avgRank": 0,
            "avgNumSubmissions": 0,
            "bestRank": 0,
            "wins": 0,
            "topFiveFinishes": 0,
            "topTenFinishes": 0,
            "rank": 0,
            "percentile": 0,
            "volatility": 0,
            "minimumRating": 0,
            "maximumRating": 0,
            "countryRank": 0,
            "mostRecentEventName": null,
            "mostRecentEventDate": null,
            "schoolRank": 0,
            "defaultLanguage": "Java"
          }
        }
      },
      "COPILOT": {
        "contests": 24,
        "projects": 3,
        "failures": 4,
        "reposts": 9,
        "activeContests": 0,
        "activeProjects": 0,
        "fulfillment": 83.33
      }
    }
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
