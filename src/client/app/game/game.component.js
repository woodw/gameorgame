{
    /* @ngInject */
    function GameController(Game){
        var ctrl = this;

        ctrl.selected = false;
        ctrl.useCategories = false;
        ctrl.information = {};

        ctrl.loadGame = loadGame;
        ctrl.toggleSelected = toggleSelected;
        ctrl.toggleUseCategories = toggleUseCategories;
        /////////
        ctrl.information = loadGame(ctrl.gameid);
        /////////

        function loadGame(gameid){
            return Game.get({gameId: gameid});
        }
        function toggleSelected(element){
            element = element || ctrl;
            switch(true){
                case (ctrl.useCategories && element!== ctrl):
                    element.selected = !element.selected;
                    break;
                case (!ctrl.useCategories && element==ctrl):
                    element.selected = !element.selected;
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