const router = require("express").Router();
const productsRouter = require("./products.js");
// const websitesRouter = require("./websites.js");
// const matchesRouter = require("./matches.js");
// const settingsRouter = require("./settings.js");
const sessionRouter = require("./session.js");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/products", productsRouter);
// // router.use("/websites", websitesRouter);
// // router.use("/matches", matchesRouter);
// // router.use("/settings", settingsRouter);


// module.exports = router;








module.exports = router;