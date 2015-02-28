scrumApp.controller('logoutController',['$scope', 'authService', function ($scope, authService) {
    $scope.authentication = authService.authentication;
    $scope.logout = function () {
        authService.logOut();
    };
}]);