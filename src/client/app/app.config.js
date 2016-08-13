'use strict';

angular
    .module('app')
    .config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider){
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/', {
                template: '<game-compare></game-compare><p>hi there</p>'
            })
            .otherwise('/');
    }]);