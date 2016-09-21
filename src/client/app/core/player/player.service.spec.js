describe('Player', function () {
    var mockSteamAPI;
    var underTest;
    var deferred;
    var $rootScope;

    var mockData = {
        playerId:'01234',
        playerSummary: {foo:'bar'}
    };

    beforeEach(module('core.player'));

    beforeEach(inject(function(_Player_, _SteamAPI_, _$q_, _$rootScope_) {
        deferred = _$q_.defer();
        underTest = _Player_;
        mockSteamAPI = _SteamAPI_;
        $rootScope = _$rootScope_;

        mockSteamAPI.getPlayer = jasmine.createSpy('getPlayer').and.returnValue(deferred);
    }));

    it('should simulate promise', function() {

        underTest.loadPlayer(mockData.playerId);        
        deferred.resolve(mockData.playerSummary);
        $rootScope.$apply();

        expect(underTest.getPlayer()).toEqual(mockData.playerSummary);
        expect(mockSteamAPI.getPlayer).toHaveBeenCalled();
    });


    

});
