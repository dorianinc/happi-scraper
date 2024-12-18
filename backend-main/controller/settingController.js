const { store } = require("../utils/electron-store");

const getSettings = () => {
  try {
    const settings = store.get("settings");
    console.log("🖥️  settings: ", settings)
    return settings;
  } catch (error) {
    console.error("Error in getSettings: ", error);
    return null;
  }
};

const updateSettings = (setting) => {
  console.log("🖥️  setting: ", setting)
  try {
    for (let key in setting) {
      store.set(`settings.${key}`, setting[key]);
    }
    return setting;
  } catch (error) {
    console.error("Error in updateSettings: ", error);
    throw error;
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
