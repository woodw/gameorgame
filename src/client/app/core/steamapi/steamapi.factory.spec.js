'use strict';

describe('SteamAPI', function (){
    var $httpBackend;
    var underTest;
    var mockData = {
        playerId:'76561198046490656',
        playerSummary:{summary:'01234'},
        gameList:{summary:'01234'}
    };

    beforeEach(function (){
        jasmine.addCustomEqualityTester(angular.equals);
    });

    beforeEach(module('core.steamapi'));

    describe('Player Summary', function (){
        beforeEach(inject(function (_$httpBackend_, _SteamAPI_){
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=0190A77F9FB8607560F54173607694EC&steamids=76561198046490656').respond(mockData.playerSummary);

            underTest = _SteamAPI_;
        }));

        afterEach(function (){
            $httpBackend.verifyNoOutstandingExpectation(); 
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('Should retrieve player summary data when requested', function (){
            var player = underTest.getPlayer({playerId:mockData.playerId});
            
            expect(player).toEqual({});

            $httpBackend.flush();

            expect(player).toEqual(mockData.playerSummary);
        });
    });

    describe('Game List', function (){
        beforeEach(inject(function (_$httpBackend_, _SteamAPI_){
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET('https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=0190A77F9FB8607560F54173607694EC&steamid=76561198046490656').respond(mockData.gameList);

            underTest = _SteamAPI_;
        }));

        afterEach(function (){
            $httpBackend.verifyNoOutstandingExpectation(); 
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('Should retrieve list of games for player when requested', function (){
            var games = underTest.getGames({playerId:mockData.playerId});
            
            expect(games).toEqual({});

            $httpBackend.flush();

            expect(games).toEqual(mockData.gameList);
        });
    });
});