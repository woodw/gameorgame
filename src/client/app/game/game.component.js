{
    /* @ngInject */
    function GameController(Game){
        var ctrl = this;

        ctrl.selected = false;
        ctrl.information = {};

        ctrl.loadGame = loadGame;
        ctrl.select = select;

        /////////
        ctrl.information = loadGame(ctrl.gameid);
        /////////

        function loadGame(gameid){
            return Game.get({gameId: gameid});
        }
        function select(){
            ctrl.selected = true;
        }
    }

    //Angular Blurb
    angular
    .module('game')
    .component('game', {
        templateUrl: 'app/game/game.template.html',
        controller: GameController,
        bindings: {
            gameid: '@'
        }
    });

}