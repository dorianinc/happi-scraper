const { Setting } = require("../db");

// Get settings
exports.getSettings = async (req, res) => {
  const setting = await Setting.findByPk(1);
  res.status(200).json(setting);
};

// Get dark mode boolean
exports.getDarkModeBoolean = async (req, res) => {
  const setting = await Setting.findByPk(1);
  res.status(200).json(setting.darkMode);
};

// Update Setting
exports.updateSetting = async (req, res) => {
  const setting = await Setting.findByPk(1);
  const settingsJson = setting.toJSON()
  if (!setting) res.status(404).json(doesNotExist("Setting"));
  for (property in req.body) {
    let value = req.body[property];
    setting[property] = value;
  }
  await setting.save();
  res.status(200).json(setting.toJSON());
};