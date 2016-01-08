  app.controller("IndexController", function($scope, $http, $location){
      
       // $scope.riverId = $routeParams.riverId;
       // console.log($routeParams.riverId)

        $http.get('/api/v1/coData').then(function (response) {
      $scope.flows = {};
      $scope.coWaters = response.data;

        $scope.coWaters.map(function(d){

          return $http.get('//waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ d.USGSid +'&parameterCd=00060,00065').then(function(response){
            $scope.flows[d.name] = response.data.value.timeSeries[0].values[0].value[0].value;
          });

        });
        console.log($scope.coWaters)

    }); 


    $scope.state = function(choice){
      console.log(choice)
      if(choice === 'al'){
        $scope.viewBarState = 'Alabama'
        console.log($scope.viewBarState)
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
      $scope.choice = choice;
    }

   $scope.class = function(select){
    if(select === 'v'){
      $scope.viewBarClass = ' Class V'
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
  
  })