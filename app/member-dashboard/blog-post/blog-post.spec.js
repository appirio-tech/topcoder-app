/* jshint -W117, -W030 */
describe('Blog Post Controller', function() {
  var controller;
  var authService, blogService;
  var blogs = mockData.getMockBlogs();

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$controller', '$rootScope', '$q', 'TcAuthService', 'BlogService');

    blogService = BlogService;
    authService = TcAuthService;

    sinon.stub(blogService, 'getBlogFeed', function() {
      var deferred = $q.defer();
      deferred.resolve(blogs);
      return deferred.promise;
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('before login activation', function() {
    beforeEach(function() {
      controller = $controller('BlogPostController', {
        $scope: $rootScope.$new(),
        auth: authService,
        blog: blogService
      });
      $rootScope.$apply();
    });

    it('should be created successfully', function() {
      expect(controller).to.exist;
    });

    it('should not call getBlogFeed of blog service', function() {
      expect(blogService.getBlogFeed.callCount).to.be.equal(0);
    });

    it('should not have blogPosts', function() {
      expect(controller.blogPosts).not.to.exist;
    });
  });

  describe('after login activation', function() {
    beforeEach(function() {
      sinon.stub(authService, 'isAuthenticated', function() {
        return true;
      });
      controller = $controller('BlogPostController', {
        $scope: $rootScope.$new(),
        auth: authService,
        blog: blogService
      });
      $rootScope.$apply();
    });

    it('should be created successfully', function() {
      expect(controller).to.exist;
    });

    it('should call getBlogFeed of blog service', function() {
      expect(blogService.getBlogFeed.callCount).to.be.equal(1);
    });

    it('should get blog feed from mock service', function() {
      expect(controller.blogPosts).to.exist;
      expect(controller.blogPosts.length).to.equal(blogs.length);
    });
  });

});
