app.controller("RiverPageController", function($scope, $http, $routeParams, $location, $window, $cookies){
  
  $scope.riverId = $routeParams.riverId;  
  $scope.user = $cookies.getAll();


      
    

  $http.get('/api/v1/coData').then(function (response) {  
    $scope.coWaters = response.data;
    for(var i=0; i< $scope.coWaters.length;i++){
      if ($scope.coWaters[i].id === $scope.riverId){
        $scope.riverInfo = $scope.coWaters[i]    
      };
    };
 
    $http.get('https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ $scope.riverInfo.USGSid +'&parameterCd=00060,00065').then(function(response){
      $scope.flows = response.data.value
    })
    $http.get("https://api.wunderground.com/api/2dc07206ff5e682e/geolookup/forecast/q/"+$scope.riverInfo.latlng +".json").then(function(response){
      $scope.weatherUnder = response.data.forecast.txt_forecast.forecastday
      $scope.weatherLocation = response.data.location.city   
    })
 
    $http.get('https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+$scope.riverInfo.USGSid +'&startDT=2015-03-04&parameterCd=00060,00065').then(function(response){
      console.log(response)
      $scope.flow = response.data.value.timeSeries[0].values[0].value;
      $scope.flowData = [];                                                          

      for (var i = 0; i < $scope.flow.length; i+=112) {
        if($scope.flow[i].value == '-999999'){
          $scope.flowData.push(1)
        }
        else{
          $scope.flowData.push(Number($scope.flow[i].value));
        }
      };

      return $scope.flowData;
    }).then(function(arr){
      $scope.labels = [];
       // $scope.series = ['Series A'];
      for (var i = 0; i <= arr.length; i++) {
       
        if(i===0){
          $scope.labels.push('March');
        }
        else if(i===28){
          $scope.labels.push('March');
          console.log('tacios')
        }
        else if(i===58){
          $scope.labels.push('May')
        }
        else if(i===88){
          $scope.labels.push('June');
        }
        else if(i===118){
          $scope.labels.push('July');
        }
        else if(i===148){
          $scope.labels.push('August');
        }
        else if(i===178){
          $scope.labels.push('September');
        }
        else if(i===208){
          $scope.labels.push('October');
          console.log('Here')
        }
        else if(i===238){
          $scope.labels.push('November');
        }
        else if(i===268){
          $scope.labels.push('December');
        }
        else if(i===298){
          $scope.labels.push('January');
        }
        else if(i===328){
          $scope.labels.push('Febuary');
        }
         if(i===358){
          $scope.labels.push('March');
        }
        else if(i===388){
          $scope.labels.push('March');
          console.log('tacios')
        }
        else if(i===418){
          $scope.labels.push('May')
        }
        else if(i===448){
          $scope.labels.push('June');
        }
        else if(i===478){
          $scope.labels.push('July');
        }
        else if(i===508){
          $scope.labels.push('August');
        }
        else if(i===538){
          $scope.labels.push('September');
        }
        else if(i===568){
          $scope.labels.push('October');
          console.log('Here')
        }
        else if(i===598){
          $scope.labels.push('November');
        }
        else if(i===628){
          $scope.labels.push('December');
        }
        else if(i===658){
          $scope.labels.push('January');
        }
        else if(i===688){
          $scope.labels.push('Febuary');
        }
        else if(i===718){
          $scope.labels.push('March');
        }
        else{
          $scope.labels.push(i);
        }
        console.log($scope.labels)
      };

      $scope.data = [arr];

      $scope.onClick = function (points, evt) {

      };  
      $scope.chart = function(select) {
        $scope.chartSelect = "line";
        $scope.chartSelect = select;
      }
    });
  });

  var k=0;

  $scope.setBackground = function(){
    if(k==0) return 'zero'
    if(k==1) return 'one'
    if(k==2) return 'two'
    if(k===3) return 'three'   
    if(k===4) k=0;
  }
 
  setInterval(function(){
    k++;
    console.log('here', k)
    $scope.setBackground()
    $scope.$apply(); 
  },30000)

  $scope.showflag = true;
  setTimeout(function (){
    $scope.$apply(function(){
      $scope.showflag = false;
      });
  }, 2000);
});