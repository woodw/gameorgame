{

    //Object
    function GameCompareController(Game){
        this.ctrl = this;
        ctrl.games = Game.query();
    }

    //Angular Blurb
    angular
    .module('gameCompare')
    .component('gameCompare', {
        templateUrl: 'app/game-compare/game-compare.template.html',
        controller: GameCompareController
    });

}