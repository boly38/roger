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
    $scope.miroir = function($event) {
    	$event.preventDefault();
    	if ($scope.icmiroir) {
    		return;
    	}
    	console.info("miroir = true");
        $scope.icmiroir = true;
        $scope.checkWin();
    };
    $scope.landau = function($event) {
    	$event.preventDefault();
    	if ($scope.iclandau) {
    		return;
    	}
    	console.info("landau = true");
        $scope.iclandau = true;
        $scope.checkWin();
    };
    $scope.checkWin = function() {
    	if ($scope.icmiroir && $scope.iclandau) {
    		console.info("goToWin in 2 sec");
    		$scope.icgagne = true;
	    	setTimeout($scope.winNow, 2000);
    	}
    };
    $scope.winNow = function() {
    	console.info("winNow()");
    	commonService.goToWin();
    	$scope.$apply();
    }
    $(".allImg").on("click", function(e){
        e.preventDefault();
        var offset = $(this).offset();
        var xClick = e.pageX - offset.left;
        var yClick = e.pageY - offset.top;
        alert('allImg x:'+ xClick + ' y:'+ yClick);
    });
    
    
};

function winController($scope, $http, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "WinCtrl";
    commonService.info("WinCtrl");
    $scope.win = true;
    $scope.play = function() {
    	commonService.goToDashboard();
   };
};



rogerControllers.controller('DashboardCtrl', dashboardController);
rogerControllers.controller('GameCtrl',      gameController);
rogerControllers.controller('WinCtrl',       winController);
