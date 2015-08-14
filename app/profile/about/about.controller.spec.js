/* jshint -W117, -W030 */
describe('Profile About Controller', function() {
  var controller;
  var mockProfile = mockData.getMockProfile();
  var mockStats = mockData.getMockStats();
  var mockSkills = mockData.getMockSkills();
  var apiUrl = 'https://api.topcoder-dev.com/v3';

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.appModule('tc.profile');
    bard.inject(this, '$httpBackend', '$controller', 'CONSTANTS', '$q');

    var deferred = $q.defer();
    controller = $controller('ProfileAboutController', {
      $scope: {$parent: {profileVm: {
        statsPromise: deferred.promise,
        skillsPromise: deferred.promise,
        categories: [{}, {}, {}, {}, {}],
        skills: [{}, {}, {}, {}, {}]
      }}},
      userHandle: 'rakesh',
      profile: mockProfile
    });

    deferred.resolve();

    controller.categories = [{}, {}, {}, {}, {}];
    controller.skills = [{}, {}, {}, {}, {}, {}];
    controller.categoryIndex = 0;
    controller.skillIndex = 0;

  });

  it('should have some variables defined', function() {
    expect(controller.categories).to.be.defined;
    expect(controller.skills).to.be.defined;
    expect(controller.categoryIndex).to.be.defined;
    expect(controller.skillIndex).to.be.defined;
  });

  describe('paging', function() {
    it('should be able to page categories', function() {
      controller.shiftCategories(-1);
      expect(controller.categoryIndex).to.equal(0);
      controller.shiftCategories(1);
      expect(controller.categoryIndex).to.equal(1);
    });

    it('should be able to page skills', function() {
      controller.shiftSkills(-1);
      expect(controller.skillIndex).to.equal(0);
      controller.shiftSkills(1);
      expect(controller.skillIndex).to.equal(1);
    });
  });


});
