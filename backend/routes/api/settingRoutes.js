const express = require("express");
const router = express.Router();
// const { restoreUser } = require("../../utils/auth.js");
const { validateSetting } = require("../../utils/validation.js");
const settingController = require("../../controllers/settingController.js");

// router.use(restoreUser);

router.get("/darkMode", settingController.getDarkModeBoolean);
router.get("/", settingController.getSettings);
router.put("/", validateSetting, settingController.updateSetting);

module.exports = router;
