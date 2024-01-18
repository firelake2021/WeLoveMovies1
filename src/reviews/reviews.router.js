const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
// const cors = require("cors");

// TODO: Add your routes here

router
  .route("/:reviewId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);
// router.use(s"/", controller.list).all(methodNotAllowed);

module.exports = router;
