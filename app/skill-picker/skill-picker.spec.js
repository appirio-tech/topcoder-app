/*eslint no-undef:0*/
const mockData = require('../../tests/test-helpers/mock-data')

describe('Skill Picker Controller', function() {
  var vm
  var toasterSvc, memberCertService, profileService, userPrefSvc, state
  var mockProfile = mockData.getMockProfile()

  beforeEach(function() {
    bard.appModule('tc.skill-picker')
    bard.inject(this, '$controller', '$rootScope', '$q', 'MemberCertService', 'ProfileService', 'UserPreferencesService', 'toaster', 'CONSTANTS')

    memberCertService = MemberCertService
    profileService = ProfileService
    var swiftProgramId = CONSTANTS.SWIFT_PROGRAM_ID

    // mock member cert api
    sinon.stub(memberCertService, 'getMemberRegistration', function(userId, programId) {
      var deferred = $q.defer()
      if (programId === swiftProgramId) {
        var resp = {eventId: swiftProgramId, userId: 12345}
        deferred.resolve(resp)
      } else {
        deferred.resolve()
      }
      return deferred.promise
    })

    sinon.stub(memberCertService, 'registerMember', function(userId, programId) {
      var deferred = $q.defer()
      var resp = {eventId: programId, userId: 12345}
      if (programId === 100) {
        deferred.reject()
      } else {
        deferred.resolve(resp)
      }
      return deferred.promise
    })

    // adds spy method to mocked profile object for saving the profile
    mockProfile.save = sinon.spy()

    // mock profile service
    sinon.stub(profileService, 'updateUserSkills', function(username, skills) {
      var deferred = $q.defer()
      var resp = {}
      if (skills[412]) {
        deferred.reject()
      } else {
        deferred.resolve(resp)
      }
      return deferred.promise
    })

    userPrefSvc = UserPreferencesService
    sinon.stub(userPrefSvc, 'getEmailPreferences', function(user) {
      var deferred = $q.defer()
      if (user.userId === 10336829) {
        deferred.resolve()
      } else if (user.userId === 12345) {
        var resp = { id: 'sdku34i5kdk', email_address: user.email}
        deferred.resolve(resp)
      } else {
        deferred.reject()
      }
      return deferred.promise
    })
    sinon.stub(userPrefSvc, 'saveEmailPreferences', function(user) {
      var deferred = $q.defer()
      if (user.userId === 10336829) {
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
    })

    // mocks the toaster service
    toasterSvc = toaster
    bard.mockService(toaster, {
      pop: $q.when(true),
      default: $q.when(true)
    })

    // mocked $state object
    state = { go: sinon.spy()}

    var scope = $rootScope.$new()
    vm = $controller('SkillPickerController', {
      $scope: scope,
      userProfile: mockProfile,
      featuredSkills: [],
      $state: state

    })
    $rootScope.$digest()
  })

  bard.verifyNoOutstandingHttpRequests()

  it('should be created successfully', function() {
    expect(vm).to.exist
    // showCommunity should be true as now we have two communities
    expect(vm.showCommunity).to.exist.to.true
  })

  it('should have empty tracks object ', function() {
    expect(vm.tracks).to.exist
    expect(vm.tracks.DESIGN).not.to.exist
    expect(vm.tracks.DEVELOP).not.to.exist
    expect(vm.tracks.DATA_SCIENCE).not.to.exist
  })

  it('should have correct userIdentity ', function() {
    expect(vm.userId).to.exist.to.equal(mockProfile.userId)
    expect(vm.username).to.exist.to.equal(mockProfile.handle)
  })

  it('should have page dirty for default cognitive being on ', function() {
    var dirty = vm.isPageDirty()
    expect(dirty).to.equal(true)
  })

  it('should be created successfully with showCommunity being true', function() {
    // backup original swift program id, to restore after test execution
    var origSwiftProgId = CONSTANTS.SWIFT_PROGRAM_ID
    // update swift program id to something which says, member is not registered
    CONSTANTS.SWIFT_PROGRAM_ID = 3446
    vm = $controller('SkillPickerController', {
      $scope: $rootScope.$new(),
      userProfile: mockProfile,
      featuredSkills: []
    })
    $rootScope.$digest()
    expect(vm).to.exist
    // showCommunity flag should be set to true because we have at least one unregistered community
    expect(vm.showCommunity).to.exist.to.true
    // restores the original swift program id
    CONSTANTS.SWIFT_PROGRAM_ID = origSwiftProgId
  })

  it('should add skill ', function() {
    vm.toggleSkill(409)
    expect(vm.mySkills).to.exist.have.length(1)
  })

  it('should remove added skill ', function() {
    vm.toggleSkill(409)
    // should add the skill
    expect(vm.mySkills).to.exist.have.length(1)
    // next call to toggleSkill with same argument, should remove that skill
    vm.toggleSkill(409)
    // should remove the skill
    expect(vm.mySkills).to.exist.have.length(0)
  })

  it('should not make any update call without any change ', function() {
    vm.submitSkills()
    $rootScope.$digest()
    expect(mockProfile.save).not.to.be.called
    expect(profileService.updateUserSkills).not.to.be.called
    expect(memberCertService.registerMember).to.be.calledOnce//once for cognitive which is by default on
    // we should still go to dashboard if the function is called,
    // call to the function is controlled by disabling the button
    expect(state.go).to.have.been.calledWith('dashboard').calledOnce
  })

  it('should not make any registerMember call with cognitive being turned off ', function() {
    vm.communities['ibm_cognitive'].status = false
    vm.communities['ibm_cognitive'].dirty = true
    vm.submitSkills()
    $rootScope.$digest()
    expect(mockProfile.save).not.to.be.called
    expect(profileService.updateUserSkills).not.to.be.called
    // we have turned off default on community, so no registerMember call expected
    expect(memberCertService.registerMember).not.to.be.called
    // we should still go to dashboard if the function is called,
    // call to the function is controlled by disabling the button
    expect(state.go).to.have.been.calledWith('dashboard').calledOnce
  })

  it('should update tracks for the member ', function() {
    vm.tracks.DEVELOP = true
    vm.tracks.DESIGN = false
    vm.submitSkills()
    $rootScope.$digest()
    expect(mockProfile.save).to.be.calledOnce
    expect(profileService.updateUserSkills).not.to.be.called
    expect(memberCertService.registerMember).to.be.calledOnce//once for cognitive which is by default on
    expect(state.go).to.have.been.calledWith('dashboard').calledOnce
  })

  it('should show error popup for updating tracks ', function() {
    vm.tracks.DEVELOP = true
    // stubs the save method to reject the promise
    mockProfile.save = function() {}
    sinon.stub(mockProfile, 'save', function() {
      var deferred = $q.defer()
      deferred.reject()
      return deferred.promise
    })
    vm.submitSkills()
    $rootScope.$digest()
    expect(mockProfile.save).to.be.calledOnce
    expect(toasterSvc.pop).to.have.been.calledWith('error', 'Whoops!', sinon.match('wrong')).calledOnce
    expect(profileService.updateUserSkills).not.to.be.called
    expect(memberCertService.registerMember).to.be.calledOnce//once for cognitive which is by default on
    expect(state.go).not.to.be.called
  })

  it('should update skills for the member ', function() {
    vm.mySkills = [409, 410]
    vm.submitSkills()
    $rootScope.$digest()
    expect(mockProfile.save).not.to.be.called
    expect(profileService.updateUserSkills).to.be.calledOnce
    expect(memberCertService.registerMember).to.be.calledOnce//once for cognitive which is by default on
    expect(state.go).to.have.been.calledWith('dashboard').calledOnce
  })

  it('should show error popup for error in updating skills ', function() {
    vm.mySkills = [409, 410, 412]
    vm.submitSkills()
    $rootScope.$digest()
    expect(mockProfile.save).not.to.be.called
    expect(profileService.updateUserSkills).to.be.calledOnce
    expect(toasterSvc.pop).to.have.been.calledWith('error', 'Whoops!', sinon.match('wrong')).calledOnce
    expect(memberCertService.registerMember).to.be.calledOnce//once for cognitive which is by default on
    expect(state.go).not.to.be.called
  })

  it('should update communities for the member ', function() {
    vm.communities['ios'].status = true
    vm.communities['ios'].dirty = true
    vm.submitSkills()
    $rootScope.$digest()
    expect(mockProfile.save).not.to.be.called
    expect(profileService.updateUserSkills).not.to.be.called
    expect(memberCertService.registerMember).to.be.calledTwice// once for cognitive (default on) and another for ios
    expect(state.go).to.have.been.calledWith('dashboard').calledOnce
  })

  // we may need to update this test case when we want to call unregister endpoint
  it('should NOT update communities for the member for disabled community ', function() {
    vm.communities['ios'].status = false
    vm.communities['ios'].dirty = true
    vm.submitSkills()
    $rootScope.$digest()
    expect(mockProfile.save).not.to.be.called
    expect(profileService.updateUserSkills).not.to.be.called
    expect(memberCertService.registerMember).to.be.calledOnce//once for cognitive which is by default on
    // we should still go to dashboard if the function is called,
    // call to the function is controlled by disabling the button
    expect(state.go).to.have.been.calledWith('dashboard').calledOnce
  })

  it('should NOT update communities for the member for enabled but non dirty community ', function() {
    // TODO need one more community, with dirty true, to test out the non dirty community update
    vm.communities['ios'].status = true
    vm.communities['ios'].dirty = false
    vm.submitSkills()
    $rootScope.$digest()
    expect(mockProfile.save).not.to.be.called
    expect(profileService.updateUserSkills).not.to.be.called
    expect(memberCertService.registerMember).to.be.calledOnce//once for cognitive which is by default on
    // we should still go to dashboard if the function is called,
    // call to the function is controlled by disabling the button
    expect(state.go).to.have.been.calledWith('dashboard').calledOnce
  })

  it('should show error popup for error in updating communities ', function() {
    vm.communities['ios'].programId = 100// to cause rejction of the promise
    vm.communities['ios'].status = true
    vm.communities['ios'].dirty = true
    vm.submitSkills()
    $rootScope.$digest()
    expect(mockProfile.save).not.to.be.called
    expect(profileService.updateUserSkills).not.to.be.called
    expect(memberCertService.registerMember).to.be.calledTwice// once for cognitive (default on) and another for ios
    expect(toasterSvc.pop).to.have.been.calledWith('error', 'Whoops!', sinon.match('wrong')).calledOnce
    expect(state.go).not.to.be.called
  })

})
