'use strict';

describe('game', function (){
    beforeEach(module('game'));

    describe('GameController', function (){

        var _gameid = '8675309';
        var _title = 'Generic Game';
        var _review = 'Beep boop beep I am a robit.';
        var gameData = {
                level:3,
                id:"379720",
                title:'Doom',
                review:'This game is the best!',
                categories:[
                    {title:'gameplay',level:2},
                    {title:'immersion',level:3},
                    {title:'performance',level:1},
                    {title:'sound',level:3},
                    {title:'story',level:3},
                    {title:'visuals',level:1}
                ]
            };

        var mockUtilSvc, underTest, $httpBackend;

        //model creation to make a new factory in lower scope to override Angular factory. Mocking
        //angular.model(function($provide){
        //    $provide.factory('Game', function (){
        //        this.get = jasmine.createSpy('get').andCallFake(function (){
        //            return 1;
        //        });
        //    });
        //});

        beforeEach(inject(function ($componentController, _$httpBackend_, Game){
            $httpBackend = _$httpBackend_;
            underTest = $componentController('game');
            underTest.gameid = _gameid;
            //mockUtilSvc = Game;

            $httpBackend.expectGET('api/games/'+_gameid).respond(gameData)
            
        }));

        describe('Game Initialize',function (){

            it('Should call getGameObject oninit', function (){
                spyOn(underTest, 'getGameObject');

                underTest.$onInit();

                expect(underTest.getGameObject).toHaveBeenCalled();
            });

            it('Should get game details', function() {
                jasmine.addCustomEqualityTester(angular.equals);

                expect(underTest.game).toEqual({});

                underTest.getGameObject();
                $httpBackend.flush();

                expect(underTest.game).toEqual(gameData);
            });
        });
    
    });
});