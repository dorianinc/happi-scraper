const { SearchTarget } = require("../db");

//  Get all search targets
const getTargets = async () => {
  console.log("--- Getting searchTargets in controller ---");
  try {
    const searchTargets = await SearchTarget.findAll({
      order: [["siteName", "ASC"]],
    });
    return searchTargets.map((searchTarget) => searchTarget.toJSON());
  } catch (error) {
    console.error("Error getting searchTargets:", error);
    throw new Error("Unable to retrieve search targets");
  }
};

//  Get all search targets
const getSingleTarget = async (searchTargetId) => {
  console.log("--- Getting single search Target in controller ---");
  try {
    let searchTarget;

    if (searchTargetId) {
      searchTarget = await SearchTarget.findByPk(searchTargetId, {
        raw: true,
      });
      if (!searchTarget) {
        throw new Error(`Search target was not not found`);
      }
    } else {
      // searchTarget = await SearchTarget.findOne({
      //   order: [["siteName", "ASC"]],
      //   raw: true
      // });

      searchTarget = await SearchTarget.findOne({
        where: { siteName: "Amazon" },  // Condition to match 'Amazon'
        raw: true                        // Return raw data
      });
      if (!searchTarget) {
        throw new Error(`No search targets were found`);
      }
    }

    return searchTarget;
  } catch (error) {
    console.error("Error getting searchTargets:", error);
    throw new Error("Unable to retrieve search targets");
  }
};

// Update single search target by id
const updateTarget = async (data) => {
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
const deleteTargetById = async (searchTargetId) => {
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
  getTargets,
  getSingleTarget,
  updateTarget,
  deleteTargetById,
};
