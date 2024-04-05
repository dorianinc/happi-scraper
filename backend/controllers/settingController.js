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
