var app = angular.module("theRiver", ['ngRoute'])

  app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'RiverController'
      })
      .when('/rivers',{
        templateUrl: 'partials/rivers.html',
        controller: "RiverController"
      })
      .when('/:riverId', {
        templateUrl: 'partials/riverpage.html',
        controller: "RiverPageController"
      })
      .otherwise( {redirectTo: '/'
      })
      $locationProvider.html5Mode(true)

})