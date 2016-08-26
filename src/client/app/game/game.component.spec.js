'use strict';

describe('game', function (){
    beforeEach(module('game'));

    describe('GameController', function (){
        var underTest;
        var bindings = {gameid: '101101'};

        beforeEach(inject(function ($componentController){
            underTest = $componentController('game', null, bindings);
        }));

        it('Should expose a gameid', function (){

            expect(underTest.gameid).toBeDefined();
            expect(underTest.gameid).toEqual(bindings.gameid);
        });    

        it('Should load game information based on gameid', function (){
            
            underTest.loadGame(bindings.gameid);

            expect(underTest.information.title).toBeDefined();
            expect(underTest.information.review).toBeDefined();
            expect(underTest.information.categories).toBeDefined();
        });
        
    });
});
