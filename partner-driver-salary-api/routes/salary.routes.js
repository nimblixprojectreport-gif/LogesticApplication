const express = require("express");
const router = express.Router();

const salaryController = require("../controllers/salary.controller");

// Create salary API
router.post("/create", salaryController.createSalary);

// Get driver salary
router.get("/:driverId", salaryController.getDriverSalary);

module.exports = router;