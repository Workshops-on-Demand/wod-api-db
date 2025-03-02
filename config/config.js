require("dotenv").config();

module.exports = {
  development: {
    username: process.env.WODPGUSER,
    password: process.env.WODPGPASSWD,
    database: process.env.WODPGDB,
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: process.env.WODPGUSER,
    password: process.env.WODPGPASSWD,
    database: process.env.WODPGDB,
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: process.env.WODPGUSER,
    password: process.env.WODPGPASSWD,
    database: process.env.WODPGDB,
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false
  }
};
