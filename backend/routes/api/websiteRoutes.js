const express = require("express");
const router = express.Router();
const { restoreUser } = require("../../utils/auth.js");
// const { validateSettings } = require("../../utils/validation.js");
const websiteController = require("../../controllers/websiteController.js");

router.use(restoreUser);

router.get("/", websiteController.getWebsites);

module.exports = router;