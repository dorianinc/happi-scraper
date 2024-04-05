const { Setting } = require("../db/models/index.js");

// Get settings
exports.getSettings = async (req, res) => {
  const setting = await Setting.findByPk(1, { raw: true });
  res.status(200).json(setting);
};

// Get dark mode boolean
exports.getDarkModeBoolean = async (req, res) => {
  const setting = await Setting.findByPk(1, { raw: true });
  res.status(200).json(setting.darkMode);
};

// Update Setting
exports.updateSetting = async (req, res) => {
  const setting = await Website.findByPk(1, { raw: true });
  if (!website) res.status(404).json(doesNotExist("Website"));
  console.log("🖥️  req.body: ", req.body);
  for (property in req.body) {
    let value = req.body[property];
    setting[property] = value;
  }
  await website.save();
  res.status(200).json(setting);
};
