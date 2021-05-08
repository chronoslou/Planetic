//Create the relationships tying all the models together

const Traveller = require('./Traveller');
const Location = require('./Location');
const Trip = require('./Trip');

Traveller.belongsToMany(Location, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Trip,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'planned_trips'
});

Location.belongsToMany(Traveller, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Trip,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'location_travellers'
});

module.exports = { Traveller, Location, Trip };

//Locations haveMany Users 
//Users haveOne Location 

//Users haveMany Posts
//Posts belongToOne Users

//Locations haveMany Posts
//Posts belongToOne Locations

//Comments belongToOne Post
//Posts haveMany Comments

//ecommerce backend homework 
//Items have many tags