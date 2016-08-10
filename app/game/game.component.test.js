describe('game', function (){
    beforeEach(module('game'));

    const _gameid = '8675309';
    const _title = 'Generic Game';
    const _review = 'Beep boop beep I am a robit.';

    describe('GameController', function (){
        
        describe('game init',function (){
            var $httpBackend, underTest;
            beforeEach(inject(function($componentController, _$httpBackend_) {
                underTest = $componentController('game');
                underTest.gameid = _gameid;
                
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('api/games/'+underTest.gameid)
                    .respond({title:_title,review:_review});
            }));

            it('Should call getGameObject on init', function(){
                spyOn(underTest, 'getGameObject');

                underTest.$onInit();

                expect(underTest.getGameObject).toHaveBeenCalled();
            });

            it('Should call getGameObject for two properties', function(){
                expect(underTest.title).toBeUndefined();
                expect(underTest.review).toBeUndefined();

                underTest.getGameObject();

                $httpBackend.flush();
                expect(underTest.title).toEqual(_title);
                expect(underTest.review).toEqual(_review);
            });
        });
    
    });
});