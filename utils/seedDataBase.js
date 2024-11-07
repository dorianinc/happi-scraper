const { Setting, Script } = require("../db");
const {
  scriptSeeds,
} = require("../db/seeders/20240401074434-search-target-seeds");
const { settingsSeeds } = require("../db/seeders/20240401074420-setting-seeds");

const seedDatabase = async () => {
  const settings = await Setting.findByPk(1, { raw: true });
  console.log("🖥️  settings: ", settings)
  console.log("🖥️  settings: ", settings)

  if (!settings) {
    await Setting.bulkCreate(settingsSeeds());
    await Script.bulkCreate(scriptSeeds());
  }

  return;
};

module.exports = seedDatabase;
