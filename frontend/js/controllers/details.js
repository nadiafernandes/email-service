app.controller('DetailsModalController', function ($scope, ngDialog, Email, $rootScope) {
    var self = this;

    self.close = function () {
        ngDialog.close();
    }

    self.delete = function (id) {
        Email.delete(id)
            .then(function () {
                ngDialog.close();
                $rootScope.$broadcast('email.deleted');
            })
            .catch(function (e) {
                console.log(e);
            })
    }
});

