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