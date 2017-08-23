app.controller("HomeController", function($scope, $http, $location, $cookies, $routeParams){
  
  $http.get('/_=_').then(function (response) {
  $cookies.put('facebookId', response.data.facebookId);
  $cookies.put('firstName', response.data.firstName);
  $cookies.put('lastName', response.data.lastName);
  $scope.user = $cookies.getAll()

  })

  $http.get('/api/v1/newFeed').then(function (response) {  
    console.log(response.data[0])
    $scope.newsFeed = response.data;
  });

  
  

   
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
  },30000)

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