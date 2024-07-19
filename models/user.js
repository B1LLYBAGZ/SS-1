// user.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

class User extends Model {}

// Provide default options if globalOptions are not set
const defaultOptions = {
  define: {
    timestamps: false, // Example option, adjust as needed
  },
};

User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  { sequelize, modelName: "user", ...defaultOptions }
);

module.exports = User;
