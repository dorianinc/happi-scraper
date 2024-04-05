const { validationResult } = require("express-validator");
const { check } = require("express-validator");

// main function that makes validation handling work
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Bad Request");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad Request";
    next(err);
  }
  next();
};

validateProduct = [
  check("name")
    .exists({ checkFalsy: true, checkNull: true }) // check if value is falsey or null
    .withMessage("Product name is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("Product name must be between 5 and 50 characters long"),
  handleValidationErrors,
];

validateSetting = [
  check("similarityThreshold")
    .custom((value) => value >= 1 && value <= 100)
    .withMessage("Similarity Threshold must be an number between 1 and 100"),
  check("filterLimit")
    .custom((value) => value >= 1 && value <= 100)
    .withMessage("Filter Limit must be an number between 1 and 10"),
  // check("")
  //   .isBoolean()
  //   .withMessage("Filter Limit must be an number between 1 and 10"),
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
  validateProduct,
  validateSetting,
};
