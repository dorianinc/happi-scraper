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
  console.log("--- Starting script items check ---");
  try {
    const previousItems = {};
    const actions = await getActions(siteName, true);

    while (actions.length || scriptItems.length) {
      const originalItem = actions.pop() || null;
      const newItem = scriptItems.pop() || null;
      const itemsMatch = originalItem?.id === newItem?.id;

      if (itemsMatch) {
        if (shouldUpdate(originalItem, newItem)) {
          await updateScriptItem(originalItem.id, newItem);
        }
      } else {
        await processItem(originalItem, "old", previousItems);
        await processItem(newItem, "new", previousItems);
      }
    }
    
    for (const key in previousItems) {
      const { status, data } = previousItems[key];
      if (status === "new") {
        await createScriptItem(data);
      } else if (status === "old") {
        await deleteScriptItem(key);
      }
    }
  } catch (error) {
    console.error("❌ Error processing script items:", error);
    throw new Error("Unable to retrieve search targets");
  }
};

// Process individual items based on their status
const processItem = async (item, status, previousItems) => {
  if (!item) return; // Skip if item is null

  const itemExists = previousItems[item.id] !== undefined;

  if (itemExists) {
    // If the item already exists in previousItems, check for an update
    if (shouldUpdate(item, previousItems[item.id].data)) {
      await updateScriptItem(item.id, item);
    }
    delete previousItems[item.id]; // Remove from previousItems after processing
  } else {
    // Add the item to previousItems with its status
    previousItems[item.id] = { data: item, status };
  }
};

// Function to determine if an update is needed
const shouldUpdate = (itemA, itemB) =>
  itemA.step !== itemB.step ||
  itemA.type !== itemB.type ||
  itemA.value !== itemB.value;

const createScriptItem = async (newItem) => {
  try {
    await Action.create(newItem);
  } catch (error) {
    console.error("Error creating scriptItem:", error);
    throw new Error("Unable to create scriptItem");
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

const deleteScriptItem = async (id) => {
  try {
    const scriptItem = await Action.findOne({ where: { id: id } });
    if (!scriptItem) {
      throw new Error(`Product was not found`);
    }
    await scriptItem.destroy();
    return {
      message: "Successfully deleted",
    };
  } catch (error) {
    console.error("Error deleting scriptItem:", error);
    throw new Error("Unable to delete scriptItem");
  }
};

module.exports = {
  getActions,
  checkScriptItems,
};
