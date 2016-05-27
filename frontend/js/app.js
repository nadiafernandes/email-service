var app = angular.module('emailApp', ['ui.router', 'ngDialog'])
    .config(function ($urlRouterProvider, $stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'views/form.html'
            })
            .state('emails', {
                url: '/emails',
                templateUrl: 'views/emails.html'
            });

        $urlRouterProvider.otherwise("/");

    });