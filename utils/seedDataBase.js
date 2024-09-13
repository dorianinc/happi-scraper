const { Setting, SearchTarget } = require("../db");
const {
  searchTargetSeeds,
} = require("../db/seeders/20240401074434-search-target-seeds");
const { settingsSeeds } = require("../db/seeders/20240401074420-setting-seeds");

const seedDatabase = async () => {
  const settings = await Setting.findByPk(1, { raw: true });

  if (!settings) {
    await Setting.bulkCreate(settingsSeeds());
    await SearchTarget.bulkCreate(searchTargetSeeds());
  }

  return;
};

module.exports = seedDatabase;
