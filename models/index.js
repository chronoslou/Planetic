//Create the relationships tying all the models together

const User = require('./User');
const Location = require('./Location');
const Post = require('./Post');
const Comment = require('./Comment');

//Establishing User/Location relationships
User.belongsTo(Location, {
  foreignKey: 'location_id'
});

Location.hasMany(User, {
  foreignKey: 'location_id'
})


//Establishing User/Post relationships 
Post.belongsTo(User, {
  foreignKey: 'user_id'
})

User.hasMany(Post, {
  foreignKey: 'user_id'
})

//Establishing User/Comment relationship 
Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

User.hasMany(Comment, {
  foreignKey: 'user_id'
})

//Establishing Location/Post relationship 
Location.hasMany(Post, {
  foreignKey: 'location_id'
})

Post.belongsTo(Location, {
  foreignKey: 'location_id'
})

//Establishing Post/Comment relationship 
Post.hasMany(Comment, {
  foreignKey: 'post_id'
})

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
})

module.exports = { User, Location, Post, Comment };