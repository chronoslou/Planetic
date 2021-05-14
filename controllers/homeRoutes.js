const router = require("express").Router();
const { User, Post, Location, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {

  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Location }],
    });

    const user = userData.get({ plain: true });
    console.log("we got this far", user)
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/locationbrowser', withAuth, async (req, res) => {

  try {
    const allLocationsData = await Location.findAll();
    console.log(allLocationsData)
    res.render("locationbrowser", {
      ...allLocationsData,
      logged_in: true
    })
   
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("loginpage");
});

module.exports = router;
