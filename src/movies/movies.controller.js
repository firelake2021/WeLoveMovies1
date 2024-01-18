const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const movieId = request.params.movieId;
  const data = await service.read(movieId);
  if (!data) {
    next({ status: 404, message: "movieId not found" });
  }
  response.locals.movie = data;
  return next();
}

async function listMovieReviews(request, response, next) {
  const { movieId } = request.params;
  const reviews = await service.listMovieAndReviews(Number(movieId));
  response.json({ data: reviews });
}

async function read(request, response) {
  // TODO: Add your code here
  const { movie } = response.locals;

  response.json({ data: movie });
}

async function showingInTheaters(request, response, next) {
  const movieId = response.locals.movie.movie_id;
  const data = await service.showingInTheaters(movieId);
  response.json({ data });
}

async function getMovieReviews(request, response, next) {
  const movieId = request.params.movieId;
  const data = await service.getMovieReviews(movieId);
  response.json({ data });
}

async function list(request, response) {
  // TODO: Add your code here.
  const query = request.query;
  let data = "";
  // ?is_showing=true
  if (Object.keys(query).length > 0) {
    data = await service.list(query.is_showing);
  } else {
    data = await service.list();
  }
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  showingInTheaters: [asyncErrorBoundary(movieExists), showingInTheaters],
  movieExists: [asyncErrorBoundary(movieExists)],
  getMovieReviews,
  listMovieReviews: [asyncErrorBoundary(movieExists), listMovieReviews],
};
