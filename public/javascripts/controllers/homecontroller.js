app.controller("HomeController", function($scope, $http, $location, $cookies, $routeParams){
  
  $http.get('/_=_').then(function (response) {
  $cookies.put('facebookId', response.data.facebookId);
  $cookies.put('firstName', response.data.firstName);
  $cookies.put('lastName', response.data.lastName);
  $scope.user = $cookies.getAll()

  })

   
  $scope.locationData = $location.$$path


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
    if(select === "favorites"){
      $scope.viewBar = "Favorites"
    }
    if(select === "announcements"){
      $scope.viewBar = "Announcements"
    }
    $scope.select = select;
  }
  

  $scope.myInterval = 3000;
  // $scope.noWrapSlides = false;
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

  var $window = $(window); 
  $('section[data-type="background"]').each(function(){
    var $bgobj = $(this); // assigning the object     
    $(window).scroll(function() {
        var yPos = -($window.scrollTop() / $bgobj.data('speed'));              
        // Put together our final background position
        var coords = '50% '+ yPos + 'px';
        // Move the background
        $bgobj.css({ backgroundPosition: coords });
    }); 
  });   
})