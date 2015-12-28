

  app.config(function(authProvider, $routeProvider, $locationProvider) {
      
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

// app.config(function (authProvider) {
//   authProvider.init({
//     domain: 'brokenpaddle.auth0.com',
//     clientID: 'qmaBRlYLvgIjao8jbLVA7kRVQLM5SCIS'
//   });
// })
// .run(function(auth) {
//   // This hooks al auth events to check everything as soon as the app starts
//   auth.hookEvents();
// });
// app.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
//   // ...

//   // We're annotating this function so that the `store` is injected correctly when this file is minified
//   jwtInterceptorProvider.tokenGetter = ['store', function(store) {
//     // Return the saved token
//     return store.get('token');
//   }];

//   $httpProvider.interceptors.push('jwtInterceptor');
//   // ...
// });

