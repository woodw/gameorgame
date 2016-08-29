{
    /* @ngInject */
    function GameController(Game){
        var ctrl = this;

        ctrl.selected = false;
        ctrl.useCategories = false;
        ctrl.information = {};

        ctrl.loadGame = loadGame;
        ctrl.select = select;
        ctrl.toggleUseCategories = toggleUseCategories;
        /////////
        ctrl.information = loadGame(ctrl.gameid);
        /////////

        function loadGame(gameid){
            return Game.get({gameId: gameid});
        }
        function select(element){
            element = element || ctrl;
            switch(true){
                case (ctrl.useCategories && element!== ctrl):
                    element.selected = true;
                    break;
                case (!ctrl.useCategories && element==ctrl):
                    element.selected = true;
                    break;
            }
        }
        function toggleUseCategories(){
            ctrl.useCategories = !ctrl.useCategories;
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