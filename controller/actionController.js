const { Action } = require("../db");

//  Get all search targets
const getActions = async (siteName, raw) => {
  console.log("--- Getting scripts in controller ---");
  try {
    let actions = await Action.findAll({
      where: { siteName: siteName },
      raw,
    });
    return actions;
  } catch (error) {
    console.error("Error getting scripts:", error);
    throw new Error("Unable to retrieve search targets");
  }
};

//  Get all search targets
const checkScriptItems = async (siteName, scriptItems) => {
  console.log("--- Getting scripts in controller ---");
  try {
    const itemObj = {};
    let actions = await getActions(siteName, true);
    while (actions.length && scriptItems.length) {
      const ogItem = actions.pop();
      console.log("🖥️  ogItem: ", ogItem);
      const newItem = scriptItems.pop();
      console.log("🖥️  newItem: ", newItem);
      if (ogItem.id === newItem.id) {
        const test = await updateScriptItem(ogItem.id, newItem);
        console.log("🖥️  test: ", test)
      }
    }
  } catch (error) {
    console.error("Error getting scripts:", error);
    throw new Error("Unable to retrieve search targets");
  }
};

const updateScriptItem = async (id, newItem) => {
  const item = await Action.findOne({ where: { id: id } });
  for (const property of Object.keys(newItem)) {
    item[property] = newItem[property];
  }
  await item.save();
  return item.toJSON();
};

module.exports = {
  getActions,
  checkScriptItems,
};
