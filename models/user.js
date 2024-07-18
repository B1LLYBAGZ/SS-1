// user.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index");

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

module.exports = User;
