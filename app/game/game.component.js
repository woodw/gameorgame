//Controller
function GameController($http){
    var ctrl = this;   
    
    ctrl.$onInit = function (){
        $http.get('api/games/'+ctrl.gameid).then((response) => {
            ctrl.title = response.data.title;
            ctrl.review = response.data.review;
        });
    }     
    
}

//Angular Blurb
angular
.module('game')
.component('game', {
    templateUrl: 'game/game.template.html',
    controller: GameController,
    bindings: {
        gameid: '<'
    }
});