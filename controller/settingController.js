const { Setting } = require("../db");

// Get settings
const getSettings = async () => {
  try {
    const settings = await Setting.findByPk(1);
    return settings.toJSON();
  } catch (error) {
    console.error("Error in update-website IPC handler:", error);
    throw error;
  }
};

// Checks to see if dark mode is enable
const isDarkMode = async () => {
  try {
    const setting = getSettings();
    return setting.darkMode;
  } catch (error) {
    console.error("Error in update-website IPC handler:", error);
    throw error;
  }
};

// Update Setting
const updateSettings = async ({ data }) => {
  console.log("Updating settings data:", data);

  try {
    const settings = getSettings();
    if (!settings) {
      throw new Error("Setting not found");
    }
    for (const property of Object.keys(data)) {
      settings[property] = data[property];
    }
    await settings.save();
    return website.toJSON();
  } catch (error) {
    console.error("Error in update-website IPC handler:", error);
    throw error;
  }
};

module.exports = {
  getSettings,
  isDarkMode,
  updateSettings
}
