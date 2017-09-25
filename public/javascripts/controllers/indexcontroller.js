  app.controller("IndexController", function($scope, $http, $location, $timeout, $mdSidenav, $log){
      
      // $scope.riverId = $routeParams.riverId;
      // console.log($routeParams.riverId)
    $scope.setClassBasedOnFlow = function(actualFlow, recommendedFlow, aboveRecommend){
      // completely frozen water
      if(actualFlow === '-999999') return 'nine'
      if(actualFlow < recommendedFlow) return 'eight'
      if(actualFlow > recommendedFlow && actualFlow < aboveRecommend - (actualFlow*.5)) return 'seven'
      if(actualFlow > recommendedFlow && actualFlow < aboveRecommend) return 'six'
      if(actualFlow  > aboveRecommend) return 'five'
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

    $scope.myFilterFunction = function(filter){
      $scope.newFilter = filter;
    };

    // $scope.down = function(water){
    //   console.log('down', water.id)
    //   for (var i = 0; i < $scope.coWaters.length; i++) {
    //     if ($scope.coWaters[i].id === water.id) {
    //     $scope.coWaters.splice(i, 1);
    //     break;
    //     }
    //   }
    // }

    $scope.addFav = function(fav){
    console.log(fav);
      $http({
        url: '/addFav',
        method: "POST",
        data: { 'riverId' : fav }
      });
    };

    $scope.state = function(choice){
     
      if(choice === 'al'){
        $scope.viewBarState = 'Alabama';
        $scope.choice = choice; 
      }
      if(choice === 'ak'){
        $scope.viewBarState = "Alaska";
        $scope.choice = choice;
      }
      if(choice === 'all'){
        $scope.viewBarState = 'Display All';
        $scope.choice = '';
      }
      if(choice === 'az'){
        $scope.viewBarState = 'Arizona';
        $scope.choice = choice;
      }
      if(choice === 'ar'){
        $scope.viewBarState = 'Arkansas';
        $scope.choice = choice;
      }
      if(choice === 'ca'){
        $scope.viewBarState = "California";
        $scope.choice = choice;
      }
      if(choice === 'co'){
        $scope.viewBarState = "Colorado";
        $scope.choice = choice;
      }
      if(choice === 'nm'){
        $scope.viewBarState = "New Mexico";
        $scope.choice = choice;
      }
       if(choice === 'wv'){
        $scope.viewBarState = "West Virginia";
        $scope.choice = choice;
      }

      if(choice === 'wy'){
        $scope.viewBarState = "Wyoming";
        $scope.choice = choice;
      }
      
    };

    $scope.state('co');

    $scope.class = function(select){
      if(select === 'v'){
        $scope.viewBarClass = 'Class V';
        $scope.classSearch = 'V';
      }
      if(select === 'iv'){
        $scope.viewBarClass = 'Class IV';
        $scope.classSearch = 'IV';
      }
      if(select === 'iii'){
        $scope.viewBarClass = 'Class III';
        $scope.classSearch = 'III';
      }
      if(select === 'ii'){
        $scope.viewBarClass = 'Class II';
        $scope.classSearch = 'II';
      }
      if(select === 'i'){
        $scope.viewBarClass = 'Class I';
        $scope.classSearch = 'I';
      }
    };
  
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
});