'use strict';

app.directive('simpleNavbar', function () {
    return {
        restrict: 'E',
        templateUrl: './partials/navbar.html',
        controller: function($scope, $http, $cookies) {

            $http.get('/_=_').then(function (response) {
            $cookies.put('facebookId', response.data.facebookId);
            $cookies.put('firstName', response.data.firstName);
            $cookies.put('lastName', response.data.lastName);
            $scope.user = $cookies.getAll()

            })
            console.log($scope.user)
        },
    };
});
