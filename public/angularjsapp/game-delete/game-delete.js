angular.module("meanGames").controller("gameDelete", gameDelete);

function gameDelete(GameFactory, $routeParams, $window) {
    const vm = this;
    const Id = $routeParams.Id;
    vm.message = "";
   
    GameFactory.getOne(Id).then(function (response) {

        vm.game = response;
    })


    vm.delete = function (id) {

        GameFactory.deleteOne(id).then(function (response) {

            vm.deleted = true;
           
            $window.location.href = "/#!/";


        });
    }


}
