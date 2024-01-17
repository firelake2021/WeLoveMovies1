const knex = require("../db/connection");
const db = require("../db/connection");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function showingInTheaters(movie_id) {
  return db("theaters")
    .select("theaters.*", "movies_theaters.*")
    .modify((queryBuilder) => {
      queryBuilder
        .join(
          "movies_theaters",
          "theaters.theater_id",
          "movies_theaters.theater_id"
        )
        .where({ "movies_theaters.is_showing": true })
        .andWhere({ "movies_theaters.movie_id": movie_id });
    });
}

async function getMovieReviews(movie_id) {
  return knex("reviews")
    .select(
      "review_id",
      "content",
      "score",
      "created_at",
      "updated_at",
      "critic_id",
      "movie_id"
    )
    .where({ movie_id })
    .then();
}

async function read(movie_id) {
  // TODO: Add your code here
  return knex("movies").select("*").where({ movie_id: movie_id }).first();
}

module.exports = {
  list,
  read,
  showingInTheaters,
  getMovieReviews,
};
