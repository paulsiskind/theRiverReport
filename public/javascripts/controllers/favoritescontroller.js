app.controller('FavoritesController', function ($scope, $http, $routeParams, $rootScope, $window, $cookies) {
  $scope.user = $cookies.getAll();
  $scope.flows = {};

  $http.get('/userFavorites').then(function (response) {
    $scope.favorites = response.data
    $http.get('/api/v1/coData').then(function (response) {
     
     console.log($scope.favorites);
    $scope.allRivers = response.data;
    console.log($scope.allRivers)
          $scope.userFavs=[]
        for ( var i = 0; i < $scope.favorites.length; i++ ) {
        for ( var e = 0; e < $scope.allRivers.length; e++ ) {
            if ( $scope.favorites[i].riverid === $scope.allRivers[e].id ){
              console.log($scope.allRivers[e])

              $scope.userFavs.push($scope.allRivers[e]);

             
            }
        }
    }

    $scope.setClassBasedOnFlow = function(actualFlow, recommendedFlow){
      console.log(actualFlow, recommendedFlow)
      // completely frozen water
      if(actualFlow === '-999999') return 'five'
      if(actualFlow < recommendedFlow) return 'four'
      if(recommendedFlow - actualFlow > 0) return 'three'
      if(recommendedFlow - actualFlow > 200) return 'two'
      return 'one'
    }


    $scope.userFavs.map(function(d){

      return $http.get('//waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ d.USGSid +'&parameterCd=00060,00065').then(function(response){
        var apival = response.data.value.timeSeries[0].values[0].value[0].value;
        $scope.flows[d.name] = apival;
      console.log(d.name)
      });

    });

  })
  })


})