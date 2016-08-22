'use strict';

angular
    .module('towerOfGamesApp')
    .config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider){
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/', {
                template: '<game-compare></game-compare><p>hi there</p>'
            });
    }]);