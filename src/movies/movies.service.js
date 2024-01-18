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

async function listMovieAndReviews(movie_id) {
  return db("reviews as r")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      { critic_id: "c.critic_id" },
      { preferred_name: "c.preferred_name" },
      { surname: "c.surname" },
      { organization_name: "c.organization_name" },
      { critic_created_at: "c.created_at" },
      { critic_updated_at: "c.updated_at" }
    )
    .where({ "r.movie_id": movie_id })
    .join("critics as c", "r.critic_id", "c.critic_id")
    .then((reviews) => {
      return reviews.map((review) => ({
        ...review,
        critic: {
          critic_id: review.critic_id,
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name,
          created_at: review.critic_created_at,
          updated_at: review.critic_updated_at,
        },
      }));
    });
}

module.exports = {
  list,
  read,
  showingInTheaters,
  getMovieReviews,
  listMovieAndReviews,
};
