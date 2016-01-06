app.controller("RiverPageController", function($scope, $http, $routeParams){
       $scope.riverId = $routeParams.riverId;
       console.log($routeParams)
       $http.get('/api/v1/coData').then(function (response) {
       console.log(response)
       $scope.coWaters = response.data;
       for(var i=0; i< $scope.coWaters.length;i++){
        if ($scope.coWaters[i].id === $scope.riverId){
          $scope.riverInfo = $scope.coWaters[i]
          console.log($scope.riverInfo)
        }
       }
   
     //   var url = 'http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ $scope.riverInfo.USGSid +'&parameterCd=00060,00065';

     //  return url;
       
     //  }).then(function(url) {
     //    console.log('url in controller', url); 
     //    $http.post("/api/v1/api-proxy/flow", url).then(function(res){
     //    var data = res.data;
     //    console.log(data)
     

     //   // $scope.flows = data.data.value
     //   // console.log($scope.flows)
     //    })

    
     // })

  

      $http.get('http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ $scope.riverInfo.USGSid +'&parameterCd=00060,00065').then(function(response){
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
   

    $http.get('http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+$scope.riverInfo.USGSid +'&startDT=2015-01-04&parameterCd=00060,00065').then(function(response){
        $scope.flow = response.data.value.timeSeries[0].values[0].value;
        $scope.flowData = [];

        for (var i = 0; i < $scope.flow.length; i+=100) {
          // $scope.flow[i]
          // console.log($scope.flow[i]);
       
          $scope.flowData.push(Number($scope.flow[i].value));
        };

    return $scope.flowData;
    }).then(function(arr){
  $scope.labels = [];
  // $scope.series = ['Series A'];
  for (var i = 0; i <= arr.length; i++) {
    $scope.labels.push("1");
  };
  
  $scope.data = [
   arr
  ];
  console.log('$scope data', $scope.data);

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
      $scope.chart = function(select) {
                
       $scope.chartSelect = select;
       console.log($scope.chartSelect)
  }
    })

     })
 

  // [
  //   [43, 59, 80, 81, 56, 55, 40,45,55,65,75,80,99,78]
  // ];



})