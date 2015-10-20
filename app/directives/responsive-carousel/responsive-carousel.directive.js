(function() {
  'use strict';
  angular.module('tcUIComponents').directive('responsiveCarousel', function() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'directives/responsive-carousel/responsive-carousel.directive.html',
      scope: {
        data: '=',
        handle: '@'
      },
      controller: ['$log', '$scope', '$element', '$window',
        function($log, $scope, $element, $window) {
          $scope.slideCounts = {};

          activate();

          function activate() {
            init();

            var window = angular.element($window);
            window.on('resize', function() {
              init();
              // don't forget manually trigger $digest()
              $scope.$digest();
            });
          }

          function init() {
            var width = $window.innerWidth;
            if(width >= 1350) {
              // desktop
              buildCarouselSlide(7);
            } else if(width >= 1180) {
              // desktop
              buildCarouselSlide(6);
            } else if(width >= 1010) {
              // desktop
              buildCarouselSlide(5);
            } else if(width < 1010 && width >= 768) {
              // tablet
              buildCarouselSlide(4);
            } else {
              // we don't need to build carousel for mobile as we show horizontal scroll
              // phone
              buildCarouselSlide(2);
            }
          }


          function buildCarouselSlide(numItemsPerSlide) {
            var slidesCollection = [];
            var slide = [];
            // Might be able to change number of subtracks per slide based
            // on screen size if the width of each subtrack is consistent:
            // http://stackoverflow.com/questions/26252038/multi-item-responsive-carousel
            numItemsPerSlide = numItemsPerSlide || 5;

            for(var i = 0; i < $scope.data.length; i++) {
              if (slide.length === numItemsPerSlide) {
                // When slide is full, push it to collection and make a new slide []
                slidesCollection.push(slide);
                // updates the slide count object
                $scope.slideCounts[slidesCollection.length - 1] = slide.length;
                slide = [];
              }
              slide.push($scope.data[i]);
            }
            slidesCollection.push(slide);
            // updates the slide count object
            $scope.slideCounts[slidesCollection.length - 1] = slide.length;
            $scope.slidesCollection = slidesCollection;
          }
        
      }]
    };
  });
})();