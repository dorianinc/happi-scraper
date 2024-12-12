const {
  ScriptItem,
  Fill,
  Delay,
  CoordinateClick,
  LocatorClick,
} = require("../../db");

//  Get all script items
const getScriptItems = async (siteName, raw) => {
  console.log("--- Getting scripts in controller ---");
  try {
    let scriptItemsQuery = await ScriptItem.findAll({
      where: { siteName: siteName },
      raw,
    });
    scriptItemsQuery.sort((a, b) => a.step - b.step);

    for (let scriptItem of scriptItemsQuery) {
      const type = scriptItem.type;
      let actions;
      switch (type) {
        case "delay":
          actions = await Delay.findAll({
            where: { scriptItemId: scriptItem.id },
            raw,
          });
          break;
        case "fill":
          actions = await Fill.findAll({
            where: { scriptItemId: scriptItem.id },
            raw,
          });
          break;
        case "coordinateClick":
          actions = await CoordinateClick.findAll({
            where: { scriptItemId: scriptItem.id },
            raw,
          });
          break;
        case "locatorClick":
          actions = await LocatorClick.findAll({
            where: { scriptItemId: scriptItem.id },
            raw,
          });
          break;
      }
      actions.sort((a, b) => a.step - b.step);
      scriptItem.actions = actions;
    }

    console.log("🖥️  scriptItems all in getScriptItems: ", scriptItemsQuery);

    return scriptItemsQuery;
  } catch (error) {
    console.error("Error getting scripts:", error);
    throw new Error("Unable to retrieve search targets");
  }
};

//  Check all script items
const checkScriptItems = async (siteName, scriptItems) => {
  console.log("--- Starting script items check ---");
  console.log("🖥️  scriptItems in checkScriptItems: ", scriptItems)
  try {
    const previousItems = {};
    const originalItems = await getScriptItems(siteName, true);

    while (originalItems.length || scriptItems.length) {
      const originalItem = originalItems.pop() || null;
      const newItem = scriptItems.pop() || null;
      const itemsMatch = originalItem?.id === newItem?.id;

      if (itemsMatch) {
        if (shouldUpdate(originalItem, newItem)) {
          await updateScriptItem(originalItem, newItem);
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
    if (shouldUpdate(item, previousItems[item.id].data)) {
      await updateScriptItem(previousItems[item.id].data, item);
    }
    delete previousItems[item.id]; // Remove from previousItems after processing
  } else {
    previousItems[item.id] = { data: item, status };
  }
};

// Function to determine if an update is needed
const shouldUpdate = (itemA, itemB) => {
  if (itemA.step !== itemB.step || itemA.type !== itemB.type) {
    return true;
  }

  if (itemA.actions && itemB.actions) {
    if (itemA.actions.length !== itemB.actions.length) {
      return true;
    }

    for (let i = 0; i < itemA.actions.length; i++) {
      const actionA = itemA.actions[i];
      const actionB = itemB.actions[i];

      if (JSON.stringify(actionA) !== JSON.stringify(actionB)) {
        return true;
      }
    }
  }

  return false;
};

const createScriptItem = async (newItem) => {
  console.log("👾👾👾👾👾 creating scriptItem: ", newItem);
  try {
    const createdItem = await ScriptItem.create(newItem);
    for (const action of newItem.actions || []) {
      const type = newItem.type;
      await createChildAction(type, createdItem.id, action);
    }
  } catch (error) {
    console.error("Error creating scriptItem:", error);
    throw new Error("Unable to create scriptItem");
  }
};

const createChildAction = async (type, scriptItemId, action) => {
  switch (type) {
    case "delay":
      await Delay.create({ scriptItemId, ...action });
      break;
    case "fill":
      console.log("🖥️  type: ", type);
      console.log("🖥️  scriptItemId: ", scriptItemId);
      console.log("🖥️  action: ", action);
      console.log("🖥️  item in action: ", action[0]);
      await Fill.create({ scriptItemId, ...action });
      break;
    case "coordinateClick":
      await CoordinateClick.create({ scriptItemId, ...action });
      break;
    case "locatorClick":
      await LocatorClick.create({ scriptItemId, ...action });
      break;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const updateScriptItem = async (originalItem, newItem) => {
  const item = await ScriptItem.findOne({ where: { id: originalItem.id } });

  for (const property of Object.keys(newItem)) {
    item[property] = newItem[property];
  }
  await item.save();

  // Update actions
  await deleteChildActions(originalItem.type, originalItem.id);
  for (const action of newItem.actions || []) {
    await createChildAction(newItem.type, originalItem.id, action);
  }

  return item.toJSON();
};

const deleteChildActions = async (type, scriptItemId) => {
  switch (type) {
    case "delay":
      await Delay.destroy({ where: { scriptItemId } });
      break;
    case "fill":
      await Fill.destroy({ where: { scriptItemId } });
      break;
    case "coordinateClick":
      await CoordinateClick.destroy({ where: { scriptItemId } });
      break;
    case "locatorClick":
      await LocatorClick.destroy({ where: { scriptItemId } });
      break;
  }
};

const deleteScriptItem = async (id) => {
  try {
    const scriptItem = await ScriptItem.findOne({ where: { id } });
    if (!scriptItem) {
      throw new Error(`ScriptItem not found`);
    }

    await deleteChildActions(scriptItem.type, id);
    await scriptItem.destroy();

    return { message: "Successfully deleted" };
  } catch (error) {
    console.error("Error deleting scriptItem:", error);
    throw new Error("Unable to delete scriptItem");
  }
};

module.exports = {
  getScriptItems,
  checkScriptItems,
};
