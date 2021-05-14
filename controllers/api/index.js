const router = require("express").Router();
const userRoutes = require("./userRoutes");
const locationRoutes = require("./locationsRoutes");
const postRoutes = require("./postRoutes");


router.use("/users", userRoutes);
router.use("/locations", locationRoutes);
router.use("/posts", postRoutes);


module.exports = router;
