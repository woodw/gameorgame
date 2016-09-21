{

	/* @ngInject */
	function PlayerService($resource){
		var server = $resource('player/:playerId');

		function Player(){
			this.player = {};
		}
		Player.prototype.load = function (playerId){
			console.log(this.player);
			this.player = server.get({playerId: playerId});
			return this.player;
		};

		return new Player();
	}

	angular
		.module('core.player')
  		.service('Player', PlayerService);

}