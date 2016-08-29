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
        ctrl.information.categories = ctrl.information.categories || [];
        /////////

        function loadGame(gameid){
            return Game.get({gameId: gameid});
        }
        function toggleSelected($event, element){
            console.log($event,element);
            $event.stopPropagation();
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
        function toggleUseCategories($event){
            $event.stopPropagation();
            ctrl.useCategories = !ctrl.useCategories;
            ctrl.selected = false;
            ctrl.information.categories.forEach(function (item){item.selected = false;}); 
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