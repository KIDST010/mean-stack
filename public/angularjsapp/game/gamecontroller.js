angular.module("meanGames").controller("GameController", GameController);

function GameController($routeParams, GameFactory) {
    const vm = this;
    const gameId = $routeParams.gameId;

    GameFactory.getOne(gameId).then(function (response) {
        vm.game = response;
    });
}