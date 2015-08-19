describe('filters', function() {

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, 'roleFilter', 'percentageFilter', 'ordinalFilter', 'displayLocationFilter', 'listRolesFilter', 'trackFilter');
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
      expect(trackFilter('DEVELOP')).to.equal('Develop');
    });

    it('should handle arrays', function() {
      expect(trackFilter(['DATA_SCIENCE', 'DEVELOP'])).to.include('Develop');
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
    })
  })
});
