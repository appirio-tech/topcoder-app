/* jshint -W117, -W030 */
xdescribe('TC Paginator Directive', function() {
  var scope;
  var element;
  var controller;
  var data = [{
    id: 1
  }, {
    id: 2
  }, {
    id: 3
  }, {
    id: 4
  }, {
    id: 5
  }];
  var pageParams = {
    offset: 0,
    limit: 2,
    count: 0,
    totalCount: 0,
    updated: 0
  };

  beforeEach(function() {
    bard.appModule('topcoder');
    bard.inject(this, '$compile', '$rootScope');
    scope = $rootScope.$new();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('TC Paginator', function() {
    var pager;

    beforeEach(function() {
      scope.data = data.slice(0, 2);
      scope.data.metadata = {totalCount : 5};
      pageParams = {
        offset: 0,
        limit: 2,
        count: 0,
        totalCount: 0,
        updated: 0
      };
      scope.pageParams = pageParams;
      element = angular.element('<tc-paginator data="data" page-params="pageParams"></tc-paginator>)');
      pager = $compile(element)(scope);
      scope.$digest();
      controller = element.controller('tcPaginator')
    });

    it('should have pager related html', function() {
      var prev = pager.find('.prev');
      expect(prev).not.to.null;
      // with offset 0, prev link should be disabled
      expect(prev.hasClass('disabled')).to.equal(true);
      var first = pager.find('.first');
      expect(first).not.to.null;
      expect(first.text()).to.equal("1");
      var last = pager.find('.last');
      expect(last).not.to.null;
      expect(last.text()).to.equal("2");
      var total = pager.find('.total');
      expect(total).not.to.null;
      expect(total.text()).to.equal("5");
      var next = pager.find('.next');
      expect(next).not.to.null;
      // with offset 0, page size 2 and 5 total records, next link should be enabled
      expect(next.hasClass('disabled')).to.equal(false);
    });

    it('change in scope data should trigger paginator update', function() {
      // change the data
      scope.data = data.slice(3, 4);
      scope.data.metadata = {totalCount: 7};
      scope.$apply();

      var total = pager.find('.total');
      expect(total).not.to.null;
      // correct totalCount should be reflected in the HTML
      expect(total.text()).to.equal("7");
      // pageParams should also reflect the correct totalCount
      expect(pageParams.totalCount).to.equal(7);
      // count should 1 because the length of the scope.data is 1
      expect(pageParams.count).to.equal(1);
    });

    it('controller.nextPage() should update the pageParams', function() {
      // calls nextPage method on controller
      controller.nextPage();
      expect(pageParams.offset).to.equal(2);
      expect(pageParams.limit).to.equal(2);
      expect(pageParams.updated).to.equal(1);
    });

    it('clicking on next link should update the pageParams', function() {
      // clicks on the next page link
      var next = pager.find('.next');
      expect(next).not.to.null;
      next.click();

      expect(pageParams.offset).to.equal(2);
      expect(pageParams.limit).to.equal(2);
      expect(pageParams.updated).to.equal(1);
    });

    it('controller.nextPage() should not update pageParams on last page', function() {
      // on first page nextPageAvailable should be true
      expect(controller.nextPageAvailable).to.equal(true);
      // calls nextPage method on controller: page 2
      controller.nextPage();
      expect(pageParams.offset).to.equal(2);
      expect(pageParams.limit).to.equal(2);
      expect(pageParams.updated).to.equal(1);
      // update the data to trigger paginator state update
      scope.data = data.slice(2, 4);
      scope.$apply();
      // on second page nextPageAvailable should be true
      expect(controller.nextPageAvailable).to.equal(true);

      // calls nextPage method on controller: page 3
      controller.nextPage();
      expect(pageParams.offset).to.equal(4);
      expect(pageParams.limit).to.equal(2);
      expect(pageParams.updated).to.equal(2);
      // update the data to trigger paginator state update
      scope.data = data.slice(2, 4);
      scope.$apply();
      // on thrid/last page nextPageAvailable should be false
      expect(controller.nextPageAvailable).to.equal(false);

      // calls nextPage
      controller.nextPage();
      // should not have any effect on page Params
      expect(pageParams.offset).to.equal(4);
      expect(pageParams.limit).to.equal(2);
      expect(pageParams.updated).to.equal(2);

    });

    it('controller.prevPage() should not update the pageParams on first page', function() {
      // prev page link should not be available
      expect(controller.prevPageAvailable).to.equal(false);

      // calls prevPage to move one page backward
      controller.prevPage();
      // verifies prevPage call does not have any effect
      expect(pageParams.offset).to.equal(0);
      expect(pageParams.limit).to.equal(2);
      expect(pageParams.updated).to.equal(0);
    });

    it('controller.prevPage() should update the pageParams', function() {
      // calls nextPage to move one page forward
      controller.nextPage();
      // verifies next page is successful
      expect(pageParams.offset).to.equal(2);
      expect(pageParams.limit).to.equal(2);
      expect(pageParams.updated).to.equal(1);
      // update the data to trigger paginator state update
      scope.data = data.slice(2, 4);
      scope.$apply();
      expect(controller.prevPageAvailable).to.equal(true);

      // calls prevPage to move one page backward
      controller.prevPage();
      // verifies prev page is successful
      expect(pageParams.offset).to.equal(0);
      expect(pageParams.limit).to.equal(2);
      expect(pageParams.updated).to.equal(2);
    });

    it('clicking on prev link should update the pageParams', function() {
      // calls nextPage to move one page forward
      controller.nextPage();
      // verifies next page is successful
      expect(pageParams.offset).to.equal(2);
      expect(pageParams.limit).to.equal(2);
      expect(pageParams.updated).to.equal(1);
      // update the data to trigger paginator state update
      scope.data = data.slice(2, 4);
      scope.$apply();
      expect(controller.prevPageAvailable).to.equal(true);

      // clicks on the prve page link
      var prev = pager.find('.prev');
      expect(prev).not.to.null;
      prev.click();
      // verifies prev page call is successful
      expect(pageParams.offset).to.equal(0);
      expect(pageParams.limit).to.equal(2);
      expect(pageParams.updated).to.equal(2);
    });
  });
});
