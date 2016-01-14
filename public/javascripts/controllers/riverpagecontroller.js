app.controller("RiverPageController", function($scope, $http, $routeParams, $location, $window, $cookies){
  



      $scope.riverId = $routeParams.riverId;
      
       $scope.user = $cookies.getAll();
      

       $http.get('/api/v1/coData').then(function (response) {
     
       $scope.coWaters = response.data;
       for(var i=0; i< $scope.coWaters.length;i++){
        if ($scope.coWaters[i].id === $scope.riverId){
          $scope.riverInfo = $scope.coWaters[i]
          
        }
       }
   

      $http.get('//waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ $scope.riverInfo.USGSid +'&parameterCd=00060,00065').then(function(response){
        $scope.flows = response.data.value
      
    })
      $http.get("//api.wunderground.com/api/2dc07206ff5e682e/geolookup/forecast/q/"+$scope.riverInfo.latlng +".json").then(function(response){
    
      $scope.weatherUnder = response.data.forecast.txt_forecast.forecastday
      $scope.weatherLocation = response.data.location.city
     
  })
   

    $http.get('//waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+$scope.riverInfo.USGSid +'&startDT=2015-01-04&parameterCd=00060,00065').then(function(response){
        $scope.flow = response.data.value.timeSeries[0].values[0].value;
        $scope.flowData = [];

        for (var i = 0; i < $scope.flow.length; i+=96) {
          if($scope.flow[i].value == '-999999'){
            $scope.flowData.push(1)
          }else{
    
          $scope.flowData.push(Number($scope.flow[i].value));
        }
        };

    return $scope.flowData;
    }).then(function(arr){
  $scope.labels = [];
  // $scope.series = ['Series A'];
  for (var i = 0; i <= arr.length; i++) {
    $scope.labels.push("-");
  };
  
  $scope.data = [
   arr
  ];
 

  $scope.onClick = function (points, evt) {
   
  };  
      $scope.chart = function(select) {
       $scope.chartSelect = "line";
       $scope.chartSelect = select;
    
     }
  
    })

     })
 
     $scope.showflag = true;
   setTimeout(function () 
   {
     $scope.$apply(function()
     {
       $scope.showflag = false;
     });
   }, 1500);



})