const express = require("express");

const router = express.Router();

const bookingSummaryController =
require("../controllers/bookingSummaryController");



// INSERT
router.post(
    "/insertBookingSummary",
    bookingSummaryController.insertBookingSummary
);


// GET ALL
router.get(
    "/getBookingSummaries",
    bookingSummaryController.getBookingSummaries
);


// GET BY ID
router.get(
    "/getBookingSummaryById/:id",
    bookingSummaryController.getBookingSummaryById
);


// UPDATE
router.put(
    "/updateBookingSummary/:id",
    bookingSummaryController.updateBookingSummary
);


// DELETE
router.delete(
    "/deleteBookingSummary/:id",
    bookingSummaryController.deleteBookingSummary
);


module.exports = router;