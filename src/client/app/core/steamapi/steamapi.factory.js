{
    /* @ngInject */
    function SteamAPIService($resource){

        return $resource('', {steamKey: '0190A77F9FB8607560F54173607694EC'}, {
            getPlayer: {
                method: 'GET',
                url: 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=:steamKey&steamids=:playerId',
            },
            getGames: {
                method: 'GET',
                url: 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=:steamKey&steamid=:playerId',
            }

        });

    }

    angular
        .module('core.steamapi')
        .factory('SteamAPI', SteamAPIService);

}