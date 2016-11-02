

  app.config(function( $routeProvider, $locationProvider, $httpProvider,  $mdThemingProvider) {
   

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
