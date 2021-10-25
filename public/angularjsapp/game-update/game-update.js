angular.module("meanGames").controller("gameUpdate", gameUpdate);
function gameUpdate($routeParams, GameFactory, $window) {
    const vm = this;
    const id = $routeParams.id;
    GameFactory.getOne(id).then(function (response) {
        vm.game = response;

    });


    vm.updategame = function (form) {

        const post = {
            title: vm.title,
            maxPlayers: vm.maxPlayers,
            minPlayers: vm.minPlayers,
            year: vm.year,
            price: vm.price,
            minAge: vm.minAge,
            rate: vm.rate
        }
        console.log("post ", post);
        if (form.$valid) {


            GameFactory.updateOne(id, post).then(function (response) {
                console.log("form work", response);
                $window.location.reload();
            })
        }
        else {
            console.log("form not work", post);
        }
    }
}