const { Setting } = require("../db");

// Get settings
const getSettings = async () => {
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
  try {
    const setting = await getSettings();
    return setting.darkMode;
  } catch (error) {
    console.error("Error checking if dark mode is enabled:", error);
    throw new Error("Unable to check if dark mode is enabled");
  }
};

// Update Setting
const updateSettings = async ({ data }) => {
  console.log("Updating settings data:", data);

  try {
    const settings = await getSettings();
    if (!settings) {
      throw new Error("Setting not found");
    }
    for (const property of Object.keys(data)) {
      settings[property] = data[property];
    }
    await settings.save();
    return website.toJSON();
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
