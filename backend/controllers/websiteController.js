const { Website } = require("../db/models/index.js");

// Delete an Image from a Spot
exports.getWebsites = async (req, res) => {
  const websites = await Website.findAll({ raw: true });
  res.status(200).json(websites);
};

