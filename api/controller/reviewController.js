const mongoose = require("mongoose");

const Game = mongoose.model("Game");

module.exports.addReview = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        if (err) {
            console.log("error old adding ");
            res.status(500).json(err);
        }
        else if (game) {
            let sizeOfReview = game.reviews.length;
            console.log("length", game.reviews[0])
            if (sizeOfReview == 1 && game.reviews[0] === "") {
                sizeOfReview = 0;
            }

            game.reviews[sizeOfReview] = {
                name: req.body.name,
                reviews: req.body.reviews,

            }

            game.save(function (err, game) {
                if (err) {
                    console.log("error adding ");
                    res.status(500).json(err);
                }
                else if (game) {
                    console.log("successfully added game ");
                    res.status(200).json(game);
                }
                else {
                    console.log("can not find game");
                    res.status(404).json({ "can not find game": true });
                }
            })
        }
    })
}

module.exports.getReviews = function (req, res) {
    const gameId = req.params.gameId;


    Game.findById(gameId).select("reviews").exec(function (err, game) {
        if (err) {
            console.log("error found while fetching");
            res.status(500).json(err);
        }
        else if (game) {
            res.status(200).json(game.reviews)
        }
        else if (!game) {
            console.log("review not found");
            res.status(404).json();
        }
    });
}


module.exports.getOneReview = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    Game.findById(gameId).exec(function (err, game) {
        if (err) {
            console.log("error found while fetching");
            res.status(500).json(err);
        }
        else if (game) {
            const retrievedreview = game.reviews.filter(r => r._id == reviewId);
            res.status(200).json(retrievedreview)
        }
        else if (!game) {
            console.log("review not found");
            res.status(404).json();
        }
    })
}

module.exports.updateReview = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        if (err) {
            console.log("error old adding ");
            res.status(500).json(err);
        }
        else if (game) {


            for (let i = 0; i < game.reviews.length; i++) {
                if (game.reviews[i]._id == reviewId) {
                    game.reviews[i] = {
                        name: req.body.name,
                        reviews: req.body.reviews,
                        date: req.body.date

                    }
                }

            }

            game.save(function (err, game) {
                if (err) {
                    console.log("error adding ");
                    res.status(500).json(err);
                }
                else if (game) {
                    console.log("successfully updated review ");
                    res.status(200).json(game);
                }
                else {
                    console.log("can not find game");
                    res.status(404).json({ "can not find game": true });
                }
            })
        }
    })

}



module.exports.deleteReview = function (req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        if (err) {
            console.log("error old adding ");
            res.status(500).json(err);
        }
        else if (game) {


            for (let i = 0; i < game.reviews.length; i++) {
                if (game.reviews[i]._id == reviewId) {
                    game.reviews[i].remove();
                }

            }

            game.save(function (err, game) {
                if (err) {
                    console.log("error adding ");
                    res.status(500).json(err);
                }
                else if (game) {
                    console.log("successfully deleted review ");
                    res.status(200).json(game);
                }
                else {
                    console.log("can not find game");
                    res.status(404).json({ "can not find game": true });
                }
            })
        }
    })

}