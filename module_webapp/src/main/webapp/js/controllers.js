/* Controllers */
 
var rogerControllers = angular.module('rogerControllers', []);


function dashboardController($scope, $http, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "DashboardCtrl";
    commonService.info("DashboardCtrl");
    
    $scope.play = function() {
    	commonService.goToGame();
    };
    $scope.playdev = function() {
    	commonService.goToGameDev();
    };
    $scope.resources = function() {
    	commonService.goToGameRes();
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
    $scope.maxImage = 4;
    $scope.imageNumber = 1;
    
    $scope.dashboard = function() {
    	commonService.goToDashboard();
    };
    
    $scope.loadImage = function(imageNumber) {
        $http.get('/data/' + imageNumber + '/game.json').then(function(success){
            $scope.game = success.data;
            // http://stackoverflow.com/questions/19310215/angularjs-image-src-change-when-model-changes
            $scope.gameimage="/data/" + imageNumber + "/" + success.data.image;
            $scope.gamealt = success.data.alt;
            $scope.gamecomponents = success.data.components
            commonService.info('load ' + success.data.alt + ' img:' + success.data.image + ' components count:' + $scope.gamecomponents.length);
        }, function(error){
        	commonService.info('No game.');
        });
    }
    
	$scope.loadLevel = function() {
		$scope.ic = [];
		$scope.icgagne = false;
		$scope.loadImage($scope.imageNumber);
	};
    
    $scope.clickElem = function($event, compId) {
    	$event.preventDefault();
    	if ($scope.ic[compId]) {
    		return;
    	}
    	console.info(compId+" = true");
    	$scope.ic[compId] = true;
        $scope.checkWin();
    };
    
    $scope.checkWin = function() {
    	var count = $scope.gamecomponents.length;
    	for (var i = 0 ; i<count; i++) {
    		if (!$scope.ic[$scope.gamecomponents[i].id]) {
    			return;
    		}
    	}
    	$scope.imageNumber++;
		$scope.icgagne = true;
    	if ($scope.imageNumber <= $scope.maxImage) {
			setTimeout($scope.loadLevel, 2000);
    		return;
    	}
		console.info("goToWin in 2 sec");
	    setTimeout($scope.winNow, 2000);
    };

    $scope.winNow = function() {
    	console.info("winNow()");
    	commonService.goToWin();
    	$scope.$apply();
    };
    
	$scope.loadLevel();
    
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


function GameImageManager($scope, $parentId) {
	this.scope = $scope;
	this.parentId = $parentId;
	this.width = 300;
	this.height = 300;
	
	this.init = function() {
		this.container = document.getElementById($parentId);
	};
	
};

function gameDevController($scope, $http, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "GameDevCtrl";
    commonService.info("GameDevCtrl");
    $scope.imgManager = new GameImageManager($scope, "gamegreen");
    $scope.imgManager.init();
    

    $scope.ic = [];
    
    $scope.dashboard = function() {
    	commonService.goToDashboard();
    };
    
    $http.get('/data/1/game.json').then(function(success){
        $scope.game = success.data;
        // http://stackoverflow.com/questions/19310215/angularjs-image-src-change-when-model-changes
        $scope.gameimage="/data/1/" + success.data.image;
        $scope.gamealt = success.data.alt;
        $scope.gamecomponents = success.data.components
        commonService.info('load ' + success.data.alt + ' img:' + success.data.image + ' components count:' + $scope.gamecomponents.length);
    }, function(error){
    	commonService.info('No game.');
    });
    
    $scope.clickElem = function($event, compId) {
    	$event.preventDefault();
    	if ($scope.ic[compId]) {
    		return;
    	}
    	console.info(compId+" = true");
    	$scope.ic[compId] = true;
        $scope.checkWin();
    };
    
    $scope.checkWin = function() {
    	var count = $scope.gamecomponents.length;
    	for (var i = 0 ; i<count; i++) {
    		if (!$scope.ic[$scope.gamecomponents[i].id]) {
    			return;
    		}
    	}
		console.info("goToWin in 2 sec");
		$scope.icgagne = true;
	    setTimeout($scope.winNow, 2000);
    };

    $scope.winNow = function() {
    	console.info("winNow()");
    	commonService.goToWin();
    	$scope.$apply();
    };
    
    $("#imggame").on("click", function(e){
        e.preventDefault();
        var offset = $(this).offset();
        var xClick = e.pageX - offset.left;
        var yClick = e.pageY - offset.top;
        alert('allImg x:'+ xClick + ' y:'+ yClick);
    });
};

rogerControllers.controller('DashboardCtrl', dashboardController);
rogerControllers.controller('GameCtrl',      gameController);
rogerControllers.controller('WinCtrl',       winController);
rogerControllers.controller('GameDevCtrl',      gameDevController);
