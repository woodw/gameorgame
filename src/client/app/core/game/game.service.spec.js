'use strict';

describe('Game', function (){
    var $httpBackend;
    var Game;
    var gamesData = [{'level':3,'id':'379720','title':'Doom','review':'Doom review'},
                    {'level':3,'id':'379720','title':'Doom','review':'Doom review'},
                    {'level':3,'id':'379720','title':'Doom','review':'Doom review'}];

    beforeEach(function (){
        jasmine.addCustomEqualityTester(angular.equals);
    });

    beforeEach(module('core.game'));

    beforeEach(inject(function (_$httpBackend_, _Game_){
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET('api/games').respond(gamesData);

        Game = _Game_;
    }));

    afterEach(function (){
        $httpBackend.verifyNoOutstandingExpectation(); 
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should retrieve game data', function (){
        var games = Game.query();

        expect(games).toEqual([]);

        $httpBackend.flush();

        expect(games).toEqual(gamesData);
    });

});