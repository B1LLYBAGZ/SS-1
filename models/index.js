const sequelize = require("../db/connection");
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);

sequelize.sync();

module.exports = sequelize;
