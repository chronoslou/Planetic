const sequelize = require('../config/connection');
const { User, Location, Post, Comment  } = require('../models');//connect to models

const userData = require('./userData.json');
const locationData = require('./locationData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Location.bulkCreate(locationData);

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData);

  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();

