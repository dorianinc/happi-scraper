const { validationResult } = require("express-validator");
const { check } = require("express-validator");

// main function that makes validation handling work
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Bad Request");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad Request";
    next(err);
  }
  next();
};

validateProduct = [
  check("page")
    .custom((value) => value === undefined || value >= 1)
    .withMessage("Product name must be greater than or equal to 1"),
  handleValidationErrors,
];



validateQueries = [
  check("page")
    .custom((value) => value === undefined || value >= 1)
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .custom((value) => value === undefined || value >= 1)
    .withMessage("Size must be greater than or equal to 1"),
  handleValidationErrors,
];

module.exports = {
  validateQueries,
  validateProduct
};
