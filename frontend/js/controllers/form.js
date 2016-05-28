app.controller('FormController', function ($scope, $http, $timeout, Email, $state) {
    var self = this;
    self.message = "";
    self.email = {};
    self.email = {
        to: "nadia.fernandess@gmail.com",
        subject: "subject",
        body: "body"
    }
    self.send = function () {
        Email.send({email: self.email})
            .then(function () {
                self.message = "Email sent.";
                $timeout(function () {
                    self.email = {};
                    $state.go('email');
                }, 3000);
            })
            .catch(function (e) {
                $timeout(function () {
                    self.message = "Email not sent.";
                }, 3000);
            });
    };
});

