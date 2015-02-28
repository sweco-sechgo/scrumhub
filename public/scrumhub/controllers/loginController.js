scrumApp.controller('LoginController',['$scope', 'authService', function ($scope, authService) {
    $scope.username;
    $scope.password;
    $scope.login = function () {
        authService.login({userName: $scope.username, password: $scope.password }).then(function (response) {
            //success
        }, function (response) {
            //error
        });
    };
}]);