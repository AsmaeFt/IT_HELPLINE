const express = require("express");
const router = express.Router();
const incidentsController = require("../controller/incidentsController");
const Middleware = require("../middleware/auth");

router.post(
  "/createIncident",
  Middleware.isAuthenticated,
  Middleware.issuperUser,
  incidentsController.createIncidents
);
router.get(
    "/getIncident",
    Middleware.isAuthenticated,
    incidentsController.getIncidents
  );
module.exports = router;
