describe('gameFaceOff', function(){
    beforeEach(module('gameFaceOff'));

    describe('GameFaceOffController', function(){
        it('Should contain two games', inject(function($componentController){
            var ctrl = $componentController('gameFaceOff');

            expect(ctrl.games.length).toBe(2);
        }));
    });
});