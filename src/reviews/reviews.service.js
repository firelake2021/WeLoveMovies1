const knex = require("../db/connection");
const db = require("../db/connection");

const tableName = "reviews";
const mapProperties = require("../utils/map-properties");
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

// works
async function destroy(review_id) {
  // TODO: Write your code here
  return knex(tableName).where({ review_id }).del();
}

async function list(movie_id) {
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

// works //114
async function read(review_id) {
  // TODO: Write your code here
  return await knex(tableName).select("*").where({ review_id }).first();
}

async function readCritic(critic_id) {
  return await db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
