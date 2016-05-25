/* Controllers */
 
var rogerControllers = angular.module('rogerControllers', []);


function dashboardController($scope, $http, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "DashboardCtrl";
    commonService.info("DashboardCtrl");
    
    $scope.play = function() {
    	commonService.info("todo");
    	alert("todo");
    };
};


rogerControllers.controller('DashboardCtrl',  dashboardController);
