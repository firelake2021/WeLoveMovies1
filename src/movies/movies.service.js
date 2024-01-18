const knex = require("../db/connection");
const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");

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

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

async function listMovieAndReviews(movie_id) {
  // TODO: Write your code here
  return await knex("reviews as r")
    .join("movies as m", "r.movie_id", "m.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ "r.movie_id": movie_id })
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at",
      "c.updated_at"
    )
    .then((res) => {
      const outcome = [];
      res.forEach((element) => {
        outcome.push(addCritic(element));
      });
      return outcome;
    });
}

module.exports = {
  list,
  read,
  showingInTheaters,
  getMovieReviews,
  listMovieAndReviews,
};
