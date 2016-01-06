

  app.config(function(authProvider, $routeProvider, $locationProvider,$httpProvider, jwtInterceptorProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
       .dark();

    $routeProvider
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

       authProvider.init({
          domain: 'brokenpaddle.auth0.com',
          clientID: 'qmaBRlYLvgIjao8jbLVA7kRVQLM5SCIS',
          callbackURL: location.href,
         // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
          loginUrl: '/signin'
        });
      jwtInterceptorProvider.tokenGetter = ['store', function(store) {
        // Return the saved token
        return store.get('token');
      }];
      $httpProvider.interceptors.push('jwtInterceptor');
      }).run(function($rootScope, auth, store, jwtHelper, $location) {
     $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          $location.path('/login');
        }
      }
    }

  });
})
