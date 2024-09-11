const { SearchTarget } = require("../db");

//  Get all search targets
const getSearchTargets = async () => {
  console.log("--- Getting searchTargets in controller ---");
  try {
    const searchTargets = await SearchTarget.findAll();
    return searchTargets.map((searchTarget) => searchTarget.toJSON());
  } catch (error) {
    console.error("Error getting searchTargets:", error);
    throw new Error("Unable to retrieve search targets");
  }
};

//  Get all search targets
const getSearchTargetById = async (searchTargetId) => {
  console.log("--- Getting single search Target in controller ---");
  try {
    const searchTarget = await SearchTarget.findByPk(productId, { raw: true });

    if (!searchTarget) {
      throw new Error(`Search target was not not found`);
    }

    return searchTarget;
  } catch (error) {
    console.error("Error getting searchTargets:", error);
    throw new Error("Unable to retrieve search targets");
  }
};

// Update single search target by id
const updateSearchTarget = async (data) => {
  console.log("--- Updating searchTarget in controller:", data);
  const id = data.searchTargetId;
  const updatedFields = data.payload;
  try {
    const searchTarget = await SearchTarget.findByPk(id);
    if (!searchTarget) {
      throw new Error("Search Target not found");
    }

    for (const property of Object.keys(updatedFields)) {
      searchTarget[property] = updatedFields[property];
    }

    await searchTarget.save();
    return searchTarget.toJSON();
  } catch (error) {
    console.error("Error updating searchTarget:", error);
    throw new Error("Unable to update searchTarget");
  }
};

// Delete a search target
const deleteSearchTargetById = async (searchTargetId) => {
  try {
    const searchTarget = await SearchTarget.findByPk(searchTargetId);

    if (!searchTarget) {
      throw new Error(`Search target was not found`);
    }

    await searchTarget.destroy();
    return {
      message: "Successfully deleted",
    };
  } catch (error) {
    console.error("Error deleting search target:", error);
    throw new Error("Unable to delete search target");
  }
};

module.exports = {
  getSearchTargets,
  getSearchTargetById,
  updateSearchTarget,
  deleteSearchTargetById
};
