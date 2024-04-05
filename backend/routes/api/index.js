const router = require("express").Router();
const productsRouter = require("./productRoutes.js");
const websitesRouter = require("./websiteRoutes.js");
const matchesRouter = require("./matchRoutes.js");
const settingsRouter = require("./settingRoutes.js");
// const sessionRouter = require("./sessionRoutes.js");
// const { restoreUser } = require("../../utils/auth.js");

// router.use(restoreUser);
// router.use("/session", sessionRouter);
router.use("/products", productsRouter);
router.use("/websites", websitesRouter);
router.use("/matches", matchesRouter);
router.use("/settings", settingsRouter);


module.exports = router;