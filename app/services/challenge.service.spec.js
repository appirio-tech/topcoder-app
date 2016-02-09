/*eslint no-undef:0*/
import moment from 'moment'

describe('Challenge Service', function() {
  var apiUrl

  beforeEach(function() {
    bard.appModule('tc.services')
    bard.inject(this, '$httpBackend', 'ChallengeService', 'CONSTANTS')

    apiUrl = CONSTANTS.API_URL_V2
  })

  bard.verifyNoOutstandingHttpRequests()

  it('should exist', function() {
    expect(ChallengeService).to.exist
  })

  it('getChallengeDetails returns challenge information', function() {
    $httpBackend
      .when('GET', apiUrl + '/challenges/' + 123456)
      .respond(200, [{}])

    ChallengeService.getChallengeDetails(123456)
    .then(function(data) {
      expect(data).to.exist
    })
    $httpBackend.flush()
  })

  it('getChallengeDetails returns error information', function() {
    $httpBackend
      .when('GET', apiUrl + '/challenges/' + 123456)
      .respond(500, {message: 'there was an error'})

    ChallengeService.getChallengeDetails(123456)
    .catch(function(error) {
      expect(error.data.message).to.match(/error/)
    })
    $httpBackend.flush()
  })

  describe('processActiveDevDesignChallenges ', function() {
    it('should process the active DESIGN/WEB_DESIGNS challenge with submitter role ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DESIGN',
          subTrack: 'WEB_DESIGNS',
          currentPhases: [
            {
              'challengeId': 30052661,
              'id': 789719,
              'phaseType': 'Registration',
              'phaseStatus': 'Open',
              'duration': 2419200000,
              'scheduledStartTime': moment().add(5, 'days'),
              'scheduledEndTime': moment().add(10, 'days'),
              'actualStartTime': moment().add(5, 'days'),
              'actualEndTime': null,
              'fixedStartTime': '2016-01-15T18:00Z'
            },
            {
              'challengeId': 30052661,
              'id': 789720,
              'phaseType': 'Submission',
              'phaseStatus': 'Open',
              'duration': 2418900000,
              'scheduledStartTime': moment().add(6, 'days'),
              'scheduledEndTime': moment().add(20, 'days'),
              'actualStartTime': moment().add(6, 'days'),
              'actualEndTime': null,
              'fixedStartTime': null
            }
          ],
          userDetails: {
            roles: [
              'Submitter'
            ],
            hasUserSubmittedForReview: false,
            submissionReviewScore: null,
            winningPlacements: null,
            submissions: null
          }
        }
      ]
      ChallengeService.processActiveDevDesignChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.userAction).to.exist.to.equal('Submit')
      expect(challenge.userCurrentPhaseEndTime).to.exist.to.have.length(3)
      expect(challenge.userCurrentPhaseEndTime[0]).to.exist.to.equal('10')
      expect(challenge.userCurrentPhaseEndTime[1]).to.exist.to.equal('days')
      expect(challenge.userCurrentPhase).to.exist.to.equal('Registration')
    })

    it('should process the active DESIGN/WEB_DESIGNS challenge with submitter role with 1 hour difference in end date ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DESIGN',
          subTrack: 'WEB_DESIGNS',
          currentPhases: [
            {
              'challengeId': 30052661,
              'id': 789719,
              'phaseType': 'Registration',
              'phaseStatus': 'Open',
              'duration': 2419200000,
              'scheduledStartTime': moment().subtract(5, 'days'),
              'scheduledEndTime': moment().add(1, 'hours'),
              'actualStartTime': moment().subtract(5, 'days'),
              'actualEndTime': null,
              'fixedStartTime': '2016-01-15T18:00Z'
            },
            {
              'challengeId': 30052661,
              'id': 789720,
              'phaseType': 'Submission',
              'phaseStatus': 'Open',
              'duration': 2418900000,
              'scheduledStartTime': moment().add(6, 'days'),
              'scheduledEndTime': moment().add(20, 'days'),
              'actualStartTime': moment().add(6, 'days'),
              'actualEndTime': null,
              'fixedStartTime': null
            }
          ],
          userDetails: {
            roles: [
              'Submitter'
            ],
            hasUserSubmittedForReview: false,
            submissionReviewScore: null,
            winningPlacements: null,
            submissions: null
          }
        }
      ]
      ChallengeService.processActiveDevDesignChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.userAction).to.exist.to.equal('Submit')
      expect(challenge.userCurrentPhaseEndTime).to.exist.to.have.length(3)
      expect(challenge.userCurrentPhaseEndTime[0]).to.exist.to.equal('1')
      expect(challenge.userCurrentPhaseEndTime[1]).to.exist.to.equal('hour')
      expect(challenge.userCurrentPhase).to.exist.to.equal('Registration')
    })

    it('should process the active DESIGN/WEB_DESIGNS challenge without null role ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DESIGN',
          subTrack: 'WEB_DESIGNS',
          currentPhases: [
            {
              'challengeId': 30052661,
              'id': 789719,
              'phaseType': 'Registration',
              'phaseStatus': 'Open',
              'duration': 2419200000,
              'scheduledStartTime': moment().add(5, 'days'),
              'scheduledEndTime': moment().add(10, 'days'),
              'actualStartTime': moment().add(5, 'days'),
              'actualEndTime': null,
              'fixedStartTime': '2016-01-15T18:00Z'
            },
            {
              'challengeId': 30052661,
              'id': 789720,
              'phaseType': 'Submission',
              'phaseStatus': 'Open',
              'duration': 2418900000,
              'scheduledStartTime': moment().add(6, 'days'),
              'scheduledEndTime': moment().add(20, 'days'),
              'actualStartTime': moment().add(6, 'days'),
              'actualEndTime': null,
              'fixedStartTime': null
            }
          ],
          userDetails: {
            roles: null,
            hasUserSubmittedForReview: false,
            submissionReviewScore: null,
            winningPlacements: null,
            submissions: null
          }
        }
      ]
      ChallengeService.processActiveDevDesignChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.userAction).to.exist.to.equal('Submit')
      expect(challenge.userCurrentPhaseEndTime).to.exist.to.have.length(3)
      expect(challenge.userCurrentPhaseEndTime[0]).to.exist.to.equal('10')
      expect(challenge.userCurrentPhaseEndTime[1]).to.exist.to.equal('days')
      expect(challenge.userCurrentPhase).to.exist.to.equal('Registration')
    })

    it('should process the active DESIGN/WEB_DESIGNS challenge without undefined role ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DESIGN',
          subTrack: 'WEB_DESIGNS',
          currentPhases: [
            {
              'challengeId': 30052661,
              'id': 789719,
              'phaseType': 'Registration',
              'phaseStatus': 'Open',
              'duration': 2419200000,
              'scheduledStartTime': moment().add(5, 'days'),
              'scheduledEndTime': moment().add(10, 'days'),
              'actualStartTime': moment().add(5, 'days'),
              'actualEndTime': null,
              'fixedStartTime': '2016-01-15T18:00Z'
            },
            {
              'challengeId': 30052661,
              'id': 789720,
              'phaseType': 'Submission',
              'phaseStatus': 'Open',
              'duration': 2418900000,
              'scheduledStartTime': moment().add(6, 'days'),
              'scheduledEndTime': moment().add(20, 'days'),
              'actualStartTime': moment().add(6, 'days'),
              'actualEndTime': null,
              'fixedStartTime': null
            }
          ],
          userDetails: {
            hasUserSubmittedForReview: false,
            submissionReviewScore: null,
            winningPlacements: null,
            submissions: null
          }
        }
      ]
      ChallengeService.processActiveDevDesignChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.userAction).to.exist.to.equal('Submit')
      expect(challenge.userCurrentPhaseEndTime).to.exist.to.have.length(3)
      expect(challenge.userCurrentPhaseEndTime[0]).to.exist.to.equal('10')
      expect(challenge.userCurrentPhaseEndTime[1]).to.exist.to.equal('days')
      expect(challenge.userCurrentPhase).to.exist.to.equal('Registration')
    })

    it('should process the active DESIGN/WEB_DESIGNS challenge with submitter role and already submitted ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DESIGN',
          subTrack: 'WEB_DESIGNS',
          currentPhases: [
            {
              'challengeId': 30052661,
              'id': 789719,
              'phaseType': 'Registration',
              'phaseStatus': 'Open',
              'duration': 2419200000,
              'scheduledStartTime': moment().add(5, 'days'),
              'scheduledEndTime': moment().add(10, 'days'),
              'actualStartTime': moment().add(5, 'days'),
              'actualEndTime': null,
              'fixedStartTime': '2016-01-15T18:00Z'
            },
            {
              'challengeId': 30052661,
              'id': 789720,
              'phaseType': 'Submission',
              'phaseStatus': 'Open',
              'duration': 2418900000,
              'scheduledStartTime': moment().add(6, 'days'),
              'scheduledEndTime': moment().add(20, 'days'),
              'actualStartTime': moment().add(6, 'days'),
              'actualEndTime': null,
              'fixedStartTime': null
            }
          ],
          userDetails: {
            roles: [
              'Submitter'
            ],
            hasUserSubmittedForReview: true,
            submissionReviewScore: null,
            winningPlacements: null,
            submissions: null
          }
        }
      ]
      ChallengeService.processActiveDevDesignChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.userAction).to.exist.to.equal('Submitted')
      expect(challenge.userCurrentPhaseEndTime).to.exist.to.have.length(3)
      expect(challenge.userCurrentPhaseEndTime[0]).to.exist.to.equal('20')
      expect(challenge.userCurrentPhaseEndTime[1]).to.exist.to.equal('days')
      expect(challenge.userCurrentPhase).to.exist.to.equal('Submission')
    })

    it('should process the active DESIGN/WEB_DESIGNS challenge with non submitter role ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DESIGN',
          subTrack: 'WEB_DESIGNS',
          currentPhases: [
            {
              'challengeId': 30052661,
              'id': 789719,
              'phaseType': 'Registration',
              'phaseStatus': 'Open',
              'duration': 2419200000,
              'scheduledStartTime': moment().add(5, 'days'),
              'scheduledEndTime': moment().add(10, 'days'),
              'actualStartTime': moment().add(5, 'days'),
              'actualEndTime': null,
              'fixedStartTime': '2016-01-15T18:00Z'
            },
            {
              'challengeId': 30052661,
              'id': 789720,
              'phaseType': 'Submission',
              'phaseStatus': 'Open',
              'duration': 2418900000,
              'scheduledStartTime': moment().add(6, 'days'),
              'scheduledEndTime': moment().add(20, 'days'),
              'actualStartTime': moment().add(6, 'days'),
              'actualEndTime': null,
              'fixedStartTime': null
            }
          ],
          userDetails: {
            roles: [
              'Observer'
            ],
            hasUserSubmittedForReview: false,
            submissionReviewScore: null,
            winningPlacements: null,
            submissions: null
          }
        }
      ]
      ChallengeService.processActiveDevDesignChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.userAction).not.to.exist
      expect(challenge.userCurrentPhaseEndTime).to.exist.to.have.length(3)
      expect(challenge.userCurrentPhaseEndTime[0]).to.exist.to.equal('10')
      expect(challenge.userCurrentPhaseEndTime[1]).to.exist.to.equal('days')
      expect(challenge.userCurrentPhase).to.exist.to.equal('Registration')
    })

    it('should process the active DESIGN/WEB_DESIGNS challenge with non submitter role ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DESIGN',
          subTrack: 'WEB_DESIGNS',
          currentPhases: [
            {
              'challengeId': 30052661,
              'id': 789719,
              'phaseType': 'Registration',
              'phaseStatus': 'Open',
              'duration': 2419200000,
              'scheduledStartTime': moment().add(5, 'days'),
              'scheduledEndTime': moment().add(10, 'days'),
              'actualStartTime': moment().add(5, 'days'),
              'actualEndTime': null,
              'fixedStartTime': '2016-01-15T18:00Z'
            },
            {
              'challengeId': 30052661,
              'id': 789720,
              'phaseType': 'Submission',
              'phaseStatus': 'Open',
              'duration': 2418900000,
              'scheduledStartTime': moment().add(6, 'days'),
              'scheduledEndTime': moment().add(20, 'days'),
              'actualStartTime': moment().add(6, 'days'),
              'actualEndTime': null,
              'fixedStartTime': null
            },
            {
              'challengeId': 30052661,
              'id': 789720,
              'phaseType': 'Review',
              'phaseStatus': 'Open',
              'duration': 2418900000,
              'scheduledStartTime': moment().add(20, 'days'),
              'scheduledEndTime': moment().add(22, 'days'),
              'actualStartTime': moment().add(20, 'days'),
              'actualEndTime': null,
              'fixedStartTime': null
            }
          ],
          userDetails: {
            roles: [
              'Submitter'
            ],
            hasUserSubmittedForReview: true,
            submissionReviewScore: null,
            winningPlacements: null,
            submissions: null
          }
        }
      ]
      ChallengeService.processActiveDevDesignChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.userAction).not.to.exist
      expect(challenge.userCurrentPhaseEndTime).to.exist.to.have.length(3)
      expect(challenge.userCurrentPhaseEndTime[0]).to.exist.to.equal('22')
      expect(challenge.userCurrentPhaseEndTime[1]).to.exist.to.equal('days')
      expect(challenge.userCurrentPhase).to.exist.to.equal('Review')
    })
  })

  describe('processPastChallenges ', function() {
    it('should process the won DESIGN/WEB_DESIGNS challenge ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DESIGN',
          subTrack: 'WEB_DESIGNS',
          userDetails: {
            hasUserSubmittedForReview: true,
            roles: ['Submitter'],
            winningPlacements: [
              {
                'submissionId': 12345,
                'submitterId': 123456,
                'amount': 500.0,
                'placed': 1,
                'finalScore': 98.0,
                'challengeId': 30041345
              }
            ],
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
      ]
      ChallengeService.processPastChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.highestPlacement).to.exist.to.equal(1)
      expect(challenge.wonFirst).to.exist.to.true
      expect(challenge.userStatus).to.exist.to.equal('PASSED_REVIEW')
      expect(challenge.userHasSubmitterRole).to.exist.to.true
    })

    it('should process the won DEVELOP/<ANY> challenge ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DEVELOP',
          subTrack: 'CODE',
          userDetails: {
            hasUserSubmittedForReview: true,
            roles: ['Submitter'],
            winningPlacements: [
              {
                'submissionId': 12345,
                'submitterId': 123456,
                'amount': 500.0,
                'placed': 1,
                'finalScore': 98.0,
                'challengeId': 30041345
              }
            ],
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
      ]
      ChallengeService.processPastChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.highestPlacement).to.exist.to.equal(1)
      expect(challenge.wonFirst).to.exist.to.true
      expect(challenge.userStatus).to.exist.to.equal('PASSED_REVIEW')
      expect(challenge.userHasSubmitterRole).to.exist.to.true
    })

    it('should process the lost DEVELOP/<ANY> challenge ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DEVELOP',
          subTrack: 'CODE',
          userDetails: {
            hasUserSubmittedForReview: true,
            roles: ['Submitter'],
            winningPlacements: null,
            submissions: [
              {
                challengeId: 30041345,
                id: 12345,
                placement: 5,
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
      ]
      ChallengeService.processPastChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.highestPlacement).not.to.exist
      expect(challenge.wonFirst).to.exist.to.false
      expect(challenge.userStatus).to.exist.to.equal('PASSED_REVIEW')
      expect(challenge.userHasSubmitterRole).to.exist.to.true
    })

    it('should process the won DEVELOP/FIRST_2_FINISH challenge ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DEVELOP',
          subTrack: 'FIRST_2_FINISH',
          userDetails: {
            hasUserSubmittedForReview: true,
            roles: ['Submitter'],
            winningPlacements: [
              {
                'submissionId': 12345,
                'submitterId': 123456,
                'amount': 500.0,
                'placed': 1,
                'finalScore': 98.0,
                'challengeId': 30041345
              }
            ],
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
      ]
      ChallengeService.processPastChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.highestPlacement).to.exist.to.equal(1)
      expect(challenge.wonFirst).to.exist.to.true
      expect(challenge.userStatus).to.exist.to.equal('PASSED_REVIEW')
      expect(challenge.userHasSubmitterRole).to.exist.to.true
    })

    it('should process the lost(without placement) DEVELOP/FIRST_2_FINISH challenge ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DEVELOP',
          subTrack: 'FIRST_2_FINISH',
          userDetails: {
            hasUserSubmittedForReview: true,
            roles: ['Submitter'],
            winningPlacements: null,
            submissions: [
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
      ]
      ChallengeService.processPastChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.highestPlacement).not.to.exist
      expect(challenge.wonFirst).to.exist.to.false
      expect(challenge.userStatus).to.exist.to.equal('PASSED_SCREENING')
      expect(challenge.userHasSubmitterRole).to.exist.to.true
    })

    it('should process the lost(with placement) DEVELOP/FIRST_2_FINISH challenge ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DEVELOP',
          subTrack: 'FIRST_2_FINISH',
          userDetails: {
            hasUserSubmittedForReview: true,
            roles: ['Submitter'],
            winningPlacements: null,
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
      ]
      ChallengeService.processPastChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.highestPlacement).not.to.exist.to
      expect(challenge.wonFirst).to.exist.to.false
      expect(challenge.userStatus).to.exist.to.equal('PASSED_REVIEW')
      expect(challenge.userHasSubmitterRole).to.exist.to.true
    })

    it('should process a not completed (empty submissions) DEVELOP/FIRST_2_FINISH challenge ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DEVELOP',
          subTrack: 'FIRST_2_FINISH',
          userDetails: {
            hasUserSubmittedForReview: false,
            roles: ['Submitter'],
            winningPlacements: null,
            submissions: []
          }
        }
      ]
      ChallengeService.processPastChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.highestPlacement).not.to.exist
      expect(challenge.wonFirst).to.exist.to.false
      expect(challenge.userStatus).to.exist.to.equal('NOT_FINISHED')
      expect(challenge.userHasSubmitterRole).to.exist.to.true
    })

    it('should process a not completed(null submissions) DEVELOP/FIRST_2_FINISH challenge ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DEVELOP',
          subTrack: 'FIRST_2_FINISH',
          userDetails: {
            hasUserSubmittedForReview: false,
            roles: ['Submitter'],
            winningPlacements: null,
            submissions: null
          }
        }
      ]
      ChallengeService.processPastChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.highestPlacement).not.to.exist
      expect(challenge.wonFirst).to.exist.to.false
      expect(challenge.userStatus).to.exist.to.equal('NOT_FINISHED')
      expect(challenge.userHasSubmitterRole).to.exist.to.true
    })

    it('should process a DEVELOP/FIRST_2_FINISH challenge for a non submitter user  ', function() {
      var challenges = [
        {
          id: 30041345,
          name: 'Mock Challenge 1',
          track: 'DEVELOP',
          subTrack: 'FIRST_2_FINISH',
          userDetails: {
            hasUserSubmittedForReview: false,
            roles: ['Observer'],
            winningPlacements: null,
            submissions: []
          }
        }
      ]
      ChallengeService.processPastChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.highestPlacement).not.to.exist
      expect(challenge.wonFirst).to.exist.to.false
      expect(challenge.userStatus).to.exist.to.equal('COMPLETED')
      expect(challenge.userHasSubmitterRole).to.exist.to.false
    })

    it('should process a DEVELOP/<ANY> challenge for a user without role  ', function() {
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
            winningPlacements: null
          }
        }
      ]
      ChallengeService.processPastChallenges(challenges)
      var challenge = challenges[0]
      expect(challenge.highestPlacement).not.to.exist
      expect(challenge.wonFirst).to.exist.to.false
      expect(challenge.userStatus).to.exist.to.equal('COMPLETED')
      expect(challenge.userHasSubmitterRole).to.exist.to.false
    })

  })

  it('processPastSRM should process SRM with valid placement  ', function() {
    var srm = {
      id: 4460,
      name: 'Holder',
      status: 'PAST',
      track: 'DATA_SCIENCE',
      subTrack : 'SRM',
      startDate: '8/30/15 12:00 AM',
      endDate: '8/30/15 12:00 AM',
      rounds: [
        {
          id: 12345,
          forumId: 54321,
          status: 'PAST',
          userSRMDetails: {
            newRating: 678,
            finalPoints: 226.45
          }
        }
      ]
    }
    ChallengeService.processPastSRM(srm)
    expect(srm.newRating).to.exist.to.equal(678)
    expect(srm.finalPoints).to.exist.to.equal(226.45)
  })

  it('processPastSRM should process SRM without rounds gracefully  ', function() {
    var srm = {
      id: 4460,
      name: 'Holder',
      status: 'PAST',
      track: 'DATA_SCIENCE',
      subTrack : 'SRM',
      startDate: '8/30/15 12:00 AM',
      endDate: '8/30/15 12:00 AM',
      rounds: []
    }
    ChallengeService.processPastSRM(srm)
    expect(srm.newRating).not.to.exist
    expect(srm.finalPoints).not.to.exist
  })

  it('processPastMarathonMatch should process MM with valid placement  ', function() {
    var mm = {
      id: 4460,
      name: 'Holder',
      status: 'PAST  ',
      track: 'DATA_SCIENCE',
      subTrack : 'MARATHON_MATCH',
      startDate: '8/30/15 12:00 AM',
      endDate: '8/30/15 12:00 AM',
      rounds: [
        {
          id: 12345,
          forumId: 54321,
          status: 'PAST',
          systemTestEndAt: '8/29/15 12:00 AM',
          userMMDetails: {
            newRating: 678,
            rated: true,
            pointTotal: 22645
          }
        }
      ]
    }
    ChallengeService.processPastMarathonMatch(mm)
    expect(mm.status).to.exist.to.equal('PAST')// should trim the status
    expect(mm.newRating).to.exist.to.equal(678)
    expect(mm.pointTotal).to.exist.to.equal(22645)
    expect(mm.submissionEndDate).to.exist.to.equal('8/29/15 12:00 AM')
  })

  it('processPastMarathonMatch should process MM without rounds gracefully  ', function() {
    var mm = {
      id: 4460,
      name: 'Holder',
      status: 'PAST',
      track: 'DATA_SCIENCE',
      subTrack : 'MARATHON_MATCH',
      startDate: '8/30/15 12:00 AM',
      endDate: '8/30/15 12:00 AM',
      rounds: []
    }
    ChallengeService.processPastMarathonMatch(mm)
    expect(mm.newRating).not.to.exist
    expect(mm.pointTotal).not.to.exist
    expect(mm.submissionEndDate).not.to.exist
  })

  it('processPastMarathonMatch should process MM with unrated user details  ', function() {
    var mm = {
      id: 4460,
      name: 'Holder',
      status: 'PAST  ',
      track: 'DATA_SCIENCE',
      subTrack : 'MARATHON_MATCH',
      startDate: '8/30/15 12:00 AM',
      endDate: '8/30/15 12:00 AM',
      rounds: [
        {
          id: 12345,
          forumId: 54321,
          status: 'PAST',
          systemTestEndAt: '8/29/15 12:00 AM',
          userMMDetails: {
            newRating: null,
            rated: false,
            pointTotal: null
          }
        }
      ]
    }
    ChallengeService.processPastMarathonMatch(mm)
    expect(mm.status).to.exist.to.equal('PAST')// should trim the status
    expect(mm.newRating).not.to.exist
    expect(mm.pointTotal).not.to.exist
    expect(mm.submissionEndDate).not.to.exist
  })

})
