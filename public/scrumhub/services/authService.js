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
        /**
         * authentication state
         * @type {object}
         */
        authentication: authentication,

        /**
         * Läs in användare från localstorage om det finns och notifiera att authentication har ändrats.
         */
        fillAuthData: function () {
            var authData = localStorageService.get('authorizationData');
            if (authData)
            {
                authentication.isAuth = true;
                authentication.userName = authData.userName;
                authentication.avatar = authData.avatar;
                $http.defaults.headers.common.Authorization = authData.token;
                authentication.user = authData.user;
                $rootScope.$broadcast('authenticationChanged', authentication);
            }
        },

        /**
         * Logga in användare mot github spara token och användare i localstorage.
         * @param  {object} loginData
         * @return {function}           promise
         */
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
                $rootScope.$broadcast('authenticationChanged', authentication);
                deferred.resolve(response);
            }).error(function (err, status) {
                me.logOut();
                deferred.reject(err);
            });
            return deferred.promise;
        },

        /**
         * Logga ut användare, radera localstorage och återställ användare.
         */
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