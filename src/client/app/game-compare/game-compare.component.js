{

    /* @ngInject */
    function GameCompareController(Game){
        var ctrl = this;

        ctrl.loadGames = loadGames;
        //////////////////////////
        ctrl.games = loadGames();
        //////////////////////////
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