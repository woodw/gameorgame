{
    angular
        .module('templates', []);
    angular
        .module('towerOfGamesApp', [
            'templates',
            'ngRoute',
            'core',
            'game',
            'gameCompare'
        ]);
}