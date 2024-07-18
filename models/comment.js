// comment.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index");

class Comment extends Model {}
Comment.init(
  {
    content: DataTypes.TEXT,
  },
  { sequelize, modelName: "comment" }
);

module.exports = Comment;