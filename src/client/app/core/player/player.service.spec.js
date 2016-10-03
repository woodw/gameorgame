{
    describe('Player', function() {
        var $httpBackend;
        var underTest;
        var mockData = {
            playerId: '1234',
            playerSummary:{foo: 'bar'}
        };

        // Add a custom equality tester before each test
        beforeEach(function() {
            jasmine.addCustomEqualityTester(angular.equals);
        });

        // Load the module that contains the `Phone` service before each test
        beforeEach(module('core.player'));

        // Instantiate the service and "train" `$httpBackend` before each test
        beforeEach(inject(function(_$httpBackend_, _Player_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('player/'+mockData.playerId).respond(mockData.playerSummary);

            underTest = _Player_;
        }));

        // Verify that there are no outstanding expectations or requests after each test
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('It should get player information from the server', function() {
            
            underTest.load(mockData.playerId);
            expect(underTest.information).toEqual({});
            $httpBackend.flush();
            
            expect(underTest.information).toEqual(mockData.playerSummary);
        });

    });
}