angular.module("meanGames").factory("GameFactory", GameFactory);

function GameFactory($http) {
    return {
        getAll: getAll,
        getOne: getOne,
        search: search,
        deleteOne: deleteOne,
        addOne: addOne,
        updateOne:updateOne
    }

    function getAll() {
        return $http.get("/games").then(complete).catch(failed);
    }
    function search(lng, lat) {
        return $http.get("/games/?lng=" + lng + "&lat=" + lat).then(complete).catch(failed);
    }
    function getOne(gameId) {
        return $http.get("/games/" + gameId).then(complete).catch(failed);
    }
    function addOne(game) {

        return $http.post("/games", game).then(complete).catch(failed);
    }
    function deleteOne(gameId) {
        return $http.delete("/games/" + gameId).then(complete).catch(failed);
    }
    function updateOne(id, game) {
        console.log("id is", id);
        return $http.put("/games/" + id, game).then(complete).catch(failed);
    }
    function complete(response) {
        return response.data;
    }
    function failed(error) {
        return error.StatusText;
    }
}