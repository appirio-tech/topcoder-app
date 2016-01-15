/* jshint -W117, -W030 */
describe('Challenge Service', function() {
  var challengeData = mockData.getMockChallenge();
  var apiUrl;

  beforeEach(function() {
    bard.appModule('tc.services');
    bard.inject(this, '$httpBackend', 'ChallengeService', 'CONSTANTS');

    apiUrl = CONSTANTS.API_URL_V2;
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should exist', function() {
    expect(ChallengeService).to.exist;
  });

  it('getChallengeDetails returns challenge information', function() {
    $httpBackend
      .when('GET', apiUrl + '/challenges/' + 123456)
      .respond(200, [{}]);

    ChallengeService.getChallengeDetails(123456)
    .then(function(data) {
      expect(data).to.exist;
    })
    $httpBackend.flush();
  });

  it('getChallengeDetails returns error information', function() {
    $httpBackend
      .when('GET', apiUrl + '/challenges/' + 123456)
      .respond(500, {message: 'there was an error'});

    ChallengeService.getChallengeDetails(123456)
    .catch(function(error) {
      expect(error.data.message).to.match(/error/);
    })
    $httpBackend.flush();
  });

  it('processPastChallenges should process the won DESIGN/WEB_DESIGNS challenge ', function() {
    var challenges = [
      {
        id: 30041345,
        name: 'Mock Challenge 1',
        track: 'DESIGN',
        subTrack: 'WEB_DESIGNS',
        userDetails: {
          hasUserSubmittedForReview: true,
          roles: ['Submitter'],
          submissions: [
            {
              challengeId: 30041345,
              id: 12345,
              placement: 1,
              score: 98.0,
              status: 'Active',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12346,
              placement: 11,
              score: 0.0,
              status: 'Failed Review',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12347,
              placement: 21,
              score: 0.0,
              status: 'Completed Without Win',
              type: 'Checkpoint Submission'
            }
          ]
        }
      }
    ];
    ChallengeService.processPastChallenges(challenges);
    var challenge = challenges[0];
    expect(challenge.highestPlacement).to.exist.to.equal(1);
    expect(challenge.wonFirst).to.exist.to.true;
    expect(challenge.userStatus).to.exist.to.equal('PASSED_REVIEW');
    expect(challenge.userHasSubmitterRole).to.exist.to.true;
  });

  it('processPastChallenges should process the won DEVELOP/<ANY> challenge ', function() {
    var challenges = [
      {
        id: 30041345,
        name: 'Mock Challenge 1',
        track: 'DEVELOP',
        subTrack: 'CODE',
        userDetails: {
          hasUserSubmittedForReview: true,
          roles: ['Submitter'],
          submissions: [
            {
              challengeId: 30041345,
              id: 12345,
              placement: 1,
              score: 98.0,
              status: 'Active',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12346,
              placement: 11,
              score: 0.0,
              status: 'Failed Review',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12347,
              placement: 21,
              score: 0.0,
              status: 'Completed Without Win',
              type: 'Checkpoint Submission'
            }
          ],
          winningPlacements: [2, 11, 1]
        }

      }
    ];
    ChallengeService.processPastChallenges(challenges);
    var challenge = challenges[0];
    expect(challenge.highestPlacement).to.exist.to.equal(1);
    expect(challenge.wonFirst).to.exist.to.true;
    expect(challenge.userStatus).to.exist.to.equal('PASSED_REVIEW');
    expect(challenge.userHasSubmitterRole).to.exist.to.true;
  });

  it('processPastChallenges should process the lost DEVELOP/<ANY> challenge ', function() {
    var challenges = [
      {
        id: 30041345,
        name: 'Mock Challenge 1',
        track: 'DEVELOP',
        subTrack: 'CODE',
        userDetails: {
          hasUserSubmittedForReview: true,
          roles: ['Submitter'],
          submissions: [
            {
              challengeId: 30041345,
              id: 12345,
              placement: 1,
              score: 98.0,
              status: 'Active',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12346,
              placement: 11,
              score: 0.0,
              status: 'Failed Review',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12347,
              placement: 21,
              score: 0.0,
              status: 'Completed Without Win',
              type: 'Checkpoint Submission'
            }
          ],
          winningPlacements: [0]
        }

      }
    ];
    ChallengeService.processPastChallenges(challenges);
    var challenge = challenges[0];
    expect(challenge.highestPlacement).not.to.exist;
    expect(challenge.wonFirst).to.exist.to.false;
    expect(challenge.userStatus).to.exist.to.equal('PASSED_SCREENING');
    expect(challenge.userHasSubmitterRole).to.exist.to.true;
  });

  it('processPastChallenges should process the won DEVELOP/FIRST_2_FINISH challenge ', function() {
    var challenges = [
      {
        id: 30041345,
        name: 'Mock Challenge 1',
        track: 'DEVELOP',
        subTrack: 'FIRST_2_FINISH',
        userDetails: {
          hasUserSubmittedForReview: true,
          roles: ['Submitter'],
          submissions: [
            {
              challengeId: 30041345,
              id: 12345,
              placement: 1,
              score: 98.0,
              status: 'Active',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12346,
              placement: 11,
              score: 0.0,
              status: 'Failed Review',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12347,
              placement: 21,
              score: 0.0,
              status: 'Completed Without Win',
              type: 'Checkpoint Submission'
            }
          ]
        }
      }
    ];
    ChallengeService.processPastChallenges(challenges);
    var challenge = challenges[0];
    expect(challenge.highestPlacement).to.exist.to.equal(1);
    expect(challenge.wonFirst).to.exist.to.true;
    expect(challenge.userStatus).to.exist.to.equal('PASSED_REVIEW');
    expect(challenge.userHasSubmitterRole).to.exist.to.true;
  });

  it('processPastChallenges should process the lost(without placement) DEVELOP/FIRST_2_FINISH challenge ', function() {
    var challenges = [
      {
        id: 30041345,
        name: 'Mock Challenge 1',
        track: 'DEVELOP',
        subTrack: 'FIRST_2_FINISH',
        userDetails: {
          hasUserSubmittedForReview: true,
          roles: ['Submitter'],
          submissions: [
            {
              challengeId: 30041345,
              id: 12345,
              placement: null,
              score: 34.0,
              status: 'Active',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12346,
              placement: null,
              score: 0.0,
              status: 'Failed Review',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12347,
              placement: 1,
              score: 0.0,
              status: 'Completed Without Win',
              type: 'Checkpoint Submission'
            }
          ]
        }
      }
    ];
    ChallengeService.processPastChallenges(challenges);
    var challenge = challenges[0];
    expect(challenge.highestPlacement).not.to.exist;
    expect(challenge.wonFirst).to.exist.to.false;
    expect(challenge.userStatus).to.exist.to.equal('PASSED_SCREENING');
    expect(challenge.userHasSubmitterRole).to.exist.to.true;
  });

  it('processPastChallenges should process the lost(with placement) DEVELOP/FIRST_2_FINISH challenge ', function() {
    var challenges = [
      {
        id: 30041345,
        name: 'Mock Challenge 1',
        track: 'DEVELOP',
        subTrack: 'FIRST_2_FINISH',
        userDetails: {
          hasUserSubmittedForReview: true,
          roles: ['Submitter'],
          submissions: [
            {
              challengeId: 30041345,
              id: 12345,
              placement: 5,
              score: 34.0,
              status: 'Active',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12346,
              placement: null,
              score: 0.0,
              status: 'Failed Review',
              type: 'Contest Submission'
            },
            {
              challengeId: 30041345,
              id: 12347,
              placement: 1,
              score: 0.0,
              status: 'Completed Without Win',
              type: 'Checkpoint Submission'
            }
          ]
        }
      }
    ];
    ChallengeService.processPastChallenges(challenges);
    var challenge = challenges[0];
    expect(challenge.highestPlacement).to.exist.to.equal(5);
    expect(challenge.wonFirst).to.exist.to.false;
    expect(challenge.userStatus).to.exist.to.equal('PASSED_REVIEW');
    expect(challenge.userHasSubmitterRole).to.exist.to.true;
  });

  it('processPastChallenges should process a not completed DEVELOP/FIRST_2_FINISH challenge ', function() {
    var challenges = [
      {
        id: 30041345,
        name: 'Mock Challenge 1',
        track: 'DEVELOP',
        subTrack: 'FIRST_2_FINISH',
        userDetails: {
          hasUserSubmittedForReview: false,
          roles: ['Submitter'],
          submissions: []
        }
      }
    ];
    ChallengeService.processPastChallenges(challenges);
    var challenge = challenges[0];
    expect(challenge.highestPlacement).not.to.exist;
    expect(challenge.wonFirst).to.exist.to.false;
    expect(challenge.userStatus).to.exist.to.equal('NOT_FINISHED');
    expect(challenge.userHasSubmitterRole).to.exist.to.true;
  });

  it('processPastChallenges should process a DEVELOP/FIRST_2_FINISH challenge for a non submitter user  ', function() {
    var challenges = [
      {
        id: 30041345,
        name: 'Mock Challenge 1',
        track: 'DEVELOP',
        subTrack: 'FIRST_2_FINISH',
        userDetails: {
          hasUserSubmittedForReview: false,
          roles: ['Observer'],
          submissions: []
        }
      }
    ];
    ChallengeService.processPastChallenges(challenges);
    var challenge = challenges[0];
    expect(challenge.highestPlacement).not.to.exist;
    expect(challenge.wonFirst).to.exist.to.false;
    expect(challenge.userStatus).to.exist.to.equal('COMPLETED');
    expect(challenge.userHasSubmitterRole).to.exist.to.false;
  });

  it('processPastChallenges should process a DEVELOP/<ANY> challenge for a user without role  ', function() {
    var challenges = [
      {
        id: 30041345,
        name: 'Mock Challenge 1',
        track: 'DEVELOP',
        subTrack: 'FIRST_2_FINISH',
        userDetails: {
          hasUserSubmittedForReview: false,
          roles: [],
          submissions: [],
          winningPlacements: [0]
        }
      }
    ];
    ChallengeService.processPastChallenges(challenges);
    var challenge = challenges[0];
    expect(challenge.highestPlacement).not.to.exist;
    expect(challenge.wonFirst).to.exist.to.false;
    expect(challenge.userStatus).to.exist.to.equal('COMPLETED');
    expect(challenge.userHasSubmitterRole).to.exist.to.false;
  });

  it('processPastSRM should process SRM with valid placement  ', function() {
    var srm = {
      id: 4460,
      name: "Holder",
      status: "PAST",
      track: "DATA_SCIENCE",
      subTrack : "SRM",
      startDate: "8/30/15 12:00 AM",
      endDate: "8/30/15 12:00 AM",
      rounds: [
        {
          id: 12345,
          forumId: 54321,
          status: "PAST",
          userSRMDetails: {
            newRating: 678,
            finalPoints: 226.45
          }
        }
      ]
    };
    ChallengeService.processPastSRM(srm);
    expect(srm.newRating).to.exist.to.equal(678);
    expect(srm.finalPoints).to.exist.to.equal(226.45);
  });

  it('processPastSRM should process SRM without rounds gracefully  ', function() {
    var srm = {
      id: 4460,
      name: "Holder",
      status: "PAST",
      track: "DATA_SCIENCE",
      subTrack : "SRM",
      startDate: "8/30/15 12:00 AM",
      endDate: "8/30/15 12:00 AM",
      rounds: []
    };
    ChallengeService.processPastSRM(srm);
    expect(srm.newRating).not.to.exist;
    expect(srm.finalPoints).not.to.exist;
  });

  it('processPastMarathonMatch should process MM with valid placement  ', function() {
    var mm = {
      id: 4460,
      name: "Holder",
      status: "PAST  ",
      track: "DATA_SCIENCE",
      subTrack : "MARATHON_MATCH",
      startDate: "8/30/15 12:00 AM",
      endDate: "8/30/15 12:00 AM",
      rounds: [
        {
          id: 12345,
          forumId: 54321,
          status: "PAST",
          systemTestEndAt: "8/29/15 12:00 AM",
          userMMDetails: {
            newRating: 678,
            rated: true,
            pointTotal: 22645
          }
        }
      ]
    };
    ChallengeService.processPastMarathonMatch(mm);
    expect(mm.status).to.exist.to.equal("PAST");// should trim the status
    expect(mm.newRating).to.exist.to.equal(678);
    expect(mm.pointTotal).to.exist.to.equal(22645);
    expect(mm.submissionEndDate).to.exist.to.equal("8/29/15 12:00 AM");
  });

  it('processPastMarathonMatch should process MM without rounds gracefully  ', function() {
    var mm = {
      id: 4460,
      name: "Holder",
      status: "PAST",
      track: "DATA_SCIENCE",
      subTrack : "MARATHON_MATCH",
      startDate: "8/30/15 12:00 AM",
      endDate: "8/30/15 12:00 AM",
      rounds: []
    };
    ChallengeService.processPastMarathonMatch(mm);
    expect(mm.newRating).not.to.exist;
    expect(mm.pointTotal).not.to.exist;
    expect(mm.submissionEndDate).not.to.exist;
  });

  it('processPastMarathonMatch should process MM with unrated user details  ', function() {
    var mm = {
      id: 4460,
      name: "Holder",
      status: "PAST  ",
      track: "DATA_SCIENCE",
      subTrack : "MARATHON_MATCH",
      startDate: "8/30/15 12:00 AM",
      endDate: "8/30/15 12:00 AM",
      rounds: [
        {
          id: 12345,
          forumId: 54321,
          status: "PAST",
          systemTestEndAt: "8/29/15 12:00 AM",
          userMMDetails: {
            newRating: null,
            rated: false,
            pointTotal: null
          }
        }
      ]
    };
    ChallengeService.processPastMarathonMatch(mm);
    expect(mm.status).to.exist.to.equal("PAST");// should trim the status
    expect(mm.newRating).not.to.exist;
    expect(mm.pointTotal).not.to.exist;
    expect(mm.submissionEndDate).not.to.exist;
  });

});
