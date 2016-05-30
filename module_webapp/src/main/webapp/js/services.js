/* Services */
 
var rogerServices= angular.module('rogerServices', []);

function commonServicesImpl($location, $timeout, $http) {
  /**
   * Print an information onto the console
   */
  this.info = function($msg) {
    if (console !== undefined) {
      console.info($msg);
    }
  };
  /**
   * Print an error message onto the console
   */
  this.error = function($msg) {
    if (console !== undefined) {
      console.error($msg);
    }
  };

  this.commonControler = function($scope) {
    $scope.applicationName = "Roger";
    $scope.goToDashboard = this.goToDashboard;
    $scope.goToGame = this.goToGame;
    $scope.goToWin = this.goToWin;
  };

  this.goToDashboard = function() {
    $location.path('/');
  };
  this.goToGame = function() {
    $location.path('/jeu');
  };
  this.goToWin = function() {
    $location.path('/win');
  };
  

};

rogerServices.factory('commonService',
    ['$location','$timeout', '$http', function($location, $timeout, $http) {
      return new commonServicesImpl($location, $timeout, $http);
}]);
