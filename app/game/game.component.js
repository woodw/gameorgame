//Controller
function GameController($http){
    var ctrl = this;   
    
    ctrl.categories = [
        'gameplay',
        'immersion',
        'performance',
        'sound',
        'story',
        'visuals'
    ];

    ctrl.$onInit = function (){
        this.getGameObject();
    };   

    ctrl.getGameObject = function (){
        $http.get('api/games/'+ctrl.gameid).then((response) => {
            ctrl.title = response.data.title;
            ctrl.review = response.data.review;
        });
    };

    ctrl.select = function (className){
        
    };
    
}

//Angular Blurb
angular
.module('game')
.component('game', {
    templateUrl: 'game/game.template.html',
    controller: GameController,
    bindings: {
        gameid: '@'
    }
});