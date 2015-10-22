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
    expect(_data).to.have.length(4);
    expect(_.pluck(_data, 'label')).to.have.members(['rating', 'rank', 'percentile', 'competitions']);
    expect(_.pluck(_data, 'val')).to.have.members(['799', '6,280', '26%', '10']);
  });


  it('should return stats for Copilot ', function() {
    var _data = UserStatsService.getIterableStats('COPILOT', 'COPILOT', stats);
    expect(_data).to.have.length(5);
    expect(_.pluck(_data, 'label')).to.have.members(['active challenges', 'active projects', 'total challenges', 'total projects', 'fulfillment']);
    expect(_.pluck(_data, 'val')).to.have.members([0, '1', '24', '3', '84%']);
  });


});
