const { Website } = require("../db/models/index.js");

// Get all websites
exports.getWebsites = async (_req, res) => {
  const websites = await Website.findAll();
  res.status(200).json(websites);
};

// Update Website
exports.updateWebsite = async (req, res) => {
  const website = await Website.findByPk(req.params.id);
  if (!website) res.status(404).json(doesNotExist("Website"));
  for (property in req.body) {
    let value = req.body[property];
    website[property] = value;
  }
  await website.save();
  res.status(200).json(website);
};
