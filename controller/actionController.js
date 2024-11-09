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
      const newItem = scriptItems.pop();
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
  console.log("🖥️  id: ", id)
  console.log("🖥️  newItem: ", newItem)
  const item = await Action.findOne({ where: { id: id } });
  for (const property of Object.keys(newItem)) {
    console.log("property ===> ", property)
    console.log("old item value ==> ", item[property]);
    console.log("new item value ==> ", newItem[property])
    item[property] = newItem[property];
  }
  await item.save();
  return item.toJSON();
};

module.exports = {
  getActions,
  checkScriptItems,
};
