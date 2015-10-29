describe('filters', function() {
  var domain;

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, 'CONSTANTS', 'roleFilter', 'percentageFilter', 'ordinalFilter', 'displayLocationFilter', 'listRolesFilter', 'trackFilter', 'challengeLinksFilter');
    domain = CONSTANTS.domain;
  });

  describe('role filter', function() {
    it('should handle strings', function() {
      expect(roleFilter('DATA_SCIENCE')).to.equal('Data Scientist');
      expect(roleFilter('DEVELOP')).to.equal('Developer');
    });

    it('should handle arrays', function() {
      expect(roleFilter(['DATA_SCIENCE', 'DEVELOP'])).to.include('Developer');
    });
  });

  describe('track filter', function() {
    it('should handle strings', function() {
      expect(trackFilter('DATA_SCIENCE')).to.equal('Data Science');
      expect(trackFilter('DEVELOP')).to.equal('Development');
      expect(trackFilter('FIRST_2_FINISH')).to.equal('First2Finish');
    });

    it('should handle arrays', function() {
      expect(trackFilter(['DATA_SCIENCE', 'DEVELOP'])).to.include('Development');
    });
  });

  describe('percentage filter', function() {
    it('should render percentages from decimal', function() {
      expect(percentageFilter(.994)).to.be.equal('99%');
      expect(percentageFilter(.985)).to.be.equal('99%');
    });
  });

  describe('ordinal number filter', function() {
    it('should render ordinal numbers', function() {
      expect(ordinalFilter(1)).to.be.equal('1st');
      expect(ordinalFilter(2)).to.be.equal('2nd');
      expect(ordinalFilter(3)).to.be.equal('3rd');
      expect(ordinalFilter(4)).to.be.equal('4th');
    });
  });

  describe('display location filter', function() {
    it('should do a join w/ comma', function() {
      expect(displayLocationFilter([1,2])).to.be.equal('1, 2');
    });
  });

  describe('list roles filter', function() {
    it('should list roles', function() {
      expect(listRolesFilter(false)).to.be.equal('No assigned role.');
      expect(listRolesFilter([1,2])).to.be.equal('1, 2');
    });
  });

  describe('challengeLinksFilter', function() {
    it ('should have the correct links for DEVELOP challenge', function() {
      var _ch = {
        id: 1,
        forumId: 2,
        track: 'develop',
        subTrack : 'CODE'
      };
      expect(challengeLinksFilter(_ch, 'detail')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=develop');
      expect(challengeLinksFilter(_ch, 'forums')).to.be.equal('https://apps.'+domain+'/forums/?module=Category&categoryID=2');
      expect(challengeLinksFilter(_ch, 'registrants')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=develop#viewRegistrant');
      expect(challengeLinksFilter(_ch, 'submissions')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=develop#viewRegistrant');
    });

    it ('should have the correct links for DESIGN challenge', function() {
      var _ch = {
        id: 1,
        forumId: 2,
        track: 'design',
        subTrack : 'WEB_DESIGN'
      };
      expect(challengeLinksFilter(_ch, 'detail')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=design');
      expect(challengeLinksFilter(_ch, 'forums')).to.be.equal('https://apps.'+domain+'/forums/?module=ThreadList&forumId=2');
      expect(challengeLinksFilter(_ch, 'registrants')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=design#viewRegistrant');
      expect(challengeLinksFilter(_ch, 'submissions')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=design#viewRegistrant');
    });

    it ('should have the correct links for DATA_SCIENCE challenge', function() {
      var _ch = {
        id: 1,
        rounds: [{id: 3,forumId: 2}],
        track: 'DATA_SCIENCE',
        subTrack : 'MARATHON_MATCH'
      };
      expect(challengeLinksFilter(_ch, 'detail')).to.be.equal('https://community.'+domain+'/tc?module=MatchDetails&rd=3');
      expect(challengeLinksFilter(_ch, 'forums')).to.be.equal('https://apps.'+domain+'/forums/?module=ThreadList&forumID=2');
      expect(challengeLinksFilter(_ch, 'registrants')).to.be.equal('https://community.'+domain+'/longcontest/?module=ViewStandings&rd=3');
    });
  });
});
