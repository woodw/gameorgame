'use strict';

describe('game', function (){
    beforeEach(module('game'));

    describe('GameController', function (){
        var bindings = {gameid: '101101'};
        var underTest;

        beforeEach(inject(function ($componentController){
            underTest = $componentController('game', null, bindings);
        }));

        it('Should expose a gameid', function (){

            expect(underTest.gameid).toBeDefined();
            expect(underTest.gameid).toBe(bindings.gameid);
        });    
    });
});
