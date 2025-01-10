const { Script } = require("../../db");
const { getScriptItems, checkScriptItems } = require("./scriptItemController");
const { scrapeSingleWebsite } = require("../playwright/product-matcher.js");

//  Get all search scripts
const getScripts = async () => {
  try {
    const allScripts = await Script.findAll({
      order: [["siteName", "ASC"]],
      raw: true,
    });

    if (!allScripts.length) return {};

    const currentScript = await getSingleScript(allScripts[0].id);
    return { allScripts, currentScript };
  } catch (error) {
    console.error("Error getting scripts:", error);
    throw new Error("Unable to retrieve search scripts");
  }
};

//  Get single script
const getSingleScript = async (scriptId) => {
  try {
    let script;
    script = await Script.findByPk(scriptId, {
      raw: true,
    });
    if (!script) {
      throw new Error(`Script was not not found`);
    }
    let scriptItems = await getScriptItems(script.siteName, true);
    script.items = scriptItems;
    return script;
  } catch (error) {
    console.error("Error getting scripts:", error);
    throw new Error("Unable to retrieve script");
  }
};

// Update single search script by id
const updateScriptById = async (data) => {
  const id = data.scriptId;
  const updatedFields = data.updatedScript;
  try {
    const script = await Script.findByPk(id);
    if (!script) {
      throw new Error("Script not found");
    }

    for (const property of Object.keys(updatedFields)) {
      script[property] = updatedFields[property];
    }
    console.log("script after update ===> ", script.toJSON())
    await checkScriptItems(script.siteName, data.scriptItems);
    await script.save();

    return script.toJSON();
  } catch (error) {
    console.error("Error updating script:", error);
    throw new Error("Unable to update script");
  }
};

// Delete a search script
const deleteScriptById = async (scriptId) => {
  try {
    const script = await Script.findByPk(scriptId);

    if (!script) {
      throw new Error(`Search script was not found`);
    }

    await script.destroy();
    return {
      message: "Successfully deleted",
    };
  } catch (error) {
    console.error("Error deleting search script:", error);
    throw new Error("Unable to delete search script");
  }
};

//  Test single script
const testScriptById = async (data) => {
  const scriptId = data.scriptId;
  const productName = data.name;
  try {
    const res = await scrapeSingleWebsite({
      scriptId,
      product: { name: productName },
    });
    console.log("🖥️ res in testScriptById: ", res);
  } catch (error) {
    console.error("Error getting scripts:", error);
    throw new Error("Unable to retrieve script");
  }
};

module.exports = {
  getScripts,
  getSingleScript,
  updateScriptById,
  deleteScriptById,
  testScriptById,
};
