// 'use strict';

app.directive('sideTable', function () {
    return {
        restrict: 'E',
        templateUrl: './partials/sideTable.html',
        controller: function($scope, $http, $cookies) {

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
        },
    };
});