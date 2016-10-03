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

                expect(underTest.information).toBe(mockData.gameInfo);
                expect(mockGameSvc.get).toHaveBeenCalledWith(mockData.gameId);

            });


        });

        describe('Selecting the game', function (){
            
            beforeEach(function (){
                underTest.$onInit();
            });

            it('should be able to select the game', function (){
                
                underTest.toggleSelected(new Event);
                
                expect(underTest.selected).toBeTruthy();
            });

            it('should be able to select game by category', function (){

                underTest.toggleUseCategories(new Event);
                underTest.toggleSelected(new Event, underTest.information.categories[0]);

                expect(underTest.information.categories[0].selected).toBeTruthy();
            });

            it('should not mark game as selected while mode is detail', function (){

                underTest.toggleUseCategories(new Event);
                underTest.toggleSelected(new Event);

                expect(underTest.selected).toBeFalsy();
            });

            it('should select game if majority of categories are selected', function (){

                underTest.toggleUseCategories(new Event);
                underTest.toggleSelected(new Event, underTest.information.categories[0]);
                underTest.toggleSelected(new Event, underTest.information.categories[1]);
                underTest.toggleSelected(new Event, underTest.information.categories[2]);

                expect(underTest.selected).toBeFalsy();

                underTest.toggleSelected(new Event, underTest.information.categories[3]);

                expect(underTest.selected).toBeTruthy();
            });

        });

        describe('Choosing to use or not use categories', function (){
            beforeEach(function (){
                underTest.$onInit();
            });

            it('should switch between using and not using categories for selection', function (){

                underTest.toggleUseCategories(new Event);

                expect(underTest.useCategories).toBeTruthy();
            });

            it('should reset selection when switching between using or not using categories', function (){

                underTest.toggleSelected(new Event);
                underTest.toggleUseCategories(new Event);

                expect(underTest.selected).toBeFalsy();
            });

        });

    });
});