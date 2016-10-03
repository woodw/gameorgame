{

    /* @ngInject */
    function GameCompareController(Game){
        var ctrl = this;

        

        ctrl.loadGames = loadGames;
        ctrl.$onInit = init;

        function init(){
            ctrl.games = ctrl.loadGames();
        }
        function loadGames(){
            return Game.query();
        }
    }

    //Angular Blurb
    angular
    .module('gameCompare')
    .component('gameCompare', {
        templateUrl: 'app/game-compare/game-compare.template.html',
        controller: GameCompareController
    });

}