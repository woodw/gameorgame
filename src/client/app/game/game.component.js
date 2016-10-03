{
    /* @ngInject */
    function GameController(Games){
        var ctrl = this;

        ctrl.$onInit = init;

        function init(){

            this.informaiton = Games.get(this.gameId);
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