const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");

class Post extends Model { }

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            min: 10
        }
    }
}, {
    sequelize: db,
    modelName: "post"
});

module.exports = Post;