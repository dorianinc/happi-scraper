const express = require("express");
const router = express.Router();
const { restoreUser } = require("../../utils/auth.js");
const matchController = require("../../controllers/matchController.js");

router.use(restoreUser);

// router.get("/", matchController.getProductMatches);


module.exports = router;

