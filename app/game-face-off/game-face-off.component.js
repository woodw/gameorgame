angular
    .module('gameFaceOff')
    .component('gameFaceOff', {
        templateUrl: 'game-face-off/game-face-off.template.html',
        controller: function GameFaceOffController(){
            this.game = 'Doom';
        }
    });