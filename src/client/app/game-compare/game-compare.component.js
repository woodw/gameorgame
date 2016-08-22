{

    /* @ngInject */
    function GameCompareController(Game){
        var ctrl = this;
        this.games = Game.query();
        this.test = 'what';
        this.orderProp = 'age';
    }

    //Angular Blurb
    angular
    .module('gameCompare')
    .component('gameCompare', {
        templateUrl: 'app/game-compare/game-compare.template.html',
        controller: GameCompareController
    });

}