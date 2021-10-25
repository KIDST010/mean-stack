const mongoose = require("mongoose");

const Game = mongoose.model("Game");

module.exports.getOneGamePublisher = function (req, res) {
    const gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        res.status(400).json({ "message": "Game with id \"" + gameId + "\" is not valid" })
    }
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        if (err) {
            res.status(500).json(err);
            return;
        }
        else {
            if (game)
                res.status(200).json(game.publisher);
            else
                res.status(404).json({ "message": "Game with id \"" + gameId + "\" not available" });
            return;
        }
    });
}

const _addPublisher = function (req, res, game) {
    game.publisher = { name: req.body.name, country: req.body.country };

    game.save(function (err, updatedGame) {

        if (err) {
            res.status(500).json(err);
            return;
        }
        res.status(201).json(updatedGame.publisher);
    });
}
module.exports.publisherAdd = function (req, res) {
    const gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        res.status(400).json({ "message": "Game with id \"" + gameId + "\" is not valid" })
    }
    Game.findById(gameId).select("publisher").exec(function (err, game) {

        if (err) {
            res.status(500).json(err);
            return;
        }
        else if (!game) {
            res.status(400).json({ "message": "Game with id \"" + gameId + "\" is not valid" })
        }
        else if (game) {
            _addPublisher(req, res, game);

        }
    });

};

const _updatePublisher = function (req, res, game) {
    game.publisher = { name: req.body.name, country: req.body.country };
    game.save(function (err, updateGame) {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.status(204).json(game);
    });
}
module.exports.publisherUpdate = function (req, res) {
    const gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        res.status(400).json({ "message": "Game with id \"" + gameId + "\" is not valid" })
    }
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 204 };
        if (err) {
            res.status(500).json(err);
            return;
        }
        else if (!game) {
            res.status(400).json({ "message": "Game with id \"" + gameId + "\" is not valid" })
        }
        else if (game) {
            _updatePublisher(req, res, game);

        }
    });
};

const _deletePublisher = function (req, res, game) {
    game.publisher = null;
    game.save(function (err, game) {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.status(204).json(err);
    });
}
module.exports.publisherDelete = function (req, res) {
    const gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        res.status(400).json({ "message": "Game with id \"" + gameId + "\" is not valid" })
    }
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        if (err) {
            res.status(500).json(err);
            return;
        }

        else if (game) {
            _deletePublisher(req, res, game);

        }
    });
}






