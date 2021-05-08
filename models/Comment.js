//Locations data
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Location model
class Comment extends Model {}

// create fields/columns for Location model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
          unique: false
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'id',
          unique: false
        }
    },
      createdAt:{
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;