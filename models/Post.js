const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");

class Post extends Model { }

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // createdOn is unnecessary because of the automatic createdAt - I forgot that's automatically made
    // createdOn: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    //     defaultValue: DataTypes.NOW
    // },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        // TEXT allows longer content than STRING
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