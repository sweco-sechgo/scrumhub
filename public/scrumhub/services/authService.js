scrumApp.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    var serviceBase = 'https://api.github.com/users/',
        me,
        authentication = {
            isAuth: false,
            userName : ""
        };

    me = {
        authentication: authentication,

        fillAuthData: function () {
            var authData = localStorageService.get('authorizationData');
            if (authData)
            {
                authentication.isAuth = true;
                authentication.userName = authData.userName;
            }
        },

        login: function (loginData) {
            var authToken = 'Basic ' + window.btoa(unescape(encodeURIComponent(loginData.userName + ':' + loginData.password))),
                deferred = $q.defer();
            $http.defaults.headers.common.Authorization = authToken;
             $http.get(serviceBase + loginData.userName).success(function (response) {
                localStorageService.set('authorizationData', { token: authToken, userName: loginData.userName });
                authentication.isAuth = true;
                authentication.userName = loginData.userName;
                deferred.resolve(response);
             }).error(function (err, status) {
                me.logOut();
                deferred.reject(err);
            });
            return deferred.promise;
        },

        logOut: function () {
            localStorageService.remove('authorizationData');
            $http.defaults.headers.common.Authorization = '';
            authentication.isAuth = false;
            authentication.userName = "";
        }
    };

    return me;
}]);