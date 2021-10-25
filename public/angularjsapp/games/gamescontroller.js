angular.module("meanGames").controller("GamesController", GamesController);
function GamesController(GameFactory, $window) {
    const vm = this;


    GameFactory.getAll().then(function (response) {
        vm.games = response;
    })


    vm.search = () => {

        if (vm.lng && vm.lat) {
            console.log("lang", vm.lng);
            console.log("lat", vm.lat);
            console.log("dist", vm.dist)
            lng = parseFloat(vm.lng);
            lat = parseFloat(vm.lat);
            dist = parseFloat(vm.dist);


            GameFactory.search(lng, lat).then(function (response) {
                vm.games = response;
                console.log("response is", response);
            });

        }

    }

    vm.addgame = function (form) {
        const post = {
            title: vm.title,
            maxPlayers: vm.maxPlayers,
            minPlayers: vm.minPlayers,
            year: vm.year,
            price: vm.price,
            minAge: vm.minAge,
            rate: vm.rate
        }

        if (form.$valid) {


            GameFactory.addOne(post).then(function (response) {
                console.log("response after post", response)

                $window.location.reload();
            })
        }

    }

}

