  app.controller("IndexController", function($scope, $http, $location, $timeout, $mdSidenav, $log){
      
       // $scope.riverId = $routeParams.riverId;
       // console.log($routeParams.riverId)

    $scope.setClassBasedOnFlow = function(actualFlow, recommendedFlow, aboveRecommend){
      // completely frozen water
      if(actualFlow === '-999999') return 'nine'
      if(actualFlow < recommendedFlow) return 'eight'
      if(actualFlow - recommendedFlow > 0 && actualFlow - recommendedFlow < (recommendedFlow * .5)) return 'seven'
      if(actualFlow - recommendedFlow > (recommendedFlow * .5) && actualFlow - recommendedFlow < recommendedFlow) return 'six'
      if(actualFlow  > recommendedFlow) return 'five'
      else return 'one'
    }

    $http.get('/api/v1/coData').then(function (response) {
      $scope.flows = {};
      $scope.coWaters = response.data;

      $scope.coWaters.map(function(d){
        return $http.get('https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ d.USGSid +'&parameterCd=00060,00065').then(function(response){
          $scope.flows[d.name] = response.data.value.timeSeries[0].values[0].value[0].value;
        });
      });
    }); 

    $scope.state = function(choice){
     
      if(choice === 'al'){
        $scope.viewBarState = 'Alabama'  
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
      if(choice === 'nm'){
        $scope.viewBarState = "New Mexico"
      }
      if(choice === 'wy'){
        $scope.viewBarState = "Wyoming"
      }
      $scope.choice = choice;
    }

    $scope.state('co');

    $scope.class = function(select){
      if(select === 'v'){
        $scope.viewBarClass = 'Class V'
        $scope.classSearch = 'V'
      }
      if(select === 'iv'){
        $scope.viewBarClass = 'Class IV'
        $scope.classSearch = 'IV'
      }
      if(select === 'iii'){
        $scope.viewBarClass = 'Class III'
        $scope.classSearch = 'III'
      }
      if(select === 'ii'){
        $scope.viewBarClass = 'Class II'
        $scope.classSearch = 'II'
      }
      if(select === 'i'){
        $scope.viewBarClass = 'Class I'
        $scope.classSearch = 'I'
      }
    }
  
    $scope.showflag = true;

    setTimeout(function (){
      $scope.$apply(function(){
        $scope.showflag = false;
      });
    }, 1500);
  

     $scope.toggleLeft = buildDelayedToggler('left');

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
  
   $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };

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