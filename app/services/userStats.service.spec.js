/* jshint -W117, -W030 */
describe('User Stats Service', function() {
  var stats = mockData.getMockStats();

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.appModule('tc.services');
    bard.inject(this, 'UserStatsService', '$filter');

  });

  bard.verifyNoOutstandingHttpRequests();

  it('should exist', function() {
    expect(UserStatsService).to.exist;
  });

  describe('getIterableStats ', function() {

    it('should return empty array without stats ', function() {
      var _data = UserStatsService.getIterableStats('DEVELOP', 'ASSEMBLY_COMPETITION', null);
      expect(_data).to.have.length(0);
    });

    it('should return stats for develop-assembly_competition ', function() {
      var _data = UserStatsService.getIterableStats('DEVELOP', 'ASSEMBLY_COMPETITION', stats);
      expect(_data).to.have.length(6);

      expect(_.pluck(_data, 'val')).to.have.members(['1,733', '25', '95%', '16', '10', '80%']);
      expect(_.pluck(_data, 'label')).to.have.members(['rating', 'rank', 'percentile', 'challenges', 'wins', 'reliability']);
    });

    it('should return stats for design-webdesign ', function() {
      var _data = UserStatsService.getIterableStats('DESIGN', 'WEB_DESIGNS', stats);
      expect(_data).to.have.length(2);
      expect(_.pluck(_data, 'val')).to.have.members(['190','418']);
      expect(_.pluck(_data, 'label')).to.have.members(['wins', 'challenges']);
    });

    it('should return stats for data-science: srms ', function() {
      var _data = UserStatsService.getIterableStats('DATA_SCIENCE', 'SRM', stats);
      expect(_data).to.have.length(5);
      expect(_.pluck(_data, 'label')).to.have.members(['rating', 'rank', 'percentile', 'competitions', 'volatility']);
      expect(_.pluck(_data, 'val')).to.have.members(['799', '6,280', '26%', '10', '473']);
    });


    it('should return stats for Copilot ', function() {
      var _data = UserStatsService.getIterableStats('COPILOT', 'COPILOT', stats);
      expect(_data).to.have.length(5);
      expect(_.pluck(_data, 'label')).to.have.members(['active challenges', 'active projects', 'total challenges', 'total projects', 'fulfillment']);
      expect(_.pluck(_data, 'val')).to.have.members([0, '1', '24', '3', '84%']);
    });
  });

  describe('processStatRank ', function() {

    it('should update COPILOT rank stats ', function() {
      var copilot = {
        track: 'COPILOT',
        activeContests: 2
      }
      UserStatsService.processStatRank(copilot);
      expect(copilot.stat).to.exist.to.equal(2);
      expect(copilot.statType).to.exist.to.equal('Challenges');
      expect(copilot.showStats).to.exist.to.equal(true);
    });

    it('should update COPILOT rank stats with submissions ', function() {
      var copilot = {
        track: 'COPILOT',
        activeContests: 2,
        submissions: 3
      }
      UserStatsService.processStatRank(copilot);
      expect(copilot.stat).to.exist.to.equal(2);
      expect(copilot.statType).to.exist.to.equal('Challenges');
      expect(copilot.showStats).to.exist.to.equal(true);
    });

    it('should update DEVELOP rank stats with submissions ', function() {
      var developStats = stats.DEVELOP;
      for(var i in developStats.subTracks) {
        var subTrack = developStats.subTracks[i];
        var stat = {
          track: 'DEVELOP',
          subTrack: subTrack.name,
          challenges: subTrack.challenges,
          wins: subTrack.submissions.wins,
          rating: subTrack.rank ? subTrack.rank.rating : 0,
          submissions: 2
        }
        UserStatsService.processStatRank(stat);
        if (['CODE', 'FIRST_2_FINISH', 'BUG_HUNT'].indexOf(subTrack.name) !== -1) {
          expect(stat.stat).to.exist.to.equal(stat.wins);
          expect(stat.statType).to.exist.to.equal('Wins');
          expect(stat.showStats).to.exist.to.equal(true);
        } else {
          expect(stat.stat).to.exist.to.equal(stat.rating);
          expect(stat.statType).to.exist.to.equal('Rating');
          expect(stat.showStats).to.exist.to.equal(true);
        }
      }
    });

    it('should update DEVELOP rank stats without submissions ', function() {
      var developStats = stats.DEVELOP;
      for(var i in developStats.subTracks) {
        var subTrack = developStats.subTracks[i];
        var stat = {
          track: 'DEVELOP',
          subTrack: subTrack.name,
          challenges: subTrack.challenges,
          wins: subTrack.submissions.wins,
          rating: subTrack.rank ? subTrack.rank.rating : 0,
          submissions: 0
        }
        UserStatsService.processStatRank(stat);
        if (['CODE', 'FIRST_2_FINISH', 'BUG_HUNT'].indexOf(subTrack.name) !== -1) {
          expect(stat.stat).to.exist.to.equal(stat.wins);
          expect(stat.statType).to.exist.to.equal('Wins');
          expect(stat.showStats).to.exist.to.equal(false);
        } else {
          expect(stat.stat).to.exist.to.equal(stat.rating);
          expect(stat.statType).to.exist.to.equal('Rating');
          expect(stat.showStats).to.exist.to.equal(true);
        }
      }
    });

    it('should update DESIGN rank stats with submissions ', function() {
      var designStats = stats.DESIGN;
      for(var i in designStats.subTracks) {
        var subTrack = designStats.subTracks[i];
        var stat = {
          track: 'DESIGN',
          subTrack: subTrack.name,
          challenges: subTrack.challenges,
          wins: subTrack.wins,
          submissions: 2
        }
        UserStatsService.processStatRank(stat);
        expect(stat.stat).to.exist.to.equal(stat.wins);
        expect(stat.statType).to.exist.to.equal('Wins');
        expect(stat.showStats).to.exist.to.equal(true);
      }
    });

    it('should update DESIGN rank stats without submissions ', function() {
      var designStats = stats.DESIGN;
      for(var i in designStats.subTracks) {
        var subTrack = designStats.subTracks[i];
        var stat = {
          track: 'DESIGN',
          subTrack: subTrack.name,
          challenges: subTrack.challenges,
          wins: subTrack.wins,
          submissions: 0
        }
        UserStatsService.processStatRank(stat);
        expect(stat.stat).to.exist.to.equal(stat.wins);
        expect(stat.statType).to.exist.to.equal('Wins');
        expect(stat.showStats).to.exist.to.equal(false);
      }
    });

    it('should update DATA_SCIENCE rank stats with submissions ', function() {
      var dsStats = stats.DATA_SCIENCE;

      var srm = dsStats.SRM;
      var stat = {
        track: 'DATA_SCIENCE',
        subTrack: 'SRM',
        challenges: srm.challenges,
        wins: srm.wins,
        submissions: 2,
        rating: srm.rank.rating
      }
      UserStatsService.processStatRank(stat);
      expect(stat.stat).to.exist.to.equal(stat.rating);
      expect(stat.statType).to.exist.to.equal('Rating');
      expect(stat.showStats).to.exist.to.equal(true);

      var srm = dsStats.MARATHON_MATCH;
      var stat = {
        track: 'DATA_SCIENCE',
        subTrack: 'MARATHON_MATCH',
        challenges: srm.challenges,
        wins: srm.wins,
        submissions: 2,
        rating: srm.rank.rating
      }
      UserStatsService.processStatRank(stat);
      expect(stat.stat).to.exist.to.equal(stat.rating);
      expect(stat.statType).to.exist.to.equal('Rating');
      expect(stat.showStats).to.exist.to.equal(true);

    });

    it('should update DATA_SCIENCE rank stats without submissions ', function() {
      var dsStats = stats.DATA_SCIENCE;

      var srm = dsStats.SRM;
      var stat = {
        track: 'DATA_SCIENCE',
        subTrack: 'SRM',
        challenges: srm.challenges,
        wins: srm.wins,
        submissions: 0,
        rating: srm.rank.rating
      }
      UserStatsService.processStatRank(stat);
      expect(stat.stat).to.exist.to.equal(stat.rating);
      expect(stat.statType).to.exist.to.equal('Rating');
      expect(stat.showStats).to.exist.to.equal(true);

      var srm = dsStats.MARATHON_MATCH;
      var stat = {
        track: 'DATA_SCIENCE',
        subTrack: 'MARATHON_MATCH',
        challenges: srm.challenges,
        wins: srm.wins,
        submissions: 0,
        rating: srm.rank.rating
      }
      UserStatsService.processStatRank(stat);
      expect(stat.stat).to.exist.to.equal(stat.rating);
      expect(stat.statType).to.exist.to.equal('Rating');
      expect(stat.showStats).to.exist.to.equal(true);

    });

  });


  describe('processStats ', function() {
    it('should update all stats with submissions ', function() {
      var developStats = stats.DEVELOP;
      var toTest = [];
      for(var i in developStats.subTracks) {
        var subTrack = developStats.subTracks[i];
        var stat = {
          track: 'DEVELOP',
          subTrack: subTrack.name,
          challenges: subTrack.challenges,
          wins: subTrack.submissions.wins,
          rating: subTrack.rank ? subTrack.rank.rating : 0,
          submissions: 2
        };
        toTest.push(stat);
      }
      UserStatsService.processStats(toTest);
      for(var i  in toTest) {
        var stat = toTest[i];

        if (['CODE', 'FIRST_2_FINISH', 'BUG_HUNT'].indexOf(stat.subTrack) !== -1) {
          expect(stat.stat).to.exist.to.equal(stat.wins);
          expect(stat.statType).to.exist.to.equal('Wins');
          expect(stat.showStats).to.exist.to.equal(true);
        } else {
          expect(stat.stat).to.exist.to.equal(stat.rating);
          expect(stat.statType).to.exist.to.equal('Rating');
          expect(stat.showStats).to.exist.to.equal(true);
        }
      }
    });

    it('should update all stats without submissions ', function() {
      var developStats = stats.DEVELOP;
      var toTest = [];
      for(var i in developStats.subTracks) {
        var subTrack = developStats.subTracks[i];
        var stat = {
          track: 'DEVELOP',
          subTrack: subTrack.name,
          challenges: subTrack.challenges,
          wins: subTrack.submissions.wins,
          rating: subTrack.rank ? subTrack.rank.rating : 0,
          submissions: 0
        };
        toTest.push(stat);
      }
      UserStatsService.processStats(toTest);
      for(var i  in toTest) {
        var stat = toTest[i];

        if (['CODE', 'FIRST_2_FINISH', 'BUG_HUNT'].indexOf(stat.subTrack) !== -1) {
          expect(stat.stat).to.exist.to.equal(stat.wins);
          expect(stat.statType).to.exist.to.equal('Wins');
          expect(stat.showStats).to.exist.to.equal(false);
        } else {
          expect(stat.stat).to.exist.to.equal(stat.rating);
          expect(stat.statType).to.exist.to.equal('Rating');
          expect(stat.showStats).to.exist.to.equal(true);
        }
      }
    });
  });

  describe('filterStats ', function() {

    it('should filter stats with showStats flag set to true ', function() {
      var toTest = [{
        stat: 1,
        statType: 'Wins',
        showStats: true
      }, {
        stat: 0,
        statType: 'Wins',
        showStats: false
      }, {
        stat: 1,
        statType: 'Rating',
        showStats: true
      }, {
        stat: 2,
        statType: 'Wins',
        showStats: true
      }];
      var filtered = UserStatsService.filterStats(toTest);
      expect(filtered).to.exist.to.have.length(3);
      expect(_.pluck(filtered, 'showStats')).to.have.members([true, true, true]);
    });
  });

  describe('compileSubtracks ', function() {
    it('should remove COPILOT_POSTING subtrack for DEVELOP track ', function() {
      var developStats = stats.DEVELOP;
      var toTest = [];
      for(var i in developStats.subTracks) {
        var subTrack = developStats.subTracks[i];
        var stat = {
          track: 'DEVELOP',
          subTrack: subTrack.name,
          challenges: subTrack.challenges,
          wins: subTrack.submissions.wins,
          rating: subTrack.rank ? subTrack.rank.rating : 0,
          submissions: 0
        };
        toTest.push(stat);
      }
      // verfies that COPILOT_POSTING exists before calling the method
      var cpIndex = _.findIndex(toTest, function(stat) {
        return stat.subTrack === 'COPILOT_POSTING';
      });
      expect(cpIndex).to.above(-1);
      var compiled = UserStatsService.compileSubtracks({'DEVELOP': toTest});
      expect(compiled).to.have.length(toTest.length - 1);
      // verfies that COPILOT_POSTING does not exist after calling the method
      var cpIndex = _.findIndex(compiled, function(stat) {
        return stat.subTrack === 'COPILOT_POSTING';
      });
      expect(cpIndex).to.equal(-1);
    });

    it('should not remove any subtrack for DESIGN track ', function() {
      var designStats = stats.DESIGN;
      var toTest = [];
      for(var i in designStats.subTracks) {
        var subTrack = designStats.subTracks[i];
        var stat = {
          track: 'DESIGN',
          subTrack: subTrack.name,
          challenges: subTrack.challenges,
          wins: subTrack.wins,
          submissions: 0
        };
        toTest.push(stat);
      }
      var compiled = UserStatsService.compileSubtracks({'DESIGN': toTest});
      // compiled should have same length as of input
      expect(compiled).to.have.length(toTest.length);
    });

    it('should work with non array or empty array arguments ', function() {
      //empty subtracks
      var compiled = UserStatsService.compileSubtracks({'DEVELOP': []});
      expect(compiled).to.exist.to.have.length(0);
      // non array subtracks
      var compiled = UserStatsService.compileSubtracks({'DEVELOP': {}});
      expect(compiled).to.exist.to.have.length(0);
    });
  });


});
