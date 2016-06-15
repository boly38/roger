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

function GameManager($scope, $http, store, Analytics, commonService, $timeout) {
	this.scope = $scope;
	$scope.gameManager = this;
    $scope.maxImage = 6;
    $scope.imageNumber = 0;
    
    
	this.startGame = function() {
		$scope.gamescore = 0;
		$scope.levelscore = 0;
		$scope.badclick = 0;
		store.set('gamescore', $scope.gamescore);
		$scope.images = [];
		for (var i = 1; i<=$scope.maxImage ; i++) {
			$scope.images.push(i);
	    }
		this.loadLevel();
	};

	/**
	 * we pick randomly an image in the images array and remove it
	 */
    this.getNextImageNumber = function() {
    	var desiredIndex = Math.floor(Math.random() * $scope.images.length);
    	return $scope.images.splice(desiredIndex, 1)[0];
    };

    /**
     * does the image array still have image ?
     */
    this.hasNextLevel = function() {
    	return $scope.images && $scope.images.length > 0;;
    };

    /**
     * load a new level
     */
	this.loadLevel = function() {
		$scope.ic = [];
		$scope.icgagne = false;
    	var imgNumber = $scope.gameManager.getNextImageNumber();
		$scope.gameManager.loadLevelData(imgNumber);
	};

    /**
     * load a new level data
     */
	this.loadLevelData = function(imageNumber) {
    	Analytics.trackPage("/GameDev/" + imageNumber,'Game-dev '  + imageNumber, {});
        $http.get('/data/' + imageNumber + '/game.json').then(function(success){
            $scope.game = success.data;
            // http://stackoverflow.com/questions/19310215/angularjs-image-src-change-when-model-changes
            $scope.gameimage="/data/" + imageNumber + "/" + success.data.image;
            $scope.gamealt = success.data.alt;
            $scope.gamecomponents = success.data.components;
            $scope.gamepoints = success.data.point;
            $scope.badclick = 0;
            if (!$scope.gamepoints) {
            	$scope.gamepoints = 404;
            }
            commonService.info('load ' + success.data.alt + ' img:' + success.data.image + ' components count:' + $scope.gamecomponents.length);
    		var d = new Date();
    		$scope.starttime = d.getTime();
    		$scope.gameManager.updateLevelScore();
        }, function(error){
        	commonService.info('No game.');
        });
    }
    
    this.clickOut = function($event) {
    	$scope.badclick++;
		$timeout.cancel($scope.levelTimeout);
		$scope.gameManager.updateLevelScore();
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
    
    this.updateLevelScore = function() {
		// calculate time taken
		var d = new Date();
		var duration = d.getTime() - $scope.starttime ;
		// calculate game points
		var successRatio = 0;
		var MAX_LEVEL_TIME = 120000;
		if (duration < MAX_LEVEL_TIME) {
			successRatio = 1 - (duration / MAX_LEVEL_TIME); 
		}
		console.info("levelscore:" + $scope.levelscore + "points, level duration:" + duration + " ms, successRatio: " + successRatio);
		$scope.levelscore = Math.round($scope.gamepoints * successRatio) - $scope.badclick;
		if (!$scope.icgagne && $scope.levelscore <= 0) {
			Analytics.trackEvent('game', 'failed game', $scope.gamescore);
			commonService.goToFailed();
			return;
		}
		if (!$scope.icgagne) {
			$scope.levelTimeout = $timeout($scope.gameManager.updateLevelScore, 2000);
		}
    };
	
    this.checkWin = function() {
    	// do we have found all level element ?
    	var count = $scope.gamecomponents.length;
    	for (var i = 0 ; i<count; i++) {
    		if (!$scope.ic[$scope.gamecomponents[i].id]) {
    			return;
    		}
    	}
		$scope.icgagne = true;

		$timeout.cancel($scope.levelTimeout);
		$scope.gameManager.updateLevelScore();
		Analytics.trackEvent('game', 'win level ' + $scope.gamealt, $scope.levelscore);

		// update game score
		$scope.gamescore += $scope.levelscore; 
		store.set('gamescore', $scope.gamescore);
		
		// go to the next level
		if ($scope.gameManager.hasNextLevel()) {
			$timeout($scope.gameManager.loadLevel, 2000);
    		return;
		}
		
		// no next level: win the game!
		Analytics.trackEvent('game', 'win game', $scope.gamescore);
		console.info("goToWin in 2 sec");
		$timeout($scope.gameManager.winNow, 2000);
    };

    this.winNow = function() {
    	console.info("winNow()");
    	commonService.goToWin();
    	$scope.$apply();
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
function gameController($scope, $http, store, Analytics, commonService, $timeout) {
    commonService.commonControler($scope);
    $scope.controlerName = "GameCtrl";
    commonService.info("GameCtrl");
    $scope.maxImage = 4;
    $scope.imageNumber = 1;
    
    $scope.dashboard = function() {
    	commonService.goToDashboard();
    };
    
    var gameManager = new GameManager($scope, $http, store, Analytics, commonService, $timeout);
    gameManager.startGame();
    
    $scope.clickElem = gameManager.clickElem;

    $("#imggame").on("click", function(e){
        e.preventDefault();
        var offset = $(this).offset();
        var xClick = e.pageX - offset.left;
        var yClick = e.pageY - offset.top;
        $scope.clickimgx = xClick;
        $scope.clickimgy = yClick;
        console.info('x:' + xClick + ' y:' + yClick);
        $scope.$apply();
        gameManager.clickOut(e);
    });
};

function winController($scope, $http, store, Analytics, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "WinCtrl";
    commonService.info("WinCtrl");
    $scope.gamescore = store.get('gamescore');
    Analytics.trackPage("/Win",'Win', {"gamescore":$scope.gamescore});
    $scope.gameend = true;
    $scope.play = function() {
    	commonService.goToDashboard();
   };
};


function failedController($scope, $http, store, Analytics, commonService) {
    commonService.commonControler($scope);
    $scope.controlerName = "FailedCtrl";
    commonService.info("FailedCtrl");
    $scope.gamescore = store.get('gamescore');
    Analytics.trackPage("/Failed",'Failed', {"gamescore":$scope.gamescore});
    $scope.gameend = true;
    $scope.play = function() {
    	commonService.goToDashboard();
   };
};




function gameDevController($scope, $http, store, store, Analytics, commonService, $timeout) {
    commonService.commonControler($scope);
    $scope.controlerName = "GameDevCtrl";
    commonService.info("GameDevCtrl");
    $scope.devMode = "(DEV MODE)";
    var gameManager = new GameManager($scope, $http, store, Analytics, commonService, $timeout);
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
rogerControllers.controller('FailedCtrl',    failedController);
rogerControllers.controller('GameDevCtrl',   gameDevController);
