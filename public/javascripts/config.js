

  app.config(function( $routeProvider, $locationProvider,$httpProvider,  $mdThemingProvider) {
    $mdThemingProvider.theme('default')
       .dark();

    $routeProvider
     .when('/_=_', {
        controller: 'RiverController',
        redirectTo: '/'
      })
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'RiverController'
      
      })
      .when('/map', {
        templateUrl: 'partials/map.html',
        controller: 'MapController'
      
      })
      .when('/rivers',{
        templateUrl: 'partials/rivers.html',
        controller: "IndexController"
        
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
        controller: "RiverPageController",
        requiresLogin: false
       
      })
      .otherwise( {redirectTo: '/'
      })
      $locationProvider.html5Mode(true)

       
      })
