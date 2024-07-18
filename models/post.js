// post.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index");

class Post extends Model {}
Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  },
  { sequelize, modelName: "post" }
);

module.exports = Post;
