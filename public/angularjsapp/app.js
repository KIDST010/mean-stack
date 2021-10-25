angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "angularjsapp/games/games.html",
        controller: "GamesController",
        controllerAs: "vm"
    })
        .when("/:gameId", {
            templateUrl: "angularjsapp/game/game.html",
            controller: "GameController",
            controllerAs: "vm"
        })
        .when("/delete/:Id", {
            templateUrl: "angularjsapp/game-delete/game-delete.html",
            controller: "gameDelete",
            controllerAs: "vm"
        }).when("/register", {
            templateUrl: "angularjsapp/register/register.html",
            controller: "RegisterControler",
            controllerAs: "vm",
            access: { restricted: false }
        })
        .when("/update/:id", {
            templateUrl: "angularjsapp/game-update/game-update.html",
            controller: "gameUpdate",
            controllerAs: "vm"
        })
        .otherwise({
            redirectTo: "/"
        })

}

