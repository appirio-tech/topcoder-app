/*eslint no-undef:0*/
describe('filters', function() {
  var domain

  beforeEach(function() {
    bard.appModule('topcoder')
    bard.inject(this, 'CONSTANTS', 'roleFilter', 'percentageFilter', 'ordinalFilter', 'displayLocationFilter', 'listRolesFilter', 'trackFilter', 'challengeLinksFilter', 'externalLinkColorFilter', 'emptyFilter', 'ternaryFilter', 'urlProtocolFilter', 'addBeginningSpaceFilter')
    domain = CONSTANTS.domain
  })

  describe('role filter', function() {
    it('should handle strings', function() {
      expect(roleFilter('DATA_SCIENCE')).to.equal('Data Scientist')
      expect(roleFilter('DEVELOP')).to.equal('Developer')
    })

    it('should handle arrays', function() {
      expect(roleFilter(['DATA_SCIENCE', 'DEVELOP'])).to.include('Developer')
    })
  })

  describe('track filter', function() {
    it('should handle strings', function() {
      expect(trackFilter('DATA_SCIENCE')).to.equal('Data Science')
      expect(trackFilter('DEVELOP')).to.equal('Development')
      expect(trackFilter('FIRST_2_FINISH')).to.equal('First2Finish')
    })

    it('should handle arrays', function() {
      expect(trackFilter(['DATA_SCIENCE', 'DEVELOP'])).to.include('Development')
    })
  })

  describe('percentage filter', function() {
    it('should render percentages from decimal', function() {
      expect(percentageFilter(.994)).to.be.equal('99%')
      expect(percentageFilter(.985)).to.be.equal('99%')
    })
  })

  describe('ordinal number filter', function() {
    it('should render ordinal numbers', function() {
      expect(ordinalFilter(1)).to.be.equal('1st')
      expect(ordinalFilter(2)).to.be.equal('2nd')
      expect(ordinalFilter(3)).to.be.equal('3rd')
      expect(ordinalFilter(4)).to.be.equal('4th')
    })
  })

  describe('display location filter', function() {
    it('should do a join w/ comma', function() {
      expect(displayLocationFilter([1,2])).to.be.equal('1, 2')
    })
  })

  describe('list roles filter', function() {
    it('should list roles', function() {
      expect(listRolesFilter(false)).to.be.equal('No assigned role.')
      expect(listRolesFilter([1,2])).to.be.equal('1, 2')
    })
  })

  describe('challengeLinksFilter', function() {
    it ('should have the correct links for DEVELOP challenge', function() {
      var _ch = {
        id: 1,
        forumId: 2,
        track: 'develop',
        subTrack : 'CODE'
      }
      expect(challengeLinksFilter(_ch, 'detail')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=develop')
      expect(challengeLinksFilter(_ch, 'forums')).to.be.equal('https://apps.'+domain+'/forums/?module=Category&categoryID=2')
      expect(challengeLinksFilter(_ch, 'registrants')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=develop#viewRegistrant')
      expect(challengeLinksFilter(_ch, 'submissions')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=develop#submissions')
    })

    it ('should have the correct links for DESIGN challenge', function() {
      var _ch = {
        id: 1,
        forumId: 2,
        track: 'design',
        subTrack : 'WEB_DESIGN'
      }
      expect(challengeLinksFilter(_ch, 'detail')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=design')
      expect(challengeLinksFilter(_ch, 'forums')).to.be.equal('https://apps.'+domain+'/forums/?module=ThreadList&forumID=2')
      expect(challengeLinksFilter(_ch, 'registrants')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=design#viewRegistrant')
      expect(challengeLinksFilter(_ch, 'submissions')).to.be.equal('https://www.'+domain+'/challenge-details/1/?type=design#submissions')
    })

    it ('should have the correct links for DATA_SCIENCE challenge', function() {
      var _ch = {
        id: 1,
        rounds: [{id: 3,forumId: 2}],
        track: 'DATA_SCIENCE',
        subTrack : 'MARATHON_MATCH'
      }
      expect(challengeLinksFilter(_ch, 'detail')).to.be.equal('https://community.'+domain+'/longcontest/stats/?module=ViewOverview&rd=3')
      expect(challengeLinksFilter(_ch, 'forums')).to.be.equal('https://apps.'+domain+'/forums/?module=ThreadList&forumID=2')
      expect(challengeLinksFilter(_ch, 'registrants')).to.be.equal('https://community.'+domain+'/longcontest/?module=ViewRegistrants&rd=3')
    })
  })

  describe('externalLinkColorFilter', function() {

    it('should handle twitter and linkedin correctly', function() {
      expect(externalLinkColorFilter('el-twitter')).to.be.equal('#62AADC')
      expect(externalLinkColorFilter('el-linkedin')).to.be.equal('#127CB5')
    })
  })

  describe('emptyFilter', function() {
    it('should handle empty stuff correctly', function() {
      var a = emptyFilter(0)
      var b = emptyFilter(12)
      var c = emptyFilter(false)
      var d = emptyFilter(NaN)
      var e = emptyFilter('NaN')
      var f = emptyFilter('')
      var g = emptyFilter('%')
      expect(a).to.be.equal(0)
      expect(b).to.be.equal(12)
      expect(c).to.be.equal('-')
      expect(d).to.be.equal('-')
      expect(e).to.be.equal('-')
      expect(f).to.be.equal('-')
      expect(g).to.be.equal('-')
    })
  })

  describe('ternaryFilter', function() {
    it('should function logically', function() {
      expect(ternaryFilter(true, 1, 2)).to.be.equal(1)
      expect(ternaryFilter(false, 1, 2)).to.be.equal(2)
      expect(ternaryFilter(0, 1, 2)).to.be.equal(2)
      expect(ternaryFilter(true, 'm', 'n')).to.be.equal('m')
    })
  })

  describe('urlProtocolFilter', function() {
    it('should add http to the url ', function() {
      expect(urlProtocolFilter('google.com')).to.be.equal('http://google.com')
    })
    it('should add http to the url ', function() {
      expect(urlProtocolFilter('www.google.com')).to.be.equal('http://www.google.com')
    })
    it('should not add anything to the url ', function() {
      expect(urlProtocolFilter('http://google.com')).to.be.equal('http://google.com')
    })
    it('should not add anything to the url ', function() {
      expect(urlProtocolFilter('https://google.com')).to.be.equal('https://google.com')
    })
  })

  describe('addBeginningSpaceFilter', function() {
    it('should add a space to the beginning of the input', function() {
      expect(addBeginningSpaceFilter('some text')).to.equal(' some text')
    })
  })
})
