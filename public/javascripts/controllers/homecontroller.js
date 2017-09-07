app.controller("HomeController", function($scope, $http, $location, $cookies, $timeout, $routeParams, $mdSidenav, $log, tableFactory){
  
  // $scope.setClassBasedOnFlow = tableFactory.setClassBasedOnFlow(this.flows[water.name], this.water.recommend);


  $http.get('/api/v1/newFeed').then(function (response) {  
    $scope.newsFeed = response.data;
  });
   
 

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
    $scope.setBackground()
    $scope.$apply(); 
  },10000)

  // var $window = $(window); 
  // $('section[data-type="background"]').each(function(){
  //   var $bgobj = $(this); // assigning the object     
  //   $(window).scroll(function() {
  //       var yPos = -($window.scrollTop() / $bgobj.data('speed'));              
  //       // Put together our final background position
  //       var coords = '50% '+ yPos + 'px';
  //       // Move the background
  //       $bgobj.css({ backgroundPosition: coords });
  //   }); 
  // });   

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