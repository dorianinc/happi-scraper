const { Setting } = require("../db");

// Get settings
const getSettings = async () => {
  console.log("--- Getting settings in controller ---");
  try {
    const settings = await Setting.findByPk(1, { raw: true });
    if (!settings) {
      throw new Error("Setting not found");
    }
    return settings;
  } catch (error) {
    console.error("Error getting settings:", error);
    throw new Error("Unable to fetch settings");
  }
};

// Checks to see if dark mode is enable
const isDarkMode = async () => {
  console.log("--- Getting settings in controller ---");
  try {
    const setting = await getSettings();
    return setting.darkMode;
  } catch (error) {
    console.error("Error checking if dark mode is enabled:", error);
    throw new Error("Unable to check if dark mode is enabled");
  }
};

// Update Setting
const updateSettings = async (settingsData) => {
  console.log("--- Updating settings in controller:", settingsData);
  try {
    const settings = await Setting.findByPk(1);
    if (!settings) {
      throw new Error("Settings not found");
    }
    for (const property of Object.keys(settingsData)) {
      settings[property] = settingsData[property];
    }
    await settings.save();
    return settings.toJSON();
  } catch (error) {
    console.error("Error update setting:", error);
    throw new Error("Unable to update settings");
  }
};

module.exports = {
  getSettings,
  isDarkMode,
  updateSettings,
};
