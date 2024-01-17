const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here

  const reviewId = request.params.reviewId;
  const review = await service.read(reviewId);
  if (review) {
    response.locals.review = review;
    return next();
  }
  next({ status: 404, message: `review cannot be found.` });
}

async function read(request, response, next) {
  const { review } = response.locals;
  response.json({ review });
}

async function destroy(request, response) {
  // TODO: Write your code here
  const { review } = response.locals;
  await service.destroy(review.review_id);
  response.sendStatus(204);
}

async function list(request, response) {
  // TODO: Write your code here
  const movieId = request.params.movieId;
  const data = await service.list(movieId);
  response.json({ data });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // TODO: Write your code here
  const reviewId = request.params.reviewId;
  const updatedReview = {
    ...request.body.data,
    review_id: reviewId,
  };
  const data = await service.update(updatedReview);
  response.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(reviewExists), read],
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
