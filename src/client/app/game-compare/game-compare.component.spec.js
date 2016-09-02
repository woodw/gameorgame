'use strict';

describe('gameCompare', function(){
    beforeEach(module('gameCompare'));

    describe('GameCompareController', function(){

        var underTest, mockGameSvc;
        var mock_data = {
            games: [
                {'id':'379720'},
                {'id':'377160'}
            ]
        };

        describe('Populate games data', function (){
            //Mocking AJAX service
            function GameService(){
                return {
                    query: function (){
                        return mock_data.games;
                    }
                };
            }
            angular.module('mock.game.gameCompare', []).factory('Game', GameService);

            beforeEach(module('mock.game.gameCompare'));

            beforeEach(inject(function ($componentController, _Game_){
                underTest = $componentController('gameCompare', {Game:_Game_}, {});
                mockGameSvc = _Game_;
            }));

            it('Should initially load two games', function (){

                underTest.games = underTest.loadGames();
                
                expect(underTest.games.length).toEqual(2);
            });

            it('Should recieve games from game service', function (){
                spyOn(mockGameSvc, 'query');

                underTest.loadGames();

                expect(mockGameSvc.query).toHaveBeenCalled();
            });

        });
    });
});