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
    $scope.goToGameDev = this.goToGameDev;
    $scope.goToGameRes = this.goToGameRes;
    $scope.goToWin = this.goToWin;
    $scope.goToFailed = this.goToFailed;
  };

  this.goToDashboard = function() {
    $location.path('/');
  };
  this.goToGame = function() {
    $location.path('/jeu');
  };
  this.goToGameDev = function() {
    $location.path('/jeu-dev');
  };
  this.goToGameRes = function() {
	$location.path('/jeu-resources');
  };
  this.goToWin = function() {
    $location.path('/win');
  };
  this.goToFailed = function() {
    $location.path('/failed');
  };
  

};

rogerServices.factory('commonService',
    ['$location','$timeout', '$http', function($location, $timeout, $http) {
      return new commonServicesImpl($location, $timeout, $http);
}]);
