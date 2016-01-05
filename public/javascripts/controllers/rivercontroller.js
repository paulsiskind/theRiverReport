  app.controller("RiverController", function($scope, auth, $http, $location, store){
    
     $scope.auth = auth;

     $scope.order = function(select) {
                    if(select === 'rivers') {
                      $scope.viewBar = 'Rivers';
                    }
                    if(select === 'events') {
                      $scope.viewBar = 'Events';
                    }
                    if(select === 'gear') {
                      $scope.viewBar = 'Gear';
                    }
                    if(select === "messageboard"){
                      $scope.viewBar = "MessageBoard"
                    }
                    if(select === "announcements"){
                      $scope.viewBar = "Announcements"
                    }
                    $scope.select = select;
                    }
    

    $http.get('/api/v1/coData').then(function (response) {
      $scope.flows = {};
      $scope.coWaters = response.data;

        $scope.coWaters.map(function(d){

          return $http.get('http://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites='+ d.USGSid +'&parameterCd=00060,00065').then(function(response){
            $scope.flows[d.name] = response.data.value.timeSeries[0].values[0].value[0].value;
          });

        });

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
   $scope.myInterval = 3000;
  $scope.slides = [
    {
      image: '/images/yule.jpg',
      text: "A Home For Local Streamflows"

    },
    {
      image: '/images/obj.jpg',
      text: "Find the nearest river to your current location"
    },
    {
      image: '/images/grand.jpg',
      text: "Plan your next adventure!"
    },
    {
      image: '/images/tom.jpg',
      text: "Stay informed on the latest conditions"
    }
  ];
  $scope.callApi = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://localhost:3000/secured/ping',
      method: 'GET'
    }).then(function() {
      alert("We got the secured data successfully");
    }, function(response) {
      if (response.status == 0) {
        alert("Please download the API seed so that you can call it.");
      }
      else {
        alert(response.data);
      }
    });
  }
  $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
    }
  })