app.controller('FavoritesController', function ($scope, $http, $routeParams, $rootScope, $window, $cookies) {
  $scope.user = $cookies.getAll();
  console.log($scope.user)
  $scope.flows = {};
  $scope.ideal = []
  $scope.showme =false



  $http.get('/usersData').then(function (response) {
    $scope.usersData = response.data
   
    $scope.userphone = $scope.usersData[0].userphone
    $scope.userEmail = $scope.usersData[0].email
    
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
           

      Promise.all(promises).then(function(rivers){
          var rivers = rivers[0];

            for(var prop in rivers){
             

             
               for(var i =0; i<userFavs.length;i++){

                  if(prop === userFavs[i].name){
                     
                    if(userFavs[i].riverlevel != null){
                        if(rivers[prop] > userFavs[i].riverlevel){
                          console.log(rivers[prop], userFavs[i].riverlevel )
                          
                            $scope.ideal.push(userFavs[i])
                         }
                    }
                }
               }
            }
         

         
         // if($scope.ideal[0].name === $scope.ideal[0].name){
         //  $http.post('/twilio');
         // }

      });


    });
  });



 
  

  $scope.setClassBasedOnFlow = function(actualFlow, recommendedFlow, aboveRecommend){
    // completely frozen water
    if(actualFlow === '-999999')  return 'five'

    if(actualFlow < recommendedFlow) return 'four'
    if(recommendedFlow - actualFlow > 0) return 'three'
    if(recommendedFlow - actualFlow > 200) return 'two'
    return 'one'
  //Add More Levels for future refactoring add aboveRecommend to coData.json
    // if(aboveRecommend < actualFlow) returb 'six'
    // if((aboveRecommend+(aboveRecommend * .5)) < actualFlow) return 'five'
    // if((aboveRecommend * 2) < actualFlow) return 'four'
    // if((aboveRecommend * 4) < actualFlow) return 'three'
    // if((aboveRecommend * 6) < actualFlow) return 'two'
    // if((aboveRecommend * 10) < actualFlow) return 'one'

  }

});