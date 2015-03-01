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
        },
        post: function (url, data) {
            var deferred = $q.defer();
            $http.post(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        patch: function (url, data) {
            var deferred = $q.defer();
            $http.patch(url, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    };
}]);