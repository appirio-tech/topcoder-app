/* jshint -W117, -W030 */
describe('Blog Post Controller', function() {
  var controller;
  var blogs = mockData.getMockBlogs();

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$controller', '$rootScope', '$q', 'BlogService');

    sinon.stub(BlogService, 'getBlogFeed', function() {
      var deferred = $q.defer();
      deferred.resolve(blogs);
      return deferred.promise;
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('before activation', function() {
    beforeEach(function() {
      controller = $controller('BlogPostController');
    });

    it('should be created successfully', function() {
      expect(controller).to.exist;
    });

    it('should not have blogPosts', function() {
      expect(controller.blogPosts).not.to.exist;
    });
  });

  describe('after activation', function() {
    beforeEach(function() {
      controller = $controller('BlogPostController');
      $rootScope.$apply();
    });

    it('should be created successfully', function() {
      expect(controller).to.exist;
    });

    it('should call getBlogFeed of blog service', function() {
      expect(BlogService.getBlogFeed.callCount).to.be.equal(1);
    });

    it('should get blog feed from mock service', function() {
      expect(controller.blogPosts).to.exist;
      expect(controller.blogPosts.length).to.equal(blogs.length);
    });
  });

});
