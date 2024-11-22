const { Setting, Script, ScriptItem } = require("../../db");
const { scriptSeeds } = require("../../db/seeders/20240401074434-script-seeds");
const {
  scriptItemSeeds,
} = require("../../db/seeders/20240401074435-script-item-seeds");
const { settingsSeeds } = require("../../db/seeders/20240401074420-setting-seeds");

const seedDatabase = async () => {
  const settings = await Setting.findByPk(1, { raw: true });

  if (!settings) {
    console.log("<------- NO SETTINGS WERE FOUND ------>")
    await Setting.bulkCreate(settingsSeeds());
    await Script.bulkCreate(scriptSeeds());
    await ScriptItem.bulkCreate(scriptItemSeeds());

  }

  return;
};

module.exports = seedDatabase;
