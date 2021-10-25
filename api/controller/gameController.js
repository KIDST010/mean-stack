


const mongoose = require("mongoose");

const Game = mongoose.model("Game");
const runGeoSearch = function (req, res) {

    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const maxdist = parseFloat(req.query.maxdist) || 1000;
    const mindist = parseFloat(req.query.mindist) || 0;
    console.log("lng", lng);
    console.log("lat", lat);
    const query = {
        "publisher.location": {
            $near: {
                $geometry: {
                    type: "point",
                    coordinates: [lng, lat]
                },
                $maxDistance: maxdist,
                // $minDistance: mindist
            }
        }
    }


    Game.find(query).exec(function (err, games) {
        console.log("lets see", games);
        res.status(200).json(games);
    })
}
module.exports.getAllGames = function (req, res) {
    console.log("get all games requested");

    let offset = 0;
    let count = 6;
    if (req.query && req.query.lng && req.query.lat) {
        runGeoSearch(req, res);
        return;
    }
    else {
        if (req.query && req.query.offset) {
            offset = parseInt(req.query.offset);
            console.log("offset", offset);
        }
        if (req.query
            && req.query.count) {
            count = parseInt(req.query.count);
            console.log("count", count);


        }
        if (isNaN(offset) || isNaN(count)) {
            console.log("both should be numbers");
            res.status(400).json({ "message": " offset and Count should be numbers" })
            return
        }


        Game.find().exec(function (err, games) {

            if (err) {
                res.status(500).json(err);
                return;
            }
            else {
                res.status(200).json(games);
            }


        });
    }

}
module.exports.getOneGame = function (req, res) {
    const gameId = req.params.gameId;

    if (!mongoose.isValidObjectId(gameId)) {
        res.status(400).json({ "message": "Game with id \"" + gameId + "\" is not valid" })
    }



    Game.findById(gameId).exec(function (err, game) {

        if (err) {
            res.status(500).json(err);
            return;
        }
        else {
            if (game)
                res.status(200).json(game);
            else
                res.status(404).json({ "message": "Game with id \"" + gameId + "\" not available" })
        }


    });
}


module.exports.addOneGame = function (req, res) {
    const newgame = {
        title: req.body.title,
        year: parseInt(req.body.year),
        price: parseFloat(req.body.price),
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers), rate: parseFloat(req.body.rate)
    };
    Game.create(newgame, function (err, response) {
        if (err) {
            res.status(500).json(err);
            return;
        }
        else {
            res.status(201).json(response);
        }
    })
};

module.exports.deleteByGameId = function (req, res) {
    const gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        res.status(400).json({ "message": "Game with id \"" + gameId + "\" is not valid" })
    }
    Game.findByIdAndDelete(gameId).exec(function (err, game) {
        if (err) {
            res.status(500).json(err);
            return;
        }
        else {
            if (game)
                res.status(200).json(game);
            else
                res.status(404).json({ "message": "Game with id \"" + gameId + "\" not available" })
        }


    });
}

module.exports.updateByGameId = function (req, res) {
    const gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        res.status(400).json({ "message": "Game with id \"" + gameId + "\" is not valid" })
    }
    Game.findById(gameId).exec(function (err, game) {
        if (err) {
            res.status(500).json(err);
            return;
        }

        else {
            game.title = req.body.title,
                game.year = parseInt(req.body.year),
                game.price = parseFloat(req.body.price),
                game.minPlayers = parseInt(req.body.minPlayers),
                game.maxPlayers = parseInt(req.body.maxPlayers),
                game.rate = parseFloat(req.body.rate)
            game.save(function (err, updatednew) {
                if (game)
                    res.status(200).json(updatednew);

            });
        }

    });
}

