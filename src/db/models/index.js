"use strict";

const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV === "test" ? "test" : "default";
const config = require("../config/config.js")[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// models
db.Bid = require("./bid")(sequelize, Sequelize.DataTypes);

// associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
