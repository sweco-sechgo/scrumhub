scrumApp.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    var serviceBase = '',
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
            alert(loginData.userName);
            /*var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password,
                deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

                authentication.isAuth = true;
                authentication.userName = loginData.userName;

                deferred.resolve(response);

            }).error(function (err, status) {
                me.logOut();
                deferred.reject(err);
            });

            return deferred.promise;*/
        },
        logOut: function () {
            localStorageService.remove('authorizationData');
            authentication.isAuth = false;
            authentication.userName = "";
        }
    };

    return me;
}]);