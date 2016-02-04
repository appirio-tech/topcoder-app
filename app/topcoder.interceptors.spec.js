import angular from 'angular'

describe('Topcoder Http Interceptors', function() {
  describe('Http Provider', function() {

    var httpProvider

    beforeEach(angular.mock.module('topcoder', function($httpProvider) {
      httpProvider = $httpProvider
    }))

    it('should have added jwtInterceptor as http interceptor', angular.mock.inject(function() {
      expect(httpProvider.interceptors).to.contain('jwtInterceptor')
    }))
  })
})
