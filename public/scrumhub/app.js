var scrumApp = angular.module('scrumApp', [
    'ngRoute',
    'LocalStorageModule'
]);

scrumApp.config(function ($routeProvider, localStorageServiceProvider) {

    $routeProvider.when("/", {
        controller: "HomeController",
        templateUrl: "scrumhub/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "LoginController",
        templateUrl: "scrumhub/views/login.html"
    });
    $routeProvider.otherwise({ redirectTo: "/" });

    localStorageServiceProvider.setPrefix('scrumApp');
});

scrumApp.run(['authService', function (authService) {
    authService.fillAuthData();
}]);