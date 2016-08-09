describe('game', function(){
    beforeEach(module('game'));

    describe('GameController', function(){
        var $httpBackend, ctrl;
        beforeEach(inject(function($componentController, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('api/games/*')
                .respond({title:'Generic Game',review:'Beep boop beep I am a robit.'});
            
            ctrl = $componentController('game');
        }));

        it('Should grab two properties for the game: title and review', function(){
            expect(ctrl.title).toBeUndefined();
            expect(ctrl.review).toBeUndefined();

            $httpBackend.flush();
            expect(ctrl.title).toEqual('Generic Game');
            expect(ctrl.review).toEqual('Beep boop beep I am a robit.');
        });
    });
});