app.controller('FavoritesController', function ($scope, $http, $routeParams, $rootScope, $window, $cookies) {
  $scope.user = $cookies.getAll();
  $scope.flows = {};
  $scope.ideal = []
  $scope.showme =false
  

  $http.get('/usersData').then(function (response) {
    $scope.usersData = response.data   
    $scope.userphone = $scope.usersData[0].userphone
    $scope.userEmail = $scope.usersData[0].email 
    $scope.textAlert = $scope.usersData[0].textalert
    $scope.emailAlert = $scope.usersData[0].emailalert
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
        var p = $http.get('https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ favs["USGSid"] +'&parameterCd=00060,00065').then(function(response){
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
                  
                  $scope.ideal.push(userFavs[i])
                };
              };
            };
          };
        };
      });
    });
  });

  $scope.textAlertChange = function(){
    $http({
        url: '/textAlert',
        method: "POST",
        data: { 'textAlert' : $scope.textAlert}
    })
  }
  

  $scope.emailAlertChange = function(){
    $http({
        url: '/emailAlert',
        method: "POST",
        data: { 'emailAlert' : $scope.emailAlert}
    })
  }

  $scope.setClassBasedOnFlow = function(actualFlow, recommendedFlow, aboveRecommend){
    // completely frozen water
    if(actualFlow === '-999999') return 'nine'
      if(actualFlow < recommendedFlow) return 'eight'
      if(actualFlow - recommendedFlow > 0 && actualFlow - recommendedFlow < 200) return 'seven'
      if(actualFlow - recommendedFlow > 200 && actualFlow - recommendedFlow < recommendedFlow) return 'six'
      if(actualFlow - recommendedFlow > recommendedFlow) return 'five'
  }
  var k =0;
  $scope.setBackground = function(){
    if(k==0) return 'zero'
    if(k==1) return 'one'
    if(k==2) return 'two'
    if(k===3) return 'three'   
    if(k===4) k=0;
  }
 
  setInterval(function(){
    k++;
    $scope.setBackground()
    $scope.$apply(); 
  },30000)
});