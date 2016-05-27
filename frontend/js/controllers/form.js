app.controller('FormController', function ($scope, $http, $timeout, Email) {
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
                $timeout(function () {
                    self.message = "Email sent.";
                    self.email = {};
                }, 3000);
            })
            .catch(function (e) {
                $timeout(function () {
                    self.message = "Email not sent.";
                }, 3000);
            });
    };
});

