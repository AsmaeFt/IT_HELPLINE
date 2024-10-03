const express = require("express");
const router = express.Router();

router.use("/user", require("./userRoot"));

module.exports = router;
