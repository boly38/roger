 'use strict';
 
 /* App Module */
var rogerApp = angular.module('rogerApp', [
  'ngRoute',
  'rogerControllers',
  'rogerDirectives',
  'rogerServices',
  'angular-storage',
  'angular-google-analytics'
]);

rogerApp.config(function($routeProvider, $httpProvider, AnalyticsProvider){
    console.info("configure ROGER");
    $routeProvider
    .when('/',{
        controller:  'DashboardCtrl as ctrl',
        templateUrl: 'partials/dashboard.html'
    })
    .when('/jeu',{
          controller:  'GameCtrl as ctrl',
          templateUrl: 'partials/game.html'
    })
    .when('/jeu-dev',{
          controller:  'GameDevCtrl as ctrl',
          templateUrl: 'partials/game-dev.html'
    })
    .when('/jeu-resources',{
          controller:  'WinCtrl as ctrl',
          templateUrl: 'partials/resources.html'
    })
    .when('/win',{
        controller:  'WinCtrl as ctrl',
        templateUrl: 'partials/win.html'
    })
    .when('/failed',{
        controller:  'FailedCtrl as ctrl',
        templateUrl: 'partials/failed.html'
    })
    .otherwise({ 
        template: '<h1>Not Found</h1>'
    });
    // http://stackoverflow.com/questions/16098430/angular-ie-caching-issue-for-http
    console.info("configure no cache for httpProvider")
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    // analytics.logAllCalls(true);
    AnalyticsProvider.setAccount('UA-1988442-17');
    AnalyticsProvider.setDomainName('rogerdemenage.ddns.net');
})
.run(function($rootScope, $window) {
	console.info("run ROGER");
});
