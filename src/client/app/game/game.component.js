{
    /* @ngInject */
    function GameController(){
        var ctrl = this;

        ctrl.loadGame = loadGame;
        /////////
        ctrl.information = loadGame(ctrl.gameid);

        /////////
        function loadGame (gameid){
            ctrl.gameid = gameid;
            return {
                title: 'title',
                review: 'review',
                categories: []
            };
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