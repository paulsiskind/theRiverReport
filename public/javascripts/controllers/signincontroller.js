// app.controller('SigninController', ['$scope', '$http', 'auth', 'store', '$location',
// function ($scope, $http, auth, store, $location) {
//   $scope.login = function () {
//     auth.signin({}, function (profile, token) {
//       // Success callback
//       store.set('profile', profile);
//       store.set('token', token);
//       $location.path('/');
//     }, function(error) {
//       console.log("There was an error logging in", error);
//     });
//   }
//       $scope.logout = function() {
//       auth.signout();
//       store.remove('profile');
//       store.remove('token');
//     }
// }]);