const { check } = require("express-validator");

exports.bidValidation = [
  check("amount").trim().notEmpty().isNumeric(),
  check("userId").trim().notEmpty().isInt(),
  check("petId").trim().notEmpty().isInt(),
];
