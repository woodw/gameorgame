{

function GameService($resource){
    return $resource('api/games/:gameId', {}, {
        query: {
            method: 'GET',
            params: {gameId: ''},
            isArray: true
        }
    });
}

angular
    .module('core.game')
    .factory('Game', ['$resource', GameService]);

}