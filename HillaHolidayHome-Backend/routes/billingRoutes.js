// routes/billingRoutes.js
const express = require("express");
const router = express.Router();
const billingController = require("../controllers/billingController");

router.post("/", billingController.insertBilling);

module.exports = router;