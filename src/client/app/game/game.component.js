{
    /* @ngInject */
    function GameController(Game){
        var ctrl = this;

        ctrl.loadGame = loadGame;
        /////////
        ctrl.information = loadGame(ctrl.gameid);

        /////////
        function loadGame (gameid){
            return Game.get({gameId: gameid});
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