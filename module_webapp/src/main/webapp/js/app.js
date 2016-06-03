 'use strict';
 
 /* App Module */
var rogerApp = angular.module('rogerApp', [
  'ngRoute',
  'rogerControllers',
  'rogerDirectives',
  'rogerServices',
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
    .otherwise({ 
        template: '<h1>Not Found</h1>'
    });
    // analytics.logAllCalls(true);
    AnalyticsProvider.setAccount('UA-1988442-17');
    AnalyticsProvider.setDomainName('rogerdemenage.ddns.net');
})
.run(function($rootScope, $window) {
	console.info("run ROGER");
});
