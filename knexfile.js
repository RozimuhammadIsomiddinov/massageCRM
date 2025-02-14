require("dotenv").config();

const { DB_PASSWORD, DB_NAME, DB_HOST, DB_USERNAME } = process.env;
module.exports = {
  client: "pg",
  connection: {
    host: DB_HOST, // PostgreSQL serveri
    user: DB_USERNAME, // PostgreSQL foydalanuvchisi
    password: DB_PASSWORD, // PostgreSQL paroli
    database: DB_NAME, // PostgreSQL bazasi
  },
  migrations: {
    directory: "./migrations", // Migration fayllari joylashgan papka
  },
};
