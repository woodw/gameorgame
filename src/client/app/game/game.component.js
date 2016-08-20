{
    /* @ngInject */
    function GameController($http, Game){
        var ctrl = this;   
        
        ctrl.game = {};

        ctrl.$onInit = function (){
            ctrl.getGameObject();
        };   

        ctrl.getGameObject = function (){
            ctrl.game = Game.get({gameId: ctrl.gameid});
        };
        
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