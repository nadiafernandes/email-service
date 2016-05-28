app.controller('EmailController', function ($scope, $http, $timeout, Email, ngDialog) {
    var self = this;
    self.emails = [];

    self.edit = function () {
        Email.edit($scope.email)
            .then(function (res) {
                $timeout(function () {
                    $scope.message = "Email edited.";
                }, 3000);
            })
            .catch(function (e) {
                console.log(e);
            });
    };

    self.refresh = function () {
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

    self.show = function (email) {
        ngDialog.open({
            data: {
                'to': email.to,
                'from': email.from,
                'date': email.date,
                'subject': email.subject,
                'text': email.text,
                '_id': email._id
            },
            template: 'views/modals/emailDetails.html'
        });
    }
    self.refresh();
    $scope.$watch('email.deleted', self.refresh);
});

