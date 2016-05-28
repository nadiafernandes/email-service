var app = angular.module('emailApp', ['ui.router', 'ngDialog', 'ui.bootstrap'])
    .config(function ($urlRouterProvider, $stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'views/emails.html'
            })
            .state('email', {
                url: '/email',
                templateUrl: 'views/form.html'
            });
        $urlRouterProvider.otherwise("/");

    });