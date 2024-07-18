// index.js
const express = require("express");
const router = express.Router();

router.use("/users", require("./userRoutes"));
router.use("/posts", require("./postRoutes"));

router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
