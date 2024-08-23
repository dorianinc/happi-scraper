const { Website } = require("../db");

//  Get all websites
const getWebsites = async () => {
  console.log("Getting website info");
  try {
    const websites = await Website.findAll();
    return websites.map((website) => website.toJSON());
  } catch (error) {
    console.error("Error getting websites:", error);
    throw new Error("Unable to retrieve websites");
  }
};

// Update single website by id
const updateWebsite = async (data) => {
  console.log("Updating website data:", data);
  const id = data.id;
  const updatedFields = data.payload;
  try {
    const website = await Website.findByPk(id);
    if (!website) {
      throw new Error("Website not found");
    }
    for (const property of Object.keys(updatedFields)) {
      website[property] = updatedFields[property];
    }
    await website.save();
    return website.toJSON();
  } catch (error) {
    console.error("Error updating website:", error);
    throw new Error("Unable to update website");
  }
};

module.exports = {
  getWebsites,
  updateWebsite,
};
