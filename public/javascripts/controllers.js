

  app.controller("RiverController", function($scope, $http){
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
  app.controller('RiverController', function($scope, $http){

    $http.get('/api/v1/coData').then(function (response) {
    console.log(response)
    $scope.coWaters = response.data;
  });   
       $http.get('http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=06716100&parameterCd=00060,00065').then(function(response){
      console.log(response.data.value.timeSeries[0].values[0].value[0].value)
        $scope.flows = response.data.value
    })

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

  app.controller("RiverPageController", function($scope, $http, $routeParams){
       $scope.riverId = $routeParams.riverId;
       $http.get('/api/v1/coData').then(function (response) {
       console.log(response)
       $scope.coWaters = response.data;
       for(var i=0; i< $scope.coWaters.length;i++){
        if ($scope.coWaters[i].id === $scope.riverId){
          $scope.riverInfo = $scope.coWaters[i]
          console.log($scope.riverInfo)
        }
       }

      $http.get('http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ $scope.riverInfo.USGSid +'&parameterCd=00060,00065').then(function(response){
      console.log(response.data.value.timeSeries[0].values[0].value[0].value)
        $scope.flows = response.data.value
    })
  }); 

  })
