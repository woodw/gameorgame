'use strict';

describe('game', function (){
    beforeEach(module('game'));

    describe('GameController', function (){
        //mocking variables
        var underTest, mockGameSvc;
        var mock_data = {
            gameid: '101101',
            gameinfo: {
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

        describe('Initializing the game', function(){

            beforeEach(inject(function ($componentController){

                underTest = $componentController('game', null, {gameid: mock_data.gameid});
            }));

            it('Should expose a gameid', function (){

                expect(underTest.gameid).toBeDefined();
                expect(underTest.gameid).toEqual(mock_data.gameid);
            });

        });

        describe('Populating game data', function(){
            //Mocking AJAX service
            function GameService(){
                return {
                    get: function (){
                        return mock_data.gameinfo;
                    }
                };
            }
            angular.module('mock.core.game', []).factory('Game', GameService);

            beforeEach(module('mock.core.game'));

            beforeEach(inject(function ($componentController, _Game_){
                underTest = $componentController('game', {Game:_Game_}, {gameid: mock_data.gameid});
                mockGameSvc = _Game_;
            }));

            it('Should load game information based on gameid', function (){
                
                underTest.information = underTest.loadGame(mock_data.gameid);

                expect(underTest.information.title).toBeDefined();
                expect(underTest.information.review).toBeDefined();
                expect(underTest.information.categories).toBeDefined();
            });

            it('Should recieve game information from game service', function (){
                spyOn(mockGameSvc, 'get');

                underTest.loadGame(mock_data.gameid);

                expect(mockGameSvc.get).toHaveBeenCalled();
            });

        });

        describe('Selecting the game', function (){
            
            beforeEach(inject(function ($componentController){
                underTest = $componentController('game', null, {gameid: mock_data.gameid});
                spyOn(underTest, 'loadGame').and.returnValue(mock_data.gameinfo);
                underTest.information = underTest.loadGame(mock_data.gameid);
            }));

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
            beforeEach(inject(function ($componentController){
                underTest = $componentController('game', null, {gameid: mock_data.gameid});
                spyOn(underTest, 'loadGame').and.returnValue(mock_data.gameinfo);
                underTest.information = underTest.loadGame(mock_data.gameid);
            }));

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