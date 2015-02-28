scrumApp.controller('LoginController',['$scope', 'authService', '$location', function ($scope, authService, $location) {
    $scope.username;
    $scope.password;
    $scope.isinvalide = false;
    $scope.login = function () {
        authService.login({userName: $scope.username, password: $scope.password }).then(function (user) {
            //success
            $scope.usernam = "";
            $scope.password = "";
            $scope.isinvalide = false;
            $location.path('/index');
        }, function (response) {
            //error
            $scope.isinvalide = true;
        });
    };
}]);