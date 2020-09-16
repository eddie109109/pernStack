const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

// const pool = new Pool({
//   user: "postgres",
//   password: "123456",
//   host: "localhost", // when running on the local machine
//   port: 5432,
//   database: "edisbook",
// });

const proConfig = {
  connectionString: process.env.HEROKU_POSTGRESQL_COPPER_URL, //heroku addons
};

const pool = new Pool(
  process.env.NODE_ENV === "productin" ? proConfig : devConfig
);
module.exports = pool;
