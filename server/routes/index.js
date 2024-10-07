const express = require("express");
const router = express.Router();

router.use("/user", require("./userRoot"));
router.use("/incident", require("./superuserRoot"));

module.exports = router;
