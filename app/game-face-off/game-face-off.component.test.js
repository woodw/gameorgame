describe('gameFaceOff', function(){
    beforeEach(module('gameFaceOff'));

    describe('GameFaceOffController', function(){
        it('Should Display Doom', inject(function($componentController){
            var ctrl = $componentController('gameFaceOff');

            expect(ctrl.game).toBe('Doom');
        }));
    });
});