var app = angular.module('emailApp', ['ui.router'])
    .config(function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("");
        $stateProvider
            .state('index', {
                url: '',
                templateUrl: 'views/form.html'
            })
            .state('emails', {
                url: '/emails',
                templateUrl: 'views/emails.html'
            });
    });