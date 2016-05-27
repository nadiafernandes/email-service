app.service('Email', function ($q, $http) {
        var self = this;
        self.list = [];

        self.send = function (data) {
            var defer = $q.defer();
            var url = '/api/emails';
            $http.post(url, data)
                .then(function (res) {
                    defer.resolve(res.data);
                })
                .catch(function (e) {
                    defer.reject(e);
                });
            return defer.promise;
        };

        self.edit = function (data) {
            var defer = $q.defer();
            var url = '/api/emails/' + $scope._id;
            $http.put(url, data)
                .then(function (res) {
                    defer.resolve(res.data);
                })
                .catch(function (e) {
                    defer.reject();
                });
            return defer.promise;
        };

        self.getEmail = function (isProcessed) {
            var defer = $q.defer();
            var url = '/api/emails';
            if (isProcessed) url += '?processed=' + isProcessed;

            $http.get(url)
                .then(function (res) {
                    defer.resolve(res.data);
                })
                .catch(function (e) {
                    defer.reject(e);
                });
            return defer.promise;
        };

        self.delete = function (id) {
            var defer = $q.defer();
            var url = '/api/emails/' + id;

            $http.delete(url)
                .then(function () {
                    defer.resolve();
                })
                .catch(function (e) {
                    defer.reject(e);
                });
            return defer.promise;
        };
    });
