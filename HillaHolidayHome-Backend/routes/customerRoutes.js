const express = require("express");
const router = express.Router();
const multer = require("multer");
const customerController = require("../controllers/customerController");

// Store file in memory (BEST for DB storage)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("idProof"), customerController.insertCustomer);
router.get("/", customerController.getCustomers);

module.exports = router;