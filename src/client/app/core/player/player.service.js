{

	/* @ngInject */
	function PlayerService($resource){
		var server = $resource('player/:playerId');

		function Player(){
			this.information = {};
		}
		Player.prototype.load = function (playerId){
			
			this.information = server.get({playerId: playerId});
			return this.informaiton;
		};

		return new Player();
	}

	angular
		.module('core.player')
  		.service('Player', PlayerService);

}