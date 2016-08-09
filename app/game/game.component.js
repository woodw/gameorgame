angular
    .module('game')
    .component('game', {
        templateUrl: 'game/game.template.html',
        controller: ['$http', 
            function GameController($http){
                
                $http.get('api/games/game.json').then((response) => {
                    this.title = response.data.title;
                    this.review = response.data.review;
                });
            }
        ],
        bindings: {
            gameid: '='
        }
    });