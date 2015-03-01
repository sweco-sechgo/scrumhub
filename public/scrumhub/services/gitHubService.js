scrumApp.factory('gitHubService', ['$http', '$q', function ($http, $q) {

    return {
        get: function (url) {
            var deferred = $q.defer();

            $http.get(url).success(function (response) {
                 deferred.resolve(response);
            }).error(function (err, status) {
                 deferred.reject(err);
            });
            return deferred.promise;
        }
    };
}]);