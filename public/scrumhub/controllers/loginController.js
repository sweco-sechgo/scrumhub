scrumApp.controller('LoginController',['$scope', 'authService', function ($scope, authService) {
    $scope.username;
    $scope.password;

    $scope.login = function () {
        console.log($scope.username, $scope.password);
        authService.login({userName: $scope.username, password: $scope.password });
    };
}]);