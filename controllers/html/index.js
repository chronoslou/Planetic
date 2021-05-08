const router = require("express").Router();
const loginRoutes = require("./login");
//const projectRoutes = require("./locationRoutes");

router.use("/login", loginRoutes);
//router.use("/projects", projectRoutes);

module.exports = router;
