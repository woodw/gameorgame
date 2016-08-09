angular
    .module('gameFaceOff')
    .component('gameFaceOff', {
        templateUrl: 'game-face-off/game-face-off.template.html',
        controller: function GameFaceOffController(){
            this.games = ['Doom','Fall Out 4'];
        }
    });