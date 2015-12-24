// var app = angular.module("theRiver", ['ngRoute', 'ngMaterial'])

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
      .when('/signin',{
        templateUrl: 'partials/signin/signIn.html',
        controller: 'SigninController'
      })
      .when('/signup',{
        templateUrl: 'partials/signin/signUp.html',
        controller: 'SigninController'
      })
      .when('/gear',{
         templateUrl: 'partials/gear.html',
         controller: 'GearController'
      })
      .when('/:riverId', {
        templateUrl: 'partials/riverpage.html',
        controller: "RiverPageController"
      })
      .otherwise( {redirectTo: '/'
      })
      $locationProvider.html5Mode(true)

})