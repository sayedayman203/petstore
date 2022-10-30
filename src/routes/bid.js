const express = require("express");
const router = express.Router();

// controllers
const { bidController } = require("../controllers");

// validators
const { bidValidations } = require("../validators");
const { catchValidationError } = require("../middlewares/validationError");

// routes
router
  .route("/")
  .get(bidController.getBids)
  .post(
    bidValidations.bidValidation,
    catchValidationError,
    bidController.createBit
  );

module.exports = router;
