scrumApp.controller('HomeController', ['$scope',  'authService', '$location',  function ($scope,  authService, $location) {
    $scope.authentication = authService.authentication;
}]);