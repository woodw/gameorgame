'use strict';

describe('game', function (){

    beforeEach(module('game'));

    describe('GameController', function (){
        //mocking variables
        var underTest;
        var mockGameSvc;
        var mockData = {
            gameId: '101101',
            gameInfo: {
                title: 'title',
                review: 'review',
                categories: [
                    {title:'gameplay',selected:false},
                    {title:'immersion',selected:false},
                    {title:'performance',selected:false},
                    {title:'sound',selected:false},
                    {title:'story',selected:false},
                    {title:'visuals',selected:false}
                ]
            }
        };

        beforeEach(module(function($provide) {
            $provide.service('Games', function() {
                this.get = jasmine.createSpy('get').and.returnValue(mockData.gameInfo);
            });
        }));

        beforeEach(inject(function ($componentController, Games){

            underTest = $componentController('game', null, {gameId: mockData.gameId});
            mockGameSvc = Games;
        }));

        describe('Initializing the game', function(){

            it('Should expose a gameId', function (){

                expect(underTest.gameId).toBeDefined();
                expect(underTest.gameId).toEqual(mockData.gameId);
            });

            it('Should load game information based on gameid', function (){
                
                underTest.$onInit();

                expect(underTest.informaiton).toBe(mockData.gameInfo);
                expect(mockGameSvc.get).toHaveBeenCalledWith(mockData.gameId);

            });


        });

    });
});