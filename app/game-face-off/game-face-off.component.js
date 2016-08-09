//Object
function GameFaceOffController(){
    this.ctrl = this;
    this.games = ['379720','377160'];
}

//Angular Blurb
angular
.module('gameFaceOff')
.component('gameFaceOff', {
    templateUrl: 'game-face-off/game-face-off.template.html',
    controller: GameFaceOffController
});