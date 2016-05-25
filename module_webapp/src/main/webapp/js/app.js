 'use strict';
 
 /* App Module */
var rogerApp = angular.module('rogerApp', [
  'ngRoute',
  'rogerControllers',
  'rogerDirectives',
  'rogerServices'
]);

rogerApp.config(
   function($routeProvider, $httpProvider){
    console.info("configure ROGER");
    $routeProvider
      .when('/',{
          controller:  'DashboardCtrl as ctrl',
          templateUrl: 'partials/dashboard.html'
      })
      .otherwise({ 
        template: '<h1>Not Found</h1>'
      });
})
.run(function($rootScope, $window) {
	console.info("run ROGER");
});
