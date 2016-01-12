app.controller('FavoritesController', function ($scope, $http, $routeParams, $rootScope, $window, $cookies) {
  $scope.user = $cookies.getAll();
  $scope.flows = {};
  $scope.ideal = []


  $http.get('/usersData').then(function (response) {
    $scope.usersData = response.data
   
    $scope.userphone = $scope.usersData[0].userphone
    
  });

  $http.get('/userFavorites').then(function (response) {
    $scope.favorites = response.data

    $http.get('/api/v1/coData').then(function (response) {

      $scope.allRivers = response.data;
      $scope.userFavs = [];
    
      for ( var i = 0; i < $scope.favorites.length; i++ ) {
        for ( var e = 0; e < $scope.allRivers.length; e++ ) {
          if ( $scope.favorites[i].riverid === $scope.allRivers[e].id ){
            $scope.userFavs.push($scope.allRivers[e]);
          }
        }
      }

      for ( var i = 0; i < $scope.favorites.length; i++ ) {
        for ( var e = 0; e < $scope.userFavs.length; e++ ) {
        if($scope.favorites[i].riverid === $scope.userFavs[e].id){
          $scope.userFavs[e]['riverlevel'] = $scope.favorites[i].riverlevel
          }
        }
      }
      
      return $scope.userFavs;

    }).then(function(userFavs){
      var promises = []

      // start map
      userFavs.map(function(favs){
        var p = $http.get('//waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ favs["USGSid"] +'&parameterCd=00060,00065').then(function(response){
          $scope.flows[favs["name"]] = response.data.value.timeSeries[0].values[0].value[0].value;
          return $scope.flows;
        });
        promises.push(p)
      });
      // end map
              console.log($scope.userFavs, 'ldldldld')

      Promise.all(promises).then(function(rivers){
          var rivers = rivers[0];

            for(var prop in rivers){
              console.log(prop, rivers[prop])
               for(var i =0; i<userFavs.length;i++){
                  if(prop === userFavs[i].name){
                     
                      if(rivers[prop] > userFavs[i].riverlevel){
                        
                          $scope.ideal.push(userFavs[i])

                      }
                }
               }
            }
          console.log($scope.ideal, '-----------tacs------------------')
          // START call twilio API
        
           // if(water.riverLevel < actualFlow){
           //    $scope.ideal.push(water);
           //  }

          // END call twilio API

      });


    });
  });

  $scope.twillio = function(actualFlow, water){
    console.log('twillio--->', actualFlow, water)

 
  }

  $scope.setClassBasedOnFlow = function(actualFlow, recommendedFlow){
    // completely frozen water
    if(actualFlow === '-999999')  return 'five'

    if(actualFlow < recommendedFlow) return 'four'
    if(recommendedFlow - actualFlow > 0) return 'three'
    if(recommendedFlow - actualFlow > 200) return 'two'
    return 'one'
  }

});