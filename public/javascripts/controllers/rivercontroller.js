  app.controller("RiverController", function($scope, $http, $location, $cookies, $routeParams){
    
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

  




  //  $scope.myInterval = 5000;
  // var slides = $scope.slides = [];
  // var currIndex = 0;

  // $scope.addSlide = function() {
  //   var newWidth = 600 + slides.length + 1;
  //   slides.push({
  //     image: 'http://lorempixel.com/' + newWidth + '/300',
  //     text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
  //     id: currIndex++
  //   });
  // };

  // $scope.randomize = function() {
  //   var indexes = generateIndexesArray();
  //   assignNewIndexesToSlides(indexes);
  // };

  // for (var i = 0; i < 4; i++) {
  //   $scope.addSlide();
  // }

  // // Randomize logic below

  // function assignNewIndexesToSlides(indexes) {
  //   for (var i = 0, l = slides.length; i < l; i++) {
  //     slides[i].id = indexes.pop();
  //   }
  // }

  // function generateIndexesArray() {
  //   var indexes = [];
  //   for (var i = 0; i < currIndex; ++i) {
  //     indexes[i] = i;
  //   }
  //   return shuffle(indexes);
  // }

  // // http://stackoverflow.com/questions/962802#962890
  // function shuffle(array) {
  //   var tmp, current, top = array.length;

  //   if (top) {
  //     while (--top) {
  //       current = Math.floor(Math.random() * (top + 1));
  //       tmp = array[current];
  //       array[current] = array[top];
  //       array[top] = tmp;
  //     }
  //   }

  //   return array;
  // }


  })