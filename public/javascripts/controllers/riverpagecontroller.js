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
          $http.get("http://api.wunderground.com/api/2dc07206ff5e682e/geolookup/forecast/q/CO/denver.json").then(function(response){
      console.log(response.data.forecast, "Look Over Here!")
      $scope.weatherUnder = response.data.forecast.txt_forecast.forecastday
      // $http.get("http://api.wunderground.com/api/2dc07206ff5e682e/geolookup/forecast/q/" + $scope.riverInfo.latitude +',' + $scope.riverInfo.longitude + ".json").then(function(response){
      // console.log(response.data.forecast, "Look Over Here!")
      // $scope.weatherUnder = response.data.forecast.txt_forecast.forecastday
     
    })
  }); 

  })