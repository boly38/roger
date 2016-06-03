/* Controllers */
 
var rogerControllers = angular.module('rogerControllers', []);


function dashboardController($scope, $http, Analytics, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "DashboardCtrl";
    commonService.info("DashboardCtrl");
    Analytics.trackPage("/Dashboard",'Dashboard', {});
    
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
function gameController($scope, $http, Analytics, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "GameCtrl";
    commonService.info("GameCtrl");
    $scope.maxImage = 4;
    $scope.imageNumber = 1;
    
    $scope.dashboard = function() {
    	commonService.goToDashboard();
    };
    
    $scope.loadImage = function(imageNumber) {
        Analytics.trackPage("/Game/" + imageNumber,'Game '  + imageNumber, {});
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

function winController($scope, $http, Analytics, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "WinCtrl";
    commonService.info("WinCtrl");
    Analytics.trackPage("/Win",'Win', {});
    $scope.win = true;
    $scope.play = function() {
    	commonService.goToDashboard();
   };
};


function GameManager($scope, $http, Analytics, commonService) {
	this.scope = $scope;
	$scope.gameManager = this;
    $scope.maxImage = 4;
    $scope.imageNumber = 1;
	
	this.startGame = function() {
		$scope.gamescore = 0;
		this.loadLevel();
	};

	this.loadImage = function(imageNumber) {
    	Analytics.trackPage("/GameDev/" + imageNumber,'Game-dev '  + imageNumber, {});
        $http.get('/data/' + imageNumber + '/game.json').then(function(success){
            $scope.game = success.data;
            // http://stackoverflow.com/questions/19310215/angularjs-image-src-change-when-model-changes
            $scope.gameimage="/data/" + imageNumber + "/" + success.data.image;
            $scope.gamealt = success.data.alt;
            $scope.gamecomponents = success.data.components;
            $scope.gamepoints = success.data.points;
            if (!$scope.gamepoints) {
            	$scope.gamepoints = 404;
            }
            commonService.info('load ' + success.data.alt + ' img:' + success.data.image + ' components count:' + $scope.gamecomponents.length);
        }, function(error){
        	commonService.info('No game.');
        });
    }
    
	this.loadLevel = function() {
		$scope.ic = [];
		$scope.icgagne = false;
		$scope.gameManager.loadImage($scope.imageNumber);
		var d = new Date();
		$scope.starttime = d.getTime(); 
	};
    
    this.clickElem = function($event, compId) {
    	$event.preventDefault();
    	if ($scope.ic[compId]) {
    		return;
    	}
    	console.info(compId+" = true");
    	$scope.ic[compId] = true;
    	$scope.gameManager.checkWin();
    };
	
    this.checkWin = function() {
    	var count = $scope.gamecomponents.length;
    	for (var i = 0 ; i<count; i++) {
    		if (!$scope.ic[$scope.gamecomponents[i].id]) {
    			return;
    		}
    	}
    	var d = new Date();
		var duration = d.getTime() - $scope.starttime ;
		console.info("game duration (ms)" + duration);
		var successRatio = 0;
		if (duration < 120000) {
			successRatio = 1 - (duration / 120000); 
		}
		$scope.gamescore += Math.round($scope.gamepoints * successRatio);
		
    	$scope.imageNumber++;
		$scope.icgagne = true;
    	if ($scope.imageNumber <= $scope.maxImage) {
			setTimeout($scope.gameManager.loadLevel, 2000);
    		return;
    	}
		console.info("goToWin in 2 sec");
	    setTimeout($scope.gameManager.winNow, 2000);
    };

    this.winNow = function() {
    	console.info("winNow()");
    	commonService.goToWin();
    	$scope.$apply();
    };
    
	
};

function gameDevController($scope, $http, Analytics, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "GameDevCtrl";
    commonService.info("GameDevCtrl");
    $scope.devMode = "(DEV MODE)";
    var gameManager = new GameManager($scope, $http, Analytics, commonService);
    gameManager.startGame();
    
    $scope.clickElem = gameManager.clickElem;
    
    $scope.dashboard = function() {
    	commonService.goToDashboard();
    };
    
    $("#imggame").on("click", function(e){
        e.preventDefault();
        var offset = $(this).offset();
        var xClick = e.pageX - offset.left;
        var yClick = e.pageY - offset.top;
        $scope.clickimgx = xClick;
        $scope.clickimgy = yClick;
        console.info('x:' + xClick + ' y:' + yClick);
        $scope.$apply();
    });
};

rogerControllers.controller('DashboardCtrl', dashboardController);
rogerControllers.controller('GameCtrl',      gameController);
rogerControllers.controller('WinCtrl',       winController);
rogerControllers.controller('GameDevCtrl',      gameDevController);
