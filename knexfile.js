const path = require("path");

require("dotenv").config();

// const { DATABASE_URL = "postgresql://postgres@localhost/postgres" } =
//   process.env;
// const {
//   NODE_ENV = "development",
//   DEVELOPMENT_DATABASE_URL,
//   PRODUCTION_DATABASE_URL,
// } = process.env;

// const DATABASE_URL =
//   NODE_ENV === "production"
//     ? PRODUCTION_DATABASE_URL
//     : DEVELOPMENT_DATABASE_URL;

const {
  DATABASE_URL = "postgres://dev_ty21_user:GrPIfJOhlSfX6Sj1ZQwZhSOP9e8TCHM5@dpg-cm2r5eda73kc73elsrj0-a.oregon-postgres.render.com/dev_ty21?ssl=true",
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
