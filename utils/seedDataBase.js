const { sequelize, Setting, Website } = require("../db");
const { settingsSeeds } = require("../db/seeders/20240401075424-setting-seeds");
const { websiteSeeds } = require("../db/seeders/20240401074434-website-seeds");

const seedDatabase = async () => {
    await sequelize.sync(); // Ensure all tables are created
    await Setting.bulkCreate(settingsSeeds()); // Pass the array of objects directly
    await Website.bulkCreate(websiteSeeds());  // Pass the array of objects directly
};

module.exports = seedDatabase;
