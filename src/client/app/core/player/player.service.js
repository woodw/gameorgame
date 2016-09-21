'use strict';

function PlayerFactory(SteamAPI){
	var player;

	function Player(){
	}
	Player.prototype.loadPlayer = function(playerId){
		return SteamAPI.getPlayer({playerId: playerId}).promise.then(function (response){
				player = response;
		});
	};

	Player.prototype.getPlayer = function(){
		return player;
	};

	return new Player();
}

angular
  .module('core.player')
  .service('Player', PlayerFactory);