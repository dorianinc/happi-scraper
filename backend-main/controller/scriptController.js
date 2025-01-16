const { Script } = require("../../db");
const { getScriptItems, checkScriptItems } = require("./scriptItemController");
const { scrapeSingleWebsite } = require("../playwright/product-matcher.js");

// Create scripts
const createScript = async () => {
  try {
    const blankScript = {
      siteName: "Untitled",
      siteUrl: null,
      productTitleLocator: null,
      productImageLocator: null,
      productUrlLocator: null,
      productPriceLocator: null,
      productDollarLocator: null,
      productCentLocator: null,
      isExcluded: false,
    };
    
    const newScript = await Script.create(blankScript);
    console.log("new script ------> ", newScript.toJSON());
    return newScript.toJSON();
  } catch (error) {
    console.error("error: ", error);
  }
};

//  Get all scripts
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
    let scriptItems = await getScriptItems(script.id, true);
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
  const updatedFields = data.script;
  try {
    const script = await Script.findByPk(id);
    if (!script) {
      throw new Error("Script not found");
    }

    for (const property of Object.keys(updatedFields)) {
      script[property] = updatedFields[property];
    }
    if (data?.scriptItems) {
      await checkScriptItems(script.siteName, data.scriptItems);
    }
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
      throw new Error(`Script was not found`);
    }

    await script.destroy();
    return {
      success: true,
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
    return res;
  } catch (error) {
    console.error("Error getting scripts:", error);
    throw new Error("Unable to retrieve script");
  }
};

const setErrorMessage = async (id, message) => {
  const script = await Script.findOne({ where: { id } });
  script.errorMessage = message ? `${message}` : "";

  await script.save();
  return script.toJSON();
};

module.exports = {
  getScripts,
  getSingleScript,
  createScript,
  updateScriptById,
  deleteScriptById,
  testScriptById,
  setErrorMessage,
};

// data:  {
//   scriptId: 2,
//   updatedScript: {
//     siteUrl: 'https://www.amazon.com',
//     productTitleLocator: '.s-title-instructions-style .a-color-base.a-text-normal',
//     productImageLocator: '.s-product-image-container .s-image',
//     productDollarLocator: '.a-price-whole',
//     productCentLocator: '.a-price-fraction'
//   },
//   scriptItems: [
//     {
//       id: '1',
//       siteName: 'Amazon',
//       type: 'fill',
//       step: 1,
//       endUrl: 'https://www.amazon.com/s?k=charmander+pop',
//       errorMessage: '',
//       actions: [Array]
//     }
//   ]
// }
