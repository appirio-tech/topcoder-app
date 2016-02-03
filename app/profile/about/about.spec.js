const mockData = require('../../../tests/test-helpers/mock-data')

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
        externalLinksPromise: deferred.promise,
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
    controller.linkedExternalAccountsData = {};

  });

  it('should have some variables defined', function() {
    expect(controller.categories).to.be.defined;
    expect(controller.skills).to.be.defined;
    expect(controller.categoryIndex).to.be.defined;
    expect(controller.skillIndex).to.be.defined;
    expect(controller.linkedExternalAccountsData).to.be.defined;
  });

});
