const router = require('express').Router();
const { Location, Comment, Post, User } = require('../../models');
const withAuth = require("../../utils/auth");

// GET all locations
router.get('/', withAuth, async (req, res) => {
  try {
    const locationData = await Location.findAll();
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single location
router.get('/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      // JOIN with posts
      include: [{ model: Post }] //TODO: Fix this
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
