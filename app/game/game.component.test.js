describe('game', function(){
    beforeEach(module('game'));

    describe('GameController', function(){
        var $httpBackend, ctrl;
        beforeEach(inject(function($componentController, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('api/games/game.json')
                .respond({title:'Doom',review:'This is a review of Doom. It is awesome and I love it'});
            
            ctrl = $componentController('game');
        }));

        it('Should grab two properties for the game: title and review', function(){
            expect(ctrl.title).toBeUndefined();
            expect(ctrl.review).toBeUndefined();

            $httpBackend.flush();
            expect(ctrl.title).toEqual('Doom');
            expect(ctrl.review).toEqual('This is a review of Doom. It is awesome and I love it');
        });
    });
});