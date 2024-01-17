const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

// TODO: Add your routes here

router
  .route("/:reviewId")
  .get(cors(), controller.read)
  .put(cors(), controller.update)
  .delete(cors(), controller.destroy)
  .all(methodNotAllowed);
router.use("/", controller.list).all(methodNotAllowed);

module.exports = router;
