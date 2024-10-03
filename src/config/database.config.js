const { config } = require("dotenv");
config();

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST || "postgres",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 5432,
};
