const { where } = require("sequelize");
const { Script, Action } = require("../db");
const { act } = require("react");

//  Get all search targets
const getTargets = async () => {
  console.log("--- Getting scripts in controller ---");
  try {
    const scripts = await Script.findAll({
      order: [["siteName", "ASC"]],
    });
    console.log("🖥️  scripts: ", scripts)
    return scripts.map((script) => script.toJSON());
  } catch (error) {
    console.error("Error getting scripts:", error);
    throw new Error("Unable to retrieve search targets");
  }
};

//  Get all search targets
const getSingleTarget = async (scriptId) => {
  console.log("--- Getting single search Target in controller ---");
  try {
    let script;
    if (scriptId) {
      script = await Script.findByPk(scriptId, {
        raw: true,
      });
      if (!script) {
        throw new Error(`Search target was not not found`);
      }
      let actions = await Action.findAll({
        where: { siteName: script.siteName },
        raw: true
      });
      console.log("🖥️  actions: ", actions)
      script.actions = actions;
    } else {
      // script = await Script.findOne({
      //   order: [["siteName", "ASC"]],
      //   raw: true
      // });

      script = await Script.findOne({
        where: { siteName: "Amazon" }, // Condition to match 'Amazon'
        raw: true, // Return raw data
      });
      if (!script) {
        throw new Error(`No search targets were found`);
      }
    }

    console.log("🖥️  script: ", script);
    return script;
  } catch (error) {
    console.error("Error getting scripts:", error);
    throw new Error("Unable to retrieve search targets");
  }
};

// Update single search target by id
const updateTarget = async (data) => {
  console.log("--- Updating script in controller:", data);
  const id = data.scriptId;
  const updatedFields = data.payload;
  try {
    const script = await Script.findByPk(id);
    if (!script) {
      throw new Error("Search Target not found");
    }

    for (const property of Object.keys(updatedFields)) {
      script[property] = updatedFields[property];
    }

    await script.save();
    return script.toJSON();
  } catch (error) {
    console.error("Error updating script:", error);
    throw new Error("Unable to update script");
  }
};

// Delete a search target
const deleteTargetById = async (scriptId) => {
  try {
    const script = await Script.findByPk(scriptId);

    if (!script) {
      throw new Error(`Search target was not found`);
    }

    await script.destroy();
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
