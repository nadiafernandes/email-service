app.controller('DetailsModalController', function ($scope, ngDialog) {
    var self = this;

    self.close = function(){
        console.log("close")
        ngDialog.close();
    }
});

