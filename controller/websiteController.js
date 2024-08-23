const { Website } = require("../db");

//  Get all websites
const getWebsites = async () => {
  console.log("--- Getting websites in controller ---");
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
  console.log("--- Updating website in controller:", data);
  const id = data.websiteId;
  const updatedFields = data.payload;
  try {
    console.log("🖥️  id: ", id)
    const website = await Website.findByPk(id);
    console.log("🖥️  website before: ", website.toJSON())
    if (!website) {
      throw new Error("Website not found");
    }
    console.log("beep boop 🤖🤖")
    console.log("🖥️  Object.keys(updatedFields): ", Object.keys(updatedFields))


    for (const property of Object.keys(updatedFields)) {
      console.log("pew pew pew ---> 👾👾👾👾👾")
      console.log("🖥️  property: ", property)
      console.log("🖥️  updatedFields[property]: ", updatedFields[property])
      website[property] = updatedFields[property];
    }
    console.log("🖥️  website after: ", website.toJSON())

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
