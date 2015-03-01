scrumApp.controller('HomeController', ['$scope',  'authService', 'repositoryService', '$location',
                        function ($scope,  authService, repositoryService, $location) {
    $scope.authentication = authService.authentication;
    $scope.myrepos = [];
    $scope.organizations = [];
    $scope.$watch('authService.authentication.isAuth', function () {
        if(authService.authentication.isAuth) {
            console.log(authService.authentication.user.repos_url);
            console.log(authService.authentication.user.organizations_url);
            repositoryService.load(authService.authentication.user.repos_url).then(function (repos) {
                $scope.myrepos = repos.map(function (repo) {
                    return {
                        id: repo.id,
                        name: repo.name,
                        issues: repo.issues_url
                    };
                });
            }, function (status, respo) {
                $scope.myrepos = [];
            });

            repositoryService.load(authService.authentication.user.organizations_url).then(function (orgs) {
                $scope.organizations = orgs.map(function (org) {
                    return {
                        id: org.id,
                        avatar: org.avatar_url,
                        name: org.login,
                        url: org.repos_url
                    };
                });
                console.log(orgs);
            }, function (status, respo) {
                $scope.organizations = [];
            });
        } else {
            $scope.myrepos = [];
            $scope.organizations = [];
        }
    });
}]);