const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
// const cors = require("cors");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");
// TODO: Add your routes here

router
  .use("/:movieId/reviews", controller.movieExists, reviewsRouter)
  .all(methodNotAllowed);

router
  .use("/:movieId/theaters", controller.showingInTheaters)
  .all(methodNotAllowed);
router.route("/", controller.list).get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

module.exports = router;
