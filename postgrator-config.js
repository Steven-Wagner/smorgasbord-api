require("dotenv").config();

console.log;
module.exports = {
  migrationDirectory: "migrations",
  driver: "pg",
  connectionString:
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_URL
      : process.env.TEST_DATABASE_URL,
  ssl: !!process.env.SSL
};
