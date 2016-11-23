

  app.config(function( $routeProvider, $locationProvider, $httpProvider,  $mdThemingProvider) {
   

    $routeProvider
      .when('/_=_', {
        controller: 'HomeController',
        redirectTo: '/'
      })
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      
      })
      .when('/map', {
        templateUrl: 'partials/map.html',
        controller: 'MapController'
      
      })
      .when('/rivers',{
        templateUrl: 'partials/rivers.html',
        controller: "IndexController"
        
      })
      .when('/gear',{
         templateUrl: 'partials/gear.html',
         controller: 'GearController'
         
      })
      .when('/favorites', {
        templateUrl: 'partials/favorites.html',
        controller: 'FavoritesController'
    
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
