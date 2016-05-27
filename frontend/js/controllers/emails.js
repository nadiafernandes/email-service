app.controller('EmailController', function ($scope, $http, $timeout, Email) {
        var self = this;
        self.emails = [];

        self.edit = function () {
            Email.edit($scope.email)
                .then(function (res) {
                    $timeout(function() {
                        $scope.message = "Email edited.";
                    }, 3000);

                })
                .catch(function (e) {
                    console.log(e);
                });
        };

        self.refresh = function () {
            console.log("refresh");
            Email.getEmail()
                .then(function (res) {
                    self.emails = res;
                })
                .catch(function (e) {
                    console.log(e);
                });
        };

        self.getSpecificEmail = function (value) {
            Email.getEmail(value)
                .then(function (res) {
                    self.emails = res;
                })
                .catch(function (e) {
                    console.log(e);
                });
        };

        self.refresh();
    });

