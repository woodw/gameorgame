angular
    .module('game')
    .component('game', {
        templateUrl: 'game/game.template.html',
        controller: function GameController(){
            this.title = 'Doom';
            this.review = 'This is a review of Doom. I like the game because it is a lot of fun';
            this.rankPool = 10;
            this.ranks = [
                {category:'Graphics',points:0},
                {category:'Gamplay',points:0},
                {category:'Story',points:0},
                {category:'Immersion',points:0},
                {category:'Sound',points:0},
                {category:'Performance',points:0}
            ];
        },
        bindings: {
            gameid: '='
        }
    });