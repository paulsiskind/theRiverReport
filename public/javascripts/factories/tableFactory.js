app.factory('tableFactory', function(){
  return {
    sayHello: function(text){
      return "Factory says \"Hello " + text + "\"";
    },
    sayGoodbye: function(text){
      return "Factory says \"Goodbye " + text + "\"";
    },
    setClassBasedOnFlow:function(actualFlow, recommendedFlow){
      // completely frozen water
      if(actualFlow === '-999999') return 'nine'
      if(actualFlow < recommendedFlow) return 'eight'
      if(actualFlow - recommendedFlow > 0 && actualFlow - recommendedFlow < (recommendedFlow * .5)) return 'seven'
      if(actualFlow - recommendedFlow > (recommendedFlow * .5) && actualFlow - recommendedFlow < recommendedFlow) return 'six'
      if(actualFlow  > recommendedFlow) return 'five'
      else return 'one'
    },
    debounce:function(func, wait, context) {
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
    },
    buildDelayToggler:function(navID){
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    },
    buildToggler:function(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    },
  }               
});