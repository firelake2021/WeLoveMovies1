const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

router
  .use("/:movieId/theaters", controller.showingInTheaters)
  .all(methodNotAllowed);
router.route("/", controller.list).get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.listMovieReviews)
  .all(methodNotAllowed);
module.exports = router;
