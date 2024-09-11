const { Setting, Website, Status } = require("../db");
const { statusSeeds } = require("../db/seeders/20240401074433-status-seeds");
const { websiteSeeds } = require("../db/seeders/20240401074434-website-seeds");
const { settingsSeeds } = require("../db/seeders/20240401074437-setting-seeds");

const seedDatabase = async () => {
  const status = await Status.findByPk(1, { raw: true });

  if (!status) {
    await Status.bulkCreate(statusSeeds());
    await Setting.bulkCreate(settingsSeeds());
    await Website.bulkCreate(websiteSeeds());
  }

  return;
};

module.exports = seedDatabase;
