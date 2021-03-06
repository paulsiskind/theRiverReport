app.controller("RiverPageController", function($scope, $http, $routeParams, $location, $window, $cookies, $timeout, $mdSidenav, $log, moment){
  
  $scope.riverId = $routeParams.riverId;  
  $scope.user = $cookies.getAll();
  $scope.weatherOnOff = "Weather";
  $scope.showme = true;

  $scope.addFav = function(fav){
    console.log(fav);
      $http({
        url: '/addFav',
        method: "POST",
        data: { 'riverId' : fav }
    });
  };
  $scope.setWaterLevel = function(water,level){
    console.log(water, level);
     $http({
      url: '/addLevel',
      method: "POST",
      data: { 'riverLevel' : level,
              'riverId': water }
    });
  };
  $scope.sDateFunction = function(start, end){
    
    let mStart = moment(start).format('YYYY-MM-DD');
    let mEnd = moment(end).format('YYYY-MM-DD');
    $scope.specCal(mStart, mEnd);
  };

  $scope.currentDate = (moment().format('LLLL'));


  $scope.specCal = function(sDate, eDate){
    $http.get('https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+$scope.riverInfo.USGSid +'&startDT='+sDate+'&endDT='+eDate+'&parameterCd=00060,00065').then(function(response){
      $scope.flow = response.data.value.timeSeries[0].values[0].value;
      $scope.flowData = [];   
      $scope.dateData = [];                                                       
    
      
      for (var i = 0; i < $scope.flow.length; i+=112) {
        if($scope.flow[i].value == '-999999'){
          $scope.flowData.push(1);
          $scope.dateData.push(moment($scope.flow[i].dateTime).format('MM-DD-YY'));
        }
        else{
          $scope.flowData.push(Number($scope.flow[i].value));
          $scope.dateData.push(moment($scope.flow[i].dateTime).format('MM-DD-YY'));
        
        }
      }

      return [$scope.flowData, $scope.dateData];
    }).then(function(flow){
      $scope.labels = [];
      $scope.series = ['Series A'];
      for (var i = 0; i <= flow[1].length-1; i++) {
        $scope.labels.push(flow[1][i]);

      }
    
      $scope.data = [flow[0]];
    

      $scope.onClick = function (points, evt) {

      };  
      $scope.chart = function(select) {
        $scope.chartSelect = "line";
        $scope.chartSelect = select;
      };
    });
  };

  $scope.dateFunction = function(ufDate){
    
    let fDate = moment(ufDate).format('YY-MM-DD');
    
    $scope.customCal(fDate);

  };
  $scope.customCal = function(date){
  
   // console.log('https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+$scope.riverInfo.USGSid +'&startDT='+date+'&parameterCd=00060,00065')
    $http.get('https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+$scope.riverInfo.USGSid +'&startDT=20'+date+'&parameterCd=00060,00065').then(function(response){
      $scope.flow = response.data.value.timeSeries[0].values[0].value;
      $scope.flowData = [];   
      $scope.dateData = [];                                                       
    
      
      for (var i = 0; i < $scope.flow.length; i+=112) {
        if($scope.flow[i].value == '-999999'){
          $scope.flowData.push(1);
          $scope.dateData.push(moment($scope.flow[i].dateTime).format('MM-DD-YY'))
        }
        else{
          $scope.flowData.push(Number($scope.flow[i].value));
          $scope.dateData.push(moment($scope.flow[i].dateTime).format('MM-DD-YY'))
        
        }
      };

      return [$scope.flowData, $scope.dateData]
    }).then(function(flow){
      $scope.labels = [];
      $scope.series = ['Series A'];
      for (var i = 0; i <= flow[1].length-1; i++) {
        $scope.labels.push(flow[1][i]);

      };
 
    
      $scope.data = [flow[0]];
    

      $scope.onClick = function (points, evt) {

      };  
      $scope.chart = function(select) {
        $scope.chartSelect = "line";
        $scope.chartSelect = select;
      }
    });
  }

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
 
    $http.get('https://nwis.waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+$scope.riverInfo.USGSid +'&startDT=2017-01-04&parameterCd=00060,00065').then(function(response){
      $scope.flow = response.data.value.timeSeries[0].values[0].value;
       $scope.flowData = [];   
       $scope.dateData = [];                                                       
    
      
      for (var i = 0; i < $scope.flow.length; i+=112) {
        if($scope.flow[i].value == '-999999'){
          $scope.flowData.push(1)
          $scope.dateData.push(moment($scope.flow[i].dateTime).format('MM-DD-YY'))
        }
        else{
          $scope.flowData.push(Number($scope.flow[i].value));
          $scope.dateData.push(moment($scope.flow[i].dateTime).format('MM-DD-YY'))
        
        }
      };

      return [$scope.flowData, $scope.dateData]
    }).then(function(flow){
      $scope.labels = [];
      $scope.series = ['Series A'];
      for (var i = 0; i <= flow[1].length-1; i++) {
        $scope.labels.push(flow[1][i]);

      };
    
      $scope.data = [flow[0]];

      $scope.onClick = function (points, evt) {

      };  
      $scope.chart = function(select) {
        $scope.chartSelect = "line";
        $scope.chartSelect = select;
      }
    });
  });
 
  $scope.showflag = true;
  setTimeout(function (){
    $scope.$apply(function(){
      $scope.showflag = false;
      });
  }, 2000);


  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function(){
    return $mdSidenav('right').isOpen();
  };
  
  
  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildDelayedToggler(navID) {
    return debounce(function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    };
  }
})
.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });

  };
})
.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };
});