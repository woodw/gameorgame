'use strict';

function PlayerFactory(SteamAPI){
	var player;

	function Player(){
	}
	Player.prototype.loadPlayer = function (playerId){
		return SteamAPI.getPlayer({playerId: playerId}).promise.then(function (response){
				player = response;
		});
	};
	Player.prototype.loadGames = function (playerId){
		return SteamAPI.getGames({playerId: playerId}).promise.then(function (response){
				player = player || {};
				player.games = response;
		});
	};
	Player.prototype.getPlayer = function (){
		return player;
	};
	Player.prototype.getGames = function (){
		return player.games;
	};


	return new Player();
}

angular
  .module('core.player')
  .service('Player', PlayerFactory);