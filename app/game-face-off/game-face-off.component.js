//Object
function GameFaceOffController(){
    this.ctrl = this;
    
    this.gone = '379720';
    this.gtwo = '234140';
}

//Angular Blurb
angular
.module('gameFaceOff')
.component('gameFaceOff', {
    templateUrl: 'game-face-off/game-face-off.template.html',
    controller: GameFaceOffController
});