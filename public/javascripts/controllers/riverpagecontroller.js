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
   

      $http.jsonp('http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ $scope.riverInfo.USGSid +'&parameterCd=00060,00065').then(function(response){
        $scope.flows = response.data.value
        console.log($scope.flows)
    })
          $http.get("https://api.wunderground.com/api/2dc07206ff5e682e/geolookup/forecast/q/"+$scope.riverInfo.latlng +".json").then(function(response){
      console.log(response.data, "Look Over Here!")
      $scope.weatherUnder = response.data.forecast.txt_forecast.forecastday
      $scope.weatherLocation = response.data.location.city

      // $http.get("http://api.wunderground.com/api/2dc07206ff5e682e/geolookup/forecast/q/" + $scope.riverInfo.latitude +',' + $scope.riverInfo.longitude + ".json").then(function(response){
      // console.log(response.data.forecast, "Look Over Here!")
      // $scope.weatherUnder = response.data.forecast.txt_forecast.forecastday
     
    })
  });

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
  // $scope.series = ['Series A'];
  $scope.data = [
    [43, 59, 80, 81, 56, 55, 40,45,55,65,75,80,99,78]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
      $scope.chart = function(select) {
                
       $scope.chartSelect = select;
       console.log($scope.chartSelect)
  }



  })