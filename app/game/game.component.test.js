describe('game', function(){
    beforeEach(module('game'));

    describe('GameController', function(){
        it('Should have a id object', inject(function($componentController){
            var ctrl = $componentController('game');

            expect(ctrl.gameid).not.toBeNull();
        }));
        
        it('Should have a title object', inject(function($componentController){
            var ctrl = $componentController('game');

            expect(ctrl.title).toBeDefined();
        }));

        it('Should have a review object', inject(function($componentController){
            var ctrl = $componentController('game');

            expect(ctrl.review).toBeDefined();    
        }));

        it('Should have a rank_pool object', inject(function($componentController){
            var ctrl = $componentController('game');

            expect(ctrl.rankPool).toBeDefined();    
        }));

        it('Should have a rank object with 6 rank categories', inject(function($componentController){
            var ctrl = $componentController('game');

            expect(ctrl.ranks.length).toBe(6);    
        }));

        it('Should have rank total to equal 10', inject(function($componentController){
            var ctrl = $componentController('game');
            var sumCallback = ( pre, cur ) =>  pre + cur.points;

            var sum = ctrl.ranks.reduce(sumCallback,0) + ctrl.rankPool;

            expect(sum).toBe(10);    
        }));
    });
});