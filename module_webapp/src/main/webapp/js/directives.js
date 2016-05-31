/* Directives */
 
var rogerDirectives= angular.module('rogerDirectives', []);
 
rogerDirectives.directive('appfooter', function() {
  return {
    templateUrl: 'partials/widgets/footer.html'
  };
});

rogerDirectives.directive('apphead', function() {
  return {
    templateUrl: 'partials/widgets/head.html'
  };
});

rogerDirectives.directive('buttonbar', function() {
  return {
    templateUrl: 'partials/widgets/buttonbar.html'
  };
});

rogerDirectives.directive('gamebuttonbar', function() {
  return {
    templateUrl: 'partials/widgets/gamebuttonbar.html'
  };
});


rogerDirectives.directive('loading', ['$http', function ($http) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.isLoading = function () {
        return $http.pendingRequests.length > 0;
      };
      scope.$watch(scope.isLoading, function (value) {
        if (value) {
          angular.element('#myloading').removeClass('ng-hide');
        } else {
          angular.element('#myloading').addClass('ng-hide');
        }
      });
    }
  };
}]);