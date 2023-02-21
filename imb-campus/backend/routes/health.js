const express = require("express");
const router = express.Router();

/**
 * @method GET
 * @route /health
 */
router.get("/", (req, res) => {
  res.send("Application is super healthy!");
});

module.exports = router;
