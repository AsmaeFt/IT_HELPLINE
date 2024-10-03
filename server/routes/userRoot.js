const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const Middleware = require("../middleware/auth");

router.post("/LogIn", userController.logIn);
router.post(
  "/createAdmin",
  Middleware.isAuthenticated,
  Middleware.isRoot,
  userController.createUsers
);
router.post(
  "/createTechnician",
  Middleware.isAuthenticated,
  Middleware.isAdmin,
  userController.createUsers
);

module.exports = router;
