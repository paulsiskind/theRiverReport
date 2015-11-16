var app = angular.module("theRiver", ['ngRoute'])

  app.controller("appCtrl", function($scope, $http){
     $scope.order = function(select) {
                    if(select === 'rivers') {
                      $scope.viewBar = 'Rivers';
                    }
                    if(select === 'events') {
                      $scope.viewBar = 'Events';
                    }
                    if(select === 'gear') {
                      $scope.viewBar = 'Gear';
                    }
                    if(select === "messageboard"){
                      $scope.viewBar = "MessageBoard"
                    }
                    if(select === "announcements"){
                      $scope.viewBar = "Announcements"
                    }
                    $scope.select = select;
                    }
    
  })
  app.controller('HomeController', function($scope, $http){
       $http.get('http://waterservices.usgs.gov/nwis/iv/?format=waterml,1.1&sites=09058000&parameterCd=00060,00065').then(function(response){
      console.log(response)
      $scope.flows = response.data
    })
  })
  app.controller('RiverController', function($scope, $http){
    $scope.state = function(choice){
      console.log(choice)
      if(choice === 'al'){
        $scope.viewBarState = 'Alabama'
        console.log($scope.viewBarState)
      }
      if(choice === 'ak'){
        $scope.viewBarState = "Alaska"
      }
      if(choice === 'az'){
        $scope.viewBarState = 'Arizona'
      }
      if(choice === 'ar'){
        $scope.viewBarState = 'Arkansas'
      }
      if(choice === 'ca'){
        $scope.viewBarState = "California"
      }
      if(choice === 'co'){
        $scope.viewBarState = "Colorado"
      }
      $scope.choice = choice;
    }
  })
    app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/rivers',{
        templateUrl: 'partials/rivers.html',
        controller: "RiverController"
      })
      .otherwise( {redirectTo: '/'
      })
      $locationProvider.html5Mode(true)

});