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
        function select(element){
            element = element || ctrl;
            switch(true){
                case (ctrl.mode=='detail' && element!== ctrl):
                    element.selected = true;
                    break;
                case (ctrl.mode=='basic' && element==ctrl):
                    element.selected = true;
                    break;
            }
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