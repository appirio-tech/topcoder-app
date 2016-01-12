/* jshint -W079 */
var mockData = (function() {
  return {
    getMockUsers: getMockUsers,
    getMockStates: getMockStates,
    getMockChallenge: getMockChallenge,
    getMockChallengeWithUserDetails: getMockChallengeWithUserDetails,
    getMockUserChallenges: getMockUserChallenges,
    getMockSpotlightChallenges: getMockSpotlightChallenges,
    getMockiOSChallenges: getMockiOSChallenges,
    getMockChallengeDates: getMockChallengeDates,
    getMockUsersPeerReviews: getMockUsersPeerReviews,
    getMockBlogs: getMockBlogs,
    getMockUserProfile: getMockUserProfile,
    getMockMarathons: getMockMarathons,
    getMockProfile: getMockProfile,
    getMockHistory: getMockHistory,
    getMockStats: getMockStats,
    getMockSkills: getMockSkills,
    getMockSRMs: getMockSRMs,
    getMockSRMResults: getMockSRMResults,
    getMockBadge: getMockBadge,
    getMockUserFinancials: getMockUserFinancials,
    getMockLinkedExternalAccounts: getMockLinkedExternalAccounts,
    getMockLinkedExternalAccountsData: getMockLinkedExternalAccountsData,
    getMockExternalWebLinksData: getMockExternalWebLinksData,
    getMockAuth0Profile: getMockAuth0Profile
  };

  function getMockStates() {
    return [{
      state: 'login',
      config: {
        url: '/login',
        templateUrl: 'login/login.html',
        title: 'login'
      }
    }];
  }

  function getMockUsers() {
    return [{
      id: 1017109,
      firstName: 'Nick',
      lastName: 'Sibelius',
      city: 'San Francisco',
      state: 'CA'
    }, {
      id: 1017105,
      firstName: 'David',
      lastName: 'Bartok',
      city: 'Portland',
      state: 'OR'
    }];
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
      phases: [{
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }],
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

  function getMockUserChallenges() {
    return [{
      "updatedAt": "2014-04-04T06:04Z",
      "createdAt": "2014-03-30T08:48Z",
      "createdBy": "151743",
      "updatedBy": "22841596",
      "technologies": "iOS",
      "status": "Completed",
      "track": null,
      "subTrack": "Bug Hunt",
      "name": "24 hour Hercules Player Personal Content DVR iOS 1 0 9 1 Bug Hunt",
      "type": "Bug Hunt",
      "reviewType": null,
      "id": 30041541,
      "userId": 151743,
      "forumId": 22045,
      "numSubmissions": 3,
      "numRegistrants": 4,
      "registrationStartDate": "2014-03-30T16:00Z",
      "registrationEndDate": "2014-03-31T16:00Z",
      "checkpointSubmissionEndDate": null,
      "submissionEndDate": "2014-03-31T16:00Z",
      "platforms": "iOS",
      "numberOfCheckpointPrizes": null,
      "totalCheckpointPrize": null,
      "isPrivate": null,
      "upcomingPhase": null,
      "userDetails": {
        "roles": [
          "Reviewer",
          "Specification Submitter",
          "Copilot"
        ],
        "hasUserSubmittedForReview": false,
        "submissionReviewScore": null,
        "winningPlacements": null,
        "submissions": [{
          "id": 177052,
          "submittedAt": "2014-03-30T08:48Z",
          "status": "Active",
          "score": null,
          "placement": null,
          "challengeId": 30041541
        }]
      },
      "projectId": 6680,
      "projectName": "My Media",
      "handle": "Ghostar"
    }, {
      "updatedAt": "2014-05-09T21:11Z",
      "createdAt": "2014-05-06T21:04Z",
      "createdBy": "151743",
      "updatedBy": "22841596",
      "technologies": "Android",
      "status": "Completed",
      "track": null,
      "subTrack": "Bug Hunt",
      "name": "Hercules PCDVR Android App - Version 1 0 9 8 Bug Hunt",
      "type": "Bug Hunt",
      "reviewType": null,
      "id": 30042563,
      "userId": 151743,
      "forumId": 22846,
      "numSubmissions": 3,
      "numRegistrants": 6,
      "registrationStartDate": "2014-05-06T22:40Z",
      "registrationEndDate": "2014-05-08T22:40Z",
      "checkpointSubmissionEndDate": null,
      "submissionEndDate": "2014-05-08T22:40Z",
      "platforms": "Android",
      "numberOfCheckpointPrizes": null,
      "totalCheckpointPrize": null,
      "isPrivate": null,
      "upcomingPhase": null,
      "userDetails": {
        "roles": [
          "Reviewer",
          "Specification Submitter",
          "Copilot"
        ],
        "hasUserSubmittedForReview": false,
        "submissionReviewScore": null,
        "winningPlacements": null,
        "submissions": [{
          "id": 179562,
          "submittedAt": "2014-05-06T21:04Z",
          "status": "Active",
          "score": null,
          "placement": null,
          "challengeId": 30042563
        }]
      },
      "projectId": 6680,
      "projectName": "My Media",
      "handle": "Ghostar"
    }, {
      "updatedAt": "2014-07-02T19:46Z",
      "createdAt": "2014-06-30T03:27Z",
      "createdBy": "151743",
      "updatedBy": "22841596",
      "technologies": "iOS",
      "status": "Completed",
      "track": null,
      "subTrack": "Bug Hunt",
      "name": "24 hour - Hercules PCDVR iOS App - Version 1 0 9 15 bug hunt",
      "type": "Bug Hunt",
      "reviewType": null,
      "id": 30043808,
      "userId": 151743,
      "forumId": 23852,
      "numSubmissions": 4,
      "numRegistrants": 5,
      "registrationStartDate": "2014-06-30T16:00Z",
      "registrationEndDate": "2014-07-01T16:00Z",
      "checkpointSubmissionEndDate": null,
      "submissionEndDate": "2014-07-01T16:00Z",
      "platforms": "iOS",
      "numberOfCheckpointPrizes": null,
      "totalCheckpointPrize": null,
      "isPrivate": null,
      "upcomingPhase": null,
      "userDetails": {
        "roles": [
          "Approver",
          "Reviewer",
          "Specification Submitter",
          "Copilot"
        ],
        "hasUserSubmittedForReview": false,
        "submissionReviewScore": null,
        "winningPlacements": null,
        "submissions": [{
          "id": 183230,
          "submittedAt": "2014-06-30T03:27Z",
          "status": "Active",
          "score": null,
          "placement": null,
          "challengeId": 30043808
        }]
      },
      "projectId": 6680,
      "projectName": "My Media",
      "handle": "Ghostar"
    }, {
      "updatedAt": "2014-07-08T05:18Z",
      "createdAt": "2014-07-06T02:31Z",
      "createdBy": "151743",
      "updatedBy": "22841596",
      "technologies": "Android",
      "status": "Completed",
      "track": null,
      "subTrack": "Bug Hunt",
      "name": "Hercules PCDVR Android App - 24 hour - Version 1 0  9 17 Bug Hunt",
      "type": "Bug Hunt",
      "reviewType": null,
      "id": 30043966,
      "userId": 151743,
      "forumId": 23974,
      "numSubmissions": 5,
      "numRegistrants": 6,
      "registrationStartDate": "2014-07-06T16:00Z",
      "registrationEndDate": "2014-07-07T16:00Z",
      "checkpointSubmissionEndDate": null,
      "submissionEndDate": "2014-07-07T16:00Z",
      "platforms": "Android",
      "numberOfCheckpointPrizes": null,
      "totalCheckpointPrize": null,
      "isPrivate": null,
      "upcomingPhase": null,
      "userDetails": {
        "roles": [
          "Reviewer",
          "Copilot",
          "Specification Submitter"
        ],
        "hasUserSubmittedForReview": false,
        "submissionReviewScore": null,
        "winningPlacements": null,
        "submissions": [{
          "id": 183526,
          "submittedAt": "2014-07-06T02:31Z",
          "status": "Active",
          "score": null,
          "placement": null,
          "challengeId": 30043966
        }]
      },
      "projectId": 6680,
      "projectName": "My Media",
      "handle": "Ghostar"
    }, {
      "updatedAt": "2014-12-09T00:08Z",
      "createdAt": "2014-12-09T00:01Z",
      "createdBy": "151743",
      "updatedBy": "151743",
      "technologies": "Android",
      "status": "Deleted",
      "track": null,
      "subTrack": "First2Finish",
      "name": "Hercules OnCampus TV App - 0 min displayed on Live TV grid",
      "type": "First2Finish",
      "reviewType": "INTERNAL",
      "id": 30047806,
      "userId": 151743,
      "forumId": 27229,
      "numSubmissions": 0,
      "numRegistrants": 0,
      "registrationStartDate": "2014-12-09T00:02Z",
      "registrationEndDate": "2015-01-08T00:02Z",
      "checkpointSubmissionEndDate": null,
      "submissionEndDate": "2015-01-08T00:07Z",
      "platforms": "Android",
      "numberOfCheckpointPrizes": null,
      "totalCheckpointPrize": null,
      "isPrivate": null,
      "upcomingPhase": null,
      "userDetails": {
        "roles": [
          "Approver",
          "Observer",
          "Iterative Reviewer"
        ],
        "hasUserSubmittedForReview": false,
        "submissionReviewScore": null,
        "winningPlacements": null,
        "submissions": null
      },
      "projectId": 8324,
      "projectName": "Android TV",
      "handle": "Ghostar"
    }, {
      "updatedAt": "2014-02-20T13:12Z",
      "createdAt": "2014-02-17T11:59Z",
      "createdBy": "151743",
      "updatedBy": "22841596",
      "technologies": "iOS",
      "status": "Completed",
      "track": null,
      "subTrack": "Bug Hunt",
      "name": "24 hour Hercules Player Personal Content DVR iOS 1-8-0-7 Bug Hunt",
      "type": "Bug Hunt",
      "reviewType": null,
      "id": 30039586,
      "userId": 151743,
      "forumId": 21348,
      "numSubmissions": 4,
      "numRegistrants": 6,
      "registrationStartDate": "2014-02-17T15:25Z",
      "registrationEndDate": "2014-02-19T15:25Z",
      "checkpointSubmissionEndDate": null,
      "submissionEndDate": "2014-02-19T15:30Z",
      "platforms": "iOS",
      "numberOfCheckpointPrizes": null,
      "totalCheckpointPrize": null,
      "isPrivate": null,
      "upcomingPhase": null,
      "userDetails": {
        "roles": [
          "Copilot",
          "Reviewer",
          "Specification Submitter"
        ],
        "hasUserSubmittedForReview": false,
        "submissionReviewScore": null,
        "winningPlacements": null,
        "submissions": [{
          "id": 171701,
          "submittedAt": "2014-02-17T12:00Z",
          "status": "Active",
          "score": null,
          "placement": null,
          "challengeId": 30039586
        }]
      },
      "projectId": 6680,
      "projectName": "My Media",
      "handle": "Ghostar"
    }, {
      "updatedAt": "2014-03-03T03:27Z",
      "createdAt": "2014-03-01T03:26Z",
      "createdBy": "151743",
      "updatedBy": "22841596",
      "technologies": "iOS",
      "status": "Completed",
      "track": null,
      "subTrack": "Bug Hunt",
      "name": "24 hour Hercules Player Personal Content DVR iOS 1 0 8 9 Bug Hunt",
      "type": "Bug Hunt",
      "reviewType": null,
      "id": 30040956,
      "userId": 151743,
      "forumId": 21683,
      "numSubmissions": 4,
      "numRegistrants": 5,
      "registrationStartDate": "2014-03-01T08:51Z",
      "registrationEndDate": "2014-03-02T08:51Z",
      "checkpointSubmissionEndDate": null,
      "submissionEndDate": "2014-03-02T08:56Z",
      "platforms": "iOS",
      "numberOfCheckpointPrizes": null,
      "totalCheckpointPrize": null,
      "isPrivate": null,
      "upcomingPhase": null,
      "userDetails": {
        "roles": [
          "Specification Submitter",
          "Reviewer",
          "Copilot"
        ],
        "hasUserSubmittedForReview": false,
        "submissionReviewScore": null,
        "winningPlacements": null,
        "submissions": [{
          "id": 174657,
          "submittedAt": "2014-03-01T03:26Z",
          "status": "Active",
          "score": null,
          "placement": null,
          "challengeId": 30040956
        }]
      },
      "projectId": 6680,
      "projectName": "My Media",
      "handle": "Ghostar"
    }, {
      "updatedAt": "2014-03-13T12:51Z",
      "createdAt": "2014-03-10T11:33Z",
      "createdBy": "151743",
      "updatedBy": "22841596",
      "technologies": "iOS",
      "status": "Completed",
      "track": null,
      "subTrack": "Bug Hunt",
      "name": "24 hour Hercules Player Personal Content DVR iOS 1 0 8 11 Bug Hunt",
      "type": "Bug Hunt",
      "reviewType": null,
      "id": 30041194,
      "userId": 151743,
      "forumId": 21775,
      "numSubmissions": 4,
      "numRegistrants": 7,
      "registrationStartDate": "2014-03-10T12:45Z",
      "registrationEndDate": "2014-03-11T12:45Z",
      "checkpointSubmissionEndDate": null,
      "submissionEndDate": "2014-03-11T12:50Z",
      "platforms": "iOS",
      "numberOfCheckpointPrizes": null,
      "totalCheckpointPrize": null,
      "isPrivate": null,
      "upcomingPhase": null,
      "userDetails": {
        "roles": [
          "Approver",
          "Reviewer",
          "Specification Submitter",
          "Copilot"
        ],
        "hasUserSubmittedForReview": false,
        "submissionReviewScore": null,
        "winningPlacements": null,
        "submissions": [{
          "id": 175391,
          "submittedAt": "2014-03-10T11:33Z",
          "status": "Active",
          "score": null,
          "placement": null,
          "challengeId": 30041194
        }]
      },
      "projectId": 6680,
      "projectName": "My Media",
      "handle": "Ghostar"
    }, {
      "updatedAt": "2014-05-09T22:06Z",
      "createdAt": "2014-05-06T20:48Z",
      "createdBy": "151743",
      "updatedBy": "22841596",
      "technologies": "iOS",
      "status": "Completed",
      "track": null,
      "subTrack": "Bug Hunt",
      "name": "Hercules PCDVR iOS App - Version 1 0 9 8 Bug hunt",
      "type": "Bug Hunt",
      "reviewType": null,
      "id": 30042561,
      "userId": 151743,
      "forumId": 22844,
      "numSubmissions": 3,
      "numRegistrants": 7,
      "registrationStartDate": "2014-05-06T22:09Z",
      "registrationEndDate": "2014-05-08T22:09Z",
      "checkpointSubmissionEndDate": null,
      "submissionEndDate": "2014-05-08T22:09Z",
      "platforms": "iOS",
      "numberOfCheckpointPrizes": null,
      "totalCheckpointPrize": null,
      "isPrivate": null,
      "upcomingPhase": null,
      "userDetails": {
        "roles": [
          "Copilot",
          "Specification Submitter",
          "Reviewer"
        ],
        "hasUserSubmittedForReview": false,
        "submissionReviewScore": null,
        "winningPlacements": null,
        "submissions": [{
          "id": 179560,
          "submittedAt": "2014-05-06T20:49Z",
          "status": "Active",
          "score": null,
          "placement": null,
          "challengeId": 30042561
        }]
      },
      "projectId": 6680,
      "projectName": "My Media",
      "handle": "Ghostar"
    }, {
      "updatedAt": "2014-06-17T01:43Z",
      "createdAt": "2014-06-14T03:15Z",
      "createdBy": "151743",
      "updatedBy": "22841596",
      "technologies": "iOS",
      "status": "Completed",
      "track": null,
      "subTrack": "Bug Hunt",
      "name": "Hercules PCDVR iOS App - Version 1 0 9 14 Bug hunt",
      "type": "Bug Hunt",
      "reviewType": null,
      "id": 30043468,
      "userId": 151743,
      "forumId": 23565,
      "numSubmissions": 4,
      "numRegistrants": 4,
      "registrationStartDate": "2014-06-14T04:28Z",
      "registrationEndDate": "2014-06-16T04:28Z",
      "checkpointSubmissionEndDate": null,
      "submissionEndDate": "2014-06-16T04:28Z",
      "platforms": "iOS",
      "numberOfCheckpointPrizes": null,
      "totalCheckpointPrize": null,
      "isPrivate": null,
      "upcomingPhase": null,
      "userDetails": {
        "roles": [
          "Copilot",
          "Reviewer",
          "Specification Submitter"
        ],
        "hasUserSubmittedForReview": false,
        "submissionReviewScore": null,
        "winningPlacements": null,
        "submissions": [{
          "id": 182096,
          "submittedAt": "2014-06-14T03:15Z",
          "status": "Active",
          "score": null,
          "placement": null,
          "challengeId": 30043468
        }]
      },
      "projectId": 6680,
      "projectName": "My Media",
      "handle": "Ghostar"
    }];
  }

  function getMockSpotlightChallenges() {
    return [{
      challengeName: 'Styx iOS Video Mobile App Bug Fixes - 177+214',
      challengeType: 'Code',
      totalPrize: '1200',
      registrationStartDate: '2015-05-01T00:00:00.000-0400',
      numRegistrants: 21,
      numSubmissions: 8
    }, {
      challengeName: 'Styx iOS Video Mobile App Bug Fixes - 177+214',
      challengeType: 'Code',
      totalPrize: '1200',
      registrationStartDate: '2015-05-01T00:00:00.000-0400',
      numRegistrants: 21,
      numSubmissions: 8
    }];
  }

  function getMockiOSChallenges() {
    return [{
      challengeName: 'Peer Review Load Test 0.4',
      technologies: ['iOS'],
      platforms: ['iOS'],
      reviewType: 'PEER',
      status: 'active',
      registrationEndDate: '2015-06-11T03:16:00.000-0400',
      numRegistrants: 1058,
      numSubmissions: 1034,
      challengeType: 'Code',
      challengeCommunity: 'develop',
      challengeId: 30049290
    }, {
      challengeName: 'Real World iOS Challenge - 1',
      technologies: ['Swift'],
      platforms: [],
      totalPrize: 200,
      reviewType: 'INTERNAL',
      status: 'active',
      registrationEndDate: '2015-06-27T11:01:00.000-0400',
      numRegistrants: 5,
      numSubmissions: 5,
      challengeType: 'Design First2Finish',
      challengeCommunity: 'develop',
      challengeId: 30049240
    }, {
      challengeName: 'Lifelog iOS Mobile App using Swift UI Assembly 1 - realworldswift',
      technologies: ['SWIFT', 'iOS'],
      platforms: ['iOS'],
      totalPrize: 1950,
      reviewType: 'COMMUNITY',
      status: 'active',
      registrationEndDate: '2015-03-25T11:49:18.335-0400',
      numRegistrants: 28,
      numSubmissions: 0,
      challengeType: 'Assembly Competition',
      challengeCommunity: 'develop',
      challengeId: 30049013
    }];
  }

  function getMockChallengeDates() {
    return {
      "data": {
        "id": "-13e20d1e:14e4052be45:-7f73",
        "result": {
          "success": true,
          "status": 200,
          "metadata": null,
          "content": [{
            "updatedAt": null,
            "createdAt": null,
            "createdBy": null,
            "updatedBy": null,
            "scheduledStartTime": "2015-04-03T13:58Z",
            "scheduledEndTime": "2015-05-01T04:00Z",
            "actualStartTime": "2015-04-03T13:58Z",
            "actualEndTime": null
          }]
        },
        "version": "v3"
      }
    };
  }

  function getMockUsersPeerReviews() {
    return {
      "data": {
        "id": "-13e20d1e:14e4052be45:-7f71",
        "result": {
          "success": true,
          "status": 200,
          "metadata": null,
          "content": [{
            "updatedAt": "2015-06-15T17:23Z",
            "createdAt": "2015-06-12T22:25Z",
            "createdBy": "2000003",
            "updatedBy": "2000003",
            "id": 388840,
            "resourceId": null,
            "submissionId": 506562,
            "projectPhaseId": null,
            "scorecardId": null,
            "committed": 1,
            "uploadId": 506581,
            "score": 100.0,
            "initialScore": 100.0,
            "reviewerUserId": 2000003,
            "submitterUserId": 1800109
          }, {
            "updatedAt": "2015-06-23T19:32Z",
            "createdAt": "2015-06-15T17:23Z",
            "createdBy": "2000003",
            "updatedBy": "2000003",
            "id": 388850,
            "resourceId": null,
            "submissionId": 506597,
            "projectPhaseId": null,
            "scorecardId": null,
            "committed": 0,
            "uploadId": 506616,
            "score": 0.0,
            "initialScore": 0.0,
            "reviewerUserId": 2000003,
            "submitterUserId": 2000007
          }, {
            "updatedAt": "2015-06-23T18:24Z",
            "createdAt": "2015-06-15T21:10Z",
            "createdBy": "2000003",
            "updatedBy": "2000003",
            "id": 388851,
            "resourceId": null,
            "submissionId": 506557,
            "projectPhaseId": null,
            "scorecardId": null,
            "committed": 1,
            "uploadId": 506576,
            "score": 13.199999809265137,
            "initialScore": 66.0,
            "reviewerUserId": 2000003,
            "submitterUserId": 1800103
          }, {
            "updatedAt": "2015-06-23T19:32Z",
            "createdAt": "2015-06-23T19:32Z",
            "createdBy": "2000003",
            "updatedBy": "2000003",
            "id": 388860,
            "resourceId": null,
            "submissionId": 506570,
            "projectPhaseId": null,
            "scorecardId": null,
            "committed": 0,
            "uploadId": 506589,
            "score": 0.0,
            "initialScore": 0.0,
            "reviewerUserId": 2000003,
            "submitterUserId": 1800125
          }, {
            "updatedAt": "2015-06-23T19:32Z",
            "createdAt": "2015-06-23T19:32Z",
            "createdBy": "2000003",
            "updatedBy": "2000003",
            "id": 388861,
            "resourceId": null,
            "submissionId": 506583,
            "projectPhaseId": null,
            "scorecardId": null,
            "committed": 0,
            "uploadId": 506602,
            "score": 0.0,
            "initialScore": 0.0,
            "reviewerUserId": 2000003,
            "submitterUserId": 1800159
          }]
        },
        "version": "v3"
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
      data: {
        "handle": "vikasrohit",
        "country": "India",
        "memberSince": "2007-07-08T13:46:00.000-0400",
        "quote": "Trying to be TopCoder....",
        "photoLink": "/i/m/vikasrohit.jpeg",
        "copilot": false,
        "overallEarning": 10653.27,
        "ratingSummary": [{
          "name": "Development",
          "rating": 800,
          "colorStyle": "color: #999999"
        }, {
          "name": "Assembly",
          "rating": 866,
          "colorStyle": "color: #999999"
        }, {
          "name": "Design",
          "rating": 879,
          "colorStyle": "color: #999999"
        }, {
          "name": "Algorithm",
          "rating": 566,
          "colorStyle": "color: #999999"
        }, {
          "name": "Marathon Match",
          "rating": 961,
          "colorStyle": "color: #00A900"
        }],
        "Achievements": [{
          "date": "2012-09-28T00:00:00.000-0400",
          "description": "First Marathon Competition"
        }, {
          "date": "2012-09-28T00:00:00.000-0400",
          "description": "First Rated Algorithm Competition"
        }, {
          "date": "2012-09-28T00:00:00.000-0400",
          "description": "Five Rated Algorithm Competitions"
        }, {
          "date": "2012-09-28T00:00:00.000-0400",
          "description": "Three Marathon Competitions"
        }, {
          "date": "2010-04-07T00:00:00.000-0400",
          "description": "First Forum Post"
        }, {
          "date": "2010-02-18T00:00:00.000-0500",
          "description": "First Passing Submission"
        }, {
          "date": "2009-12-18T00:00:00.000-0500",
          "description": "One Hundred Forum Posts"
        }, {
          "date": "2009-12-10T00:00:00.000-0500",
          "description": "First Placement"
        }, {
          "date": "2009-12-10T00:00:00.000-0500",
          "description": "First Win"
        }, {
          "date": "2009-02-19T00:00:00.000-0500",
          "description": "Five Hundred Forum Posts"
        }, {
          "date": "2008-09-30T00:00:00.000-0400",
          "description": "Digital Run Top Five"
        }, {
          "date": "2008-05-01T00:00:00.000-0400",
          "description": "One Thousand Forum Posts"
        }]
      }
    };
  }

  function getMockMarathons() {
    return [{
      "roundId": 15761,
      "fullName": "USAID and Humanity United",
      "shortName": "Tech Challenge for Atrocity Prevention",
      "startDate": "08.22.2013 13:30 EDT",
      "endDate": "08.22.2013 13:30 EDT",
      "winnerHandle": "nhzp339",
      "winnerScore": 376.79
    }, {
      "roundId": 15684,
      "fullName": "Marathon Match 81",
      "shortName": "Marathon Match 81",
      "startDate": "06.05.2013 12:43 EDT",
      "endDate": "06.05.2013 12:43 EDT",
      "winnerHandle": "ACRush",
      "winnerScore": 999534.81
    }];
  }

  function getMockProfile() {
    return {
      "updatedAt": null,
      "createdAt": null,
      "createdBy": null,
      "updatedBy": null,
      "userId": 10336829,
      "firstName": "Albert",
      "maxRating": {
        "rating": 1616,
        "track": "DEVELOP",
        "subTrack": "DESIGN"
      },
      "lastName": "Wang",
      "quote": "Competing since 2004, albertwang has achieved ratings in multiple data science, architecture, and devleopment challenge tracks. He is most skilled in component design and architecture",
      "description": null,
      "otherLangName": "NIAL",
      "handle": "albertwang",
      "email": "email@domain.com.z",
      "addresses": [
        {
          "streetAddr1": "123 Main Street",
          "streetAddr2": "address_2",
          "city": "Santa Clause",
          "zip": "47579",
          "stateCode": "IN",
          "addressId": 90263,
          "type": "Home"
        }
      ],
      "homeCountryCode": "USA",
      "competitionCountryCode": "CHN",
      "photoURL": "https://topcoder-dev-media.s3.amazonaws.com/member/profile/albertwang-1440793843057.jpg",
      "tracks": [
        "DESIGN",
        "DEVELOP",
        "DATA_SCIENCE"
      ]
    };
  }

  function getMockHistory() {
    return {
      "id": "-306aafb8:14f65e30765:-8000",
      "result": {
        "success": true,
        "status": 200,
        "metadata": null,
        "content": {
          "updatedAt": null,
          "createdAt": null,
          "createdBy": null,
          "updatedBy": null,
          "userId": 151743,
          "handle": "Ghostar",
          "DEVELOP": {
            "subTracks": [{
              "id": 112,
              "name": "DESIGN",
              "history": [{
                "challengeId": 30009817,
                "challengeName": "Disney Marine Munch - Flash Game Module Architecture",
                "ratingDate": "2010-02-28T13:00:00.000Z",
                "newRating": 1172
              }]
            }, {
              "id": 125,
              "name": "ASSEMBLY_COMPETITION",
              "history": [{
                "challengeId": 30007872,
                "challengeName": "Best Buy Blackberry Web Application Wrapper Assembly",
                "ratingDate": "2009-10-18T23:30:00.000Z",
                "newRating": 1515
              }, {
                "challengeId": 30008010,
                "challengeName": "Best Buy Android Web Application Wrapper Assembly",
                "ratingDate": "2009-10-24T01:00:00.000Z",
                "newRating": 1566
              }]
            }]
          },
          "DATA_SCIENCE": {
            "SRM": {
              "history": []
            },
            "MARATHON_MATCH": {
              "history": []
            }
          }
        }
      },
      "version": "v3"
    }
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
        "subTracks": [{
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
            "reliability": 0.6667,
            "rating": 0
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
        }, {
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
            "reliability": 0.4667,
            "rating": 0
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
        }, {
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
            "reliability": 1,
            "rating": 0
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
        }, {
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
            "reliability": 0.9333,
            "rating": 0
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
        }, {
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
        }, {
          "id": 125,
          "name": "ASSEMBLY_COMPETITION",
          "challenges": 22,
          "wins": 10,
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
        }, {
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
        }, {
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
        }, {
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
        }, {
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
        }, {
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
        }]
      },
      "DESIGN": {
        "challenges": 664,
        "wins": 271,
        "subTracks": [{
          "id": 34,
          "name": "STUDIO_OTHER",
          "challenges": 21,
          "wins": 4,
          "mostRecentEventDate": "2011-04-20T09:00:00.000Z"
        }, {
          "id": 30,
          "name": "WIDGET_OR_MOBILE_SCREEN_DESIGN",
          "challenges": 82,
          "wins": 30,
          "mostRecentEventDate": "2015-02-01T22:00:53.000Z"
        }, {
          "id": 22,
          "name": "IDEA_GENERATION",
          "challenges": 3,
          "wins": 0,
          "mostRecentEventDate": "2013-05-27T10:00:07.000Z"
        }, {
          "id": 17,
          "name": "WEB_DESIGNS",
          "challenges": 418,
          "wins": 190,
          "mostRecentEventDate": "2015-01-26T19:00:03.000Z"
        }, {
          "id": 29,
          "name": "COPILOT_POSTING",
          "challenges": 1,
          "wins": 0,
          "mostRecentEventDate": null
        }, {
          "id": 18,
          "name": "WIREFRAMES",
          "challenges": 2,
          "wins": 1,
          "mostRecentEventDate": "2010-11-17T09:00:00.000Z"
        }, {
          "id": 14,
          "name": "ASSEMBLY_COMPETITION",
          "challenges": 1,
          "wins": 0,
          "mostRecentEventDate": null
        }, {
          "id": 32,
          "name": "APPLICATION_FRONT_END_DESIGN",
          "challenges": 54,
          "wins": 23,
          "mostRecentEventDate": "2014-08-07T01:03:11.000Z"
        }, {
          "id": 21,
          "name": "PRINT_OR_PRESENTATION",
          "challenges": 24,
          "wins": 8,
          "mostRecentEventDate": "2014-10-08T17:48:09.000Z"
        }, {
          "id": 16,
          "name": "BANNERS_OR_ICONS",
          "challenges": 24,
          "wins": 10,
          "mostRecentEventDate": "2014-01-11T17:30:27.000Z"
        }, {
          "id": 20,
          "name": "LOGO_DESIGN",
          "challenges": 31,
          "wins": 4,
          "mostRecentEventDate": "2014-02-21T19:00:09.000Z"
        }, {
          "id": 31,
          "name": "FRONT_END_FLASH",
          "challenges": 2,
          "wins": 1,
          "mostRecentEventDate": "2009-06-19T23:00:00.000Z"
        }, {
          "id": 13,
          "name": "TEST_SUITES",
          "challenges": 1,
          "wins": 0,
          "mostRecentEventDate": null
        }],
        "mostRecentEventDate": "2015-02-01T22:00:53.000Z"
      },
      "DATA_SCIENCE": {
        "challenges": 10,
        "wins": 0,
        "SRM": {
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
          "challengeDetails": [{
            "levelName": "Level Three",
            "challenges": 3,
            "failedChallenges": 1
          }, {
            "levelName": "Level Two",
            "challenges": 4,
            "failedChallenges": 2
          }, {
            "levelName": "Level One",
            "challenges": 3,
            "failedChallenges": 3
          }],
          "division1": [{
            "levelName": "Level Three",
            "problemsSubmitted": 0,
            "problemsFailed": 0,
            "problemsSysByTest": 0
          }, {
            "levelName": "Level One",
            "problemsSubmitted": 4,
            "problemsFailed": 0,
            "problemsSysByTest": 2
          }, {
            "levelName": "Level Two",
            "problemsSubmitted": 2,
            "problemsFailed": 1,
            "problemsSysByTest": 1
          }],
          "division2": [{
            "levelName": "Level Three",
            "problemsSubmitted": 3,
            "problemsFailed": 1,
            "problemsSysByTest": 0
          }, {
            "levelName": "Level Two",
            "problemsSubmitted": 9,
            "problemsFailed": 2,
            "problemsSysByTest": 1
          }, {
            "levelName": "Level One",
            "problemsSubmitted": 9,
            "problemsFailed": 0,
            "problemsSysByTest": 1
          }]
        },
        "MARATHON_MATCH": {
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
        "activeProjects": 1,
        "fulfillment": 83.53
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

  function getMockBadge() {
    return {
      name: "Mock achievement",
      date: "Sept 10, 2010",
      currentlyEarned: 2
    };
  }

  function getMockSRMs() {
    return [{
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
    }, {
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
    }, {
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
    }];
  }

  function getMockSRMResults() {
    return [{
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
    }, {
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
    }, {
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
    }];
  }

  function getMockUserFinancials() {
    return [{
      "updatedAt": null,
      "createdAt": null,
      "createdBy": null,
      "updatedBy": null,
      "userId": 10336829,
      "amount": 10.0,
      "status": "OWED"
    }, {
      "updatedAt": null,
      "createdAt": null,
      "createdBy": null,
      "updatedBy": null,
      "userId": 10336829,
      "amount": 20.50,
      "status": "ENTERED_INTO_PAYMENT_SYSTEM"
    }, {
      "updatedAt": null,
      "createdAt": null,
      "createdBy": null,
      "updatedBy": null,
      "userId": 10336829,
      "amount": 30,
      "status": "PAID"
    }];
  }

  function getMockLinkedExternalAccountsData() {
    return {
      "updatedAt": null,
      "createdAt": null,
      "createdBy": null,
      "updatedBy": null,
      "userId": 22688955,
      "handle": "test",
      "behance": null,
      "bitbucket": {
        "handle": "test1",
        "followers": 0,
        "languages": "html/css",
        "repos": 1
      },
      "dribbble": {
        "handle": "test2",
        "socialId": "944202",
        "name": "Vikas Agarwal",
        "summary": "Principal Engineer <a href=\"/Appirio\">@Appirio</a>",
        "followers": 0,
        "likes": 0,
        "tags": null
      },
      "github": {
        "handle": "test3",
        "socialId": "2417632",
        "publicRepos": 11,
        "followers": 2,
        "languages": "Java,JavaScript,HTML,CSS,Ruby"
      },
      "linkedin": null,
      "stackoverflow": {
        "name": "test",
        "socialId": "365172",
        "answers": 42,
        "questions": 9,
        "reputation": 928,
        "topTags": "java,jsp,jstl,hashmap,quartz-scheduler,eclipse,ant,tomcat,warnings,hadoop,mysql,amazon-ec2,amazon-ebs,java-ee,amazon-web-services,amazon-rds,hibernate,scala,maven,apache-spark,apache-spark-sql,hbase,scheduling,javascript,gmail,junit,byte,persistence,hql,gdata"
      },
      "twitter": null,
      plain: function() {}
    };
  }

  function getMockLinkedExternalAccounts() {
    return {
      profiles: [{
        providerType: 'github'
      }, {
        providerType: 'stackoverflow'
      }, {
        providerType: 'behance'
      }, {
        providerType: 'dribbble'
      }, {
        providerType: 'bitbucket'
      }]
    }
  }

  function getMockExternalWebLinksData() {
    return [
      {
        "userId": 111,
        "key": "c69a1246c135b16069395010e91f5c64",
        "handle": "test1",
        "description": "description 1.",
        "entities": "Activiti,Data Science,Reference Implementation for Angular Reference",
        "keywords": "topcoder-app,merged,oct,dashboard,15appirio-tech,20appirio-tech,polish,21appirio-tech,sup-1889,19appirio-tech",
        "title": "Test's profile",
        "images": "https://avatars3.githubusercontent.com/u/2417632?v=3&s=400,https://avatars1.githubusercontent.com/u/2417632?v=3&s=460,https://assets-cdn.github.com/images/spinners/octocat-spinner-128.gif",
        "source": "embed.ly",
        "synchronizedAt": 123112
      }, {
        "userId": 111,
        "key": "c69a1246c135b16069395010e91f5c65",
        "handle": "test1",
        "description": "description 1.",
        "entities": "Activiti,Data Science,Reference Implementation for Angular Reference",
        "keywords": "topcoder-app,merged,oct,dashboard,15appirio-tech,20appirio-tech,polish,21appirio-tech,sup-1889,19appirio-tech",
        "title": "Test's profile",
        "images": "https://avatars3.githubusercontent.com/u/2417632?v=3&s=400,https://avatars1.githubusercontent.com/u/2417632?v=3&s=460,https://assets-cdn.github.com/images/spinners/octocat-spinner-128.gif",
        "source": "embed.ly",
        "synchronizedAt": 123123
      }, {
        "userId": 111,
        "key": "c69a1246c135b16069395010e91f5c66",
        "handle": "test1",
        "synchronizedAt": 0
      }
    ]
  }

  function getMockAuth0Profile() {
    return {
      "user_id": "mockSocialNetwork|123456",
      "given_name": "mock",
      "family_name": "user",
      "first_name": "mock",
      "last_name": "user",
      "nickname": "mocky",
      "name": "mock user",
      "email": "mock@topcoder.com",
      "username": "mockuser",
      "identities": [
        {
          "access_token": "abcdefghi",
          "access_token_secret": "abcdefghijklmnopqrstuvwxyz"
        }
      ]
    };
  }

})();
