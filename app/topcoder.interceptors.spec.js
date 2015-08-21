"use strict";

describe("Topcoder Http Interceptors", function() {
  describe('Http Provider', function() {

    var httpProvider;

    beforeEach(module('topcoder', function($httpProvider) {
      httpProvider = $httpProvider;
    }));

    it('should have added jwtInterceptor as http interceptor', inject(function() {
      expect(httpProvider.interceptors).to.contain('jwtInterceptor');
    }));
  });
});
