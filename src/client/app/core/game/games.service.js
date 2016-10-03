{
    /* @ngInject */
    function GamesService(Player){
        
        function Games(){
            this.list = Player.informaiton.games;
        }

        return new Games();
    }

    angular
        .module('core.games')
        .factory('Games', GamesService);

}