/* Controllers */
 
var rogerControllers = angular.module('rogerControllers', []);


function dashboardController($scope, $http, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "DashboardCtrl";
    commonService.info("DashboardCtrl");
    
    $scope.play = function() {
    	commonService.goToGame();
   };
};


function GameImageManager($scope, $parentId) {
	this.scope = $scope;
	this.parentId = $parentId;
	this.width = 300;
	this.height = 300;
	
	this.init = function() {
		this.container = document.getElementById($parentId);
	};
	
};

function gameController($scope, $http, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "GameCtrl";
    commonService.info("GameCtrl");
    
    $scope.dashboard = function() {
    	commonService.goToDashboard();
    };
    
    $scope.imgManager = new GameImageManager($scope, "gamegreen");
    $scope.imgManager.init();

    $(".yellow").on("click", function(e){
        e.preventDefault();
        alert('yellow');
    });
    $(".red").on("click", function(e){
        e.preventDefault();
        alert('red');
    });
    $(".objA").on("click", function(e){
        e.preventDefault();
        alert('objA');
    });
    $(".allImg").on("click", function(e){
        e.preventDefault();
        alert('allImg');
    });
    
    
};


rogerControllers.controller('DashboardCtrl', dashboardController);
rogerControllers.controller('GameCtrl',      gameController);
