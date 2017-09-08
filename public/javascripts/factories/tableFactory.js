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
  }               
});