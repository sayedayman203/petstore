const { check } = require("express-validator");

exports.bidValidation = [
  check("amount").trim().notEmpty().bail().isNumeric(),
  check("userId").trim().notEmpty().bail().isInt(),
  check("petId").trim().notEmpty().bail().isInt(),
];
