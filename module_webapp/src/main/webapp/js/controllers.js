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

/**
 * image map : http://jsfiddle.net/bL5rgstg/
 * canvas    : http://jsfiddle.net/ArtBIT/kneDX/
 * img coord : http://stackoverflow.com/questions/2159044/getting-the-x-y-coordinates-of-a-mouse-click-on-an-image-with-jquery
 * @param $scope
 * @param $http
 * @param commonService
 */
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
