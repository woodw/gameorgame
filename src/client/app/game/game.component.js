{
    /* @ngInject */
    function GameController(Game){
        var ctrl = this;

        ctrl.selected = false;
        ctrl.mode = 'basic';
        ctrl.information = {};

        ctrl.loadGame = loadGame;
        ctrl.select = select;
        ctrl.setMode = setMode;
        /////////
        ctrl.information = loadGame(ctrl.gameid);
        /////////

        function loadGame(gameid){
            return Game.get({gameId: gameid});
        }
        function select(){
            ctrl.selected = true;
        }
        function setMode(modeType){
            switch(modeType){
                case 'detail':
                    ctrl.mode = 'detail';
                    break;
                default:
                    ctrl.mode = 'basic';
                    break;
            }
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