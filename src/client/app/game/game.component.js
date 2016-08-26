{
    /* @ngInject */
    function GameController(){
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