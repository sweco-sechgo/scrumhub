scrumApp.factory('authService', ['$http', '$q', 'localStorageService', '$rootScope', function ($http, $q, localStorageService, $rootScope) {
    var serviceBase = 'https://api.github.com/users/',
        me,
        authentication = {
            isAuth: false,
            userName : "",
            avatar: "",
            user: null
        };

    me = {
        authentication: authentication,

        fillAuthData: function () {
            var authData = localStorageService.get('authorizationData');
            if (authData)
            {
                authentication.isAuth = true;
                authentication.userName = authData.userName;
                authentication.avatar = authData.avatar;
                $http.defaults.headers.common.Authorization = authData.token;
                $rootScope.$broadcast('authenticationChanged', authentication);
            }
        },

        login: function (loginData) {
            var authToken = 'Basic ' + window.btoa(unescape(encodeURIComponent(loginData.userName + ':' + loginData.password))),
                deferred = $q.defer();
            $http.defaults.headers.common.Authorization = authToken;
            $http.get(serviceBase + loginData.userName).success(function (response) {
                localStorageService.set('authorizationData', { token: authToken, userName: loginData.userName, avatar: response.avatar_url, user: response });
                authentication.avatar = response.avatar_url;
                authentication.isAuth = true;
                authentication.userName = loginData.userName;
                authentication.user = response;
                $broadcast('authenticationChanged', authentication);
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
            authentication.avatar = "";
            authentication.user = null;
            $rootScope.$broadcast('authenticationChanged', authentication);
        }
    };

    return me;
}]);