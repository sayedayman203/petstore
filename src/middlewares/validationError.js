const { validationResult } = require("express-validator");
const { responseFactory } = require("../helpers/responseFactory");

const validationResultAfterFormation = validationResult.withDefaults({
  formatter: (error) => {
    return {
      value: error.value,
      msg: error.msg,
      param: error.param,
    };
  },
});

exports.catchValidationError = (req, res, next) => {
  const result = validationResultAfterFormation(req);
  if (!result.isEmpty()) {
    res.status(400).json(
      responseFactory({
        code: 400,
        errors: result.array(),
        message: "VALIDATION_ERROR",
      })
    );
  } else {
    next();
  }
};
