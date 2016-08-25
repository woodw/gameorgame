'use strict';

describe('gameCompare', function(){
    beforeEach(module('gameCompare'));

    describe('GameCompareController', function(){

        var _gamesData = [
            {'id':'379720'},
            {'id':'377160'},
            {'id':'234140'}
        ];
        var underTest, $httpBackend;

        beforeEach(inject(function ($componentController, _$httpBackend_){
            $httpBackend = _$httpBackend_;
            underTest = $componentController('gameCompare');
            underTest.games = _gamesData;
            //mockUtilSvc = Game;

            $httpBackend.expectGET('api/games').respond(_gamesData);
            
        }));

        describe('Game Compare Initialize', function(){
            it('Should retrieve games data ', function() {
                jasmine.addCustomEqualityTester(angular.equals);

                $httpBackend.flush();

                expect(underTest.games).toEqual(_gamesData);
            });
        });
    });
});