const express = require("express");
const router = express.Router();
const { restoreUser } = require("../../utils/auth.js");
// const { validateSettings } = require("../../utils/validation.js");
const settingController = require("../../controllers/settingController.js");

router.use(restoreUser);

router.get("/", settingController.getSettings);
router.get("/darkMode", settingController.getDarkModeBoolean);
// router.put("/", settingController.updateSettings);

module.exports = router;
