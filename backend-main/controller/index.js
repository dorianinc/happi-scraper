const product = require("./productController")
const match = require("./matchController")
const script = require("./scriptController");
const scriptItem = require("./scriptItemController")
const setting = require("./settingController");

module.exports = {
  product,
  match,
  script,
  scriptItem,
  setting,
};
