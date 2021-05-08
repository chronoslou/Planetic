//Locations data
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Location model
class Post extends Model {}

// create fields/columns for Location model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
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
    location_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'location',
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
    modelName: 'post'
  }
);

module.exports = Post;