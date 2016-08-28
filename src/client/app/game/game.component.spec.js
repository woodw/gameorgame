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
                categories: []
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
                        return {title: 'title',review: 'review',categories: []};
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
                
                underTest.loadGame(mock_data.gameid);

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
            beforeEach(function (){
                spyOn(underTest, 'loadGame').and.returnValue(mock_data.gameinfo);
            });

            it('should mark game as selected', function (){

                expect(underTest.selected).toBeFalsy();

                underTest.select();

                expect(underTest.selected).toBeTruthy();
            });
        });

        describe('Choosing basic selection vs detail selection', function (){
            beforeEach(function (){
                spyOn(underTest, 'loadGame').and.returnValue(mock_data.gameinfo);
            });

            it('should switch between "basic" and "detail" selection types', function (){

                expect(underTest.mode).toEqual('basic');

                underTest.setMode('detail');

                expect(underTest.mode).toEqual('detail');
            });
        });
    });
});