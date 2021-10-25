
const express = require("express");
const app = express();
const router = express.Router();
const gameController = require("../controller/gameController");
const publisherController = require("../controller/publisherController")
const reviewController = require("../controller/reviewController")
const controllerUsers=require("../controller/users.controller")

router.route("/games").get(gameController.getAllGames);
router.route("/games/:gameId").get(gameController.getOneGame);
router.route("/games").post(gameController.addOneGame);
router.route("/games/:gameId").delete(gameController.deleteByGameId);
router.route("/games/:gameId").put(gameController.updateByGameId);
router.route("/games/:gameId/publisher")
    .get(publisherController.getOneGamePublisher)
    .post(publisherController.publisherAdd)
    .put(publisherController.publisherUpdate)
    .delete(publisherController.publisherDelete);

router.route("/games/:gameId/reviews")
    .post(reviewController.addReview)
    .get(reviewController.getReviews)

router.route("/games/:gameId/reviews/:reviewId")
    .get(reviewController.getOneReview)
    .put(reviewController.updateReview)
    .delete(reviewController.deleteReview)
    router.route("/users/register").post(controllerUsers.register);

module.exports = router;