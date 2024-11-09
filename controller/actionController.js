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

///////////// if old item found in obj that means it exists in new item which mean its getting updated;
////// else it gets deleted

///////////// if new item found in obj that means it exists in old item which mean its getting updated;
////// else it gets added

//  Get all search targets
const checkScriptItems = async (siteName, scriptItems) => {
  console.log("--- Getting scripts in controller ---");
  try {
    const prevItems = {};
    let actions = await getActions(siteName, true);
    while (actions.length || scriptItems.length) {
      const ogItem = actions.pop() || null;
      const newItem = scriptItems.pop() || null;
      if (ogItem && newItem && ogItem.id === newItem.id) {
        if (shouldUpdate(ogItem, newItem)) {
          console.log(" 🥶🥶🥶 TRIGERING UPDATE in condition 3 🥶🥶🥶");
          await updateScriptItem(ogItem.id, newItem);
        }
      } else {
        console.log("😺😺😺 Item does not match 😺😺😺");
        if (ogItem) {
          const ogItemExists = prevItems[ogItem.id] !== undefined;
          if (ogItemExists) {
            if (shouldUpdate(ogItem, prevItems[ogItem.id].data)) {
              console.log(" 🥶🥶🥶 TRIGERING UPDATE in conditon 1🥶🥶🥶");
              await updateScriptItem(ogItem.id, newItem);
            }
            delete prevItems[ogItem.id];
          } else {
            prevItems[ogItem.id] = { data: ogItem, action: "old" };
          }
        }
        if (newItem) {
          const newItemExists = prevItems[newItem.id] !== undefined;
          if (newItemExists) {
            if (shouldUpdate(newItem, prevItems[newItem.id].data)) {
              console.log(" 🥶🥶🥶 TRIGERING UPDATE in condition 2🥶🥶🥶");
              await updateScriptItem(newItem.id, newItem);
            }
            delete prevItems[newItem.id];
          } else {
            prevItems[newItem.id] = { data: newItem, action: "new" };
          }
        }
      }
    }
    console.log("🤠🤠🤠🤠 item obj after scan ==> ", prevItems);
    for (key in prevItems) {
      const action = prevItems[key].action;
      if (action === "new") {
        await createScriptItem(prevItems[key].data);
      }
      if (action === "old") {
        await deleteScriptItem(key);
      }
    }
  } catch (error) {
    console.error("Error getting scripts:", error);
    throw new Error("Unable to retrieve search targets");
  }
};

const shouldUpdate = (itemA, itemB) => {
  console.log("🖥️  itemB: ", itemB);
  console.log("🖥️  itemA: ", itemA);
  if (
    itemA.step !== itemB.step ||
    itemA.type !== itemB.type ||
    itemA.value !== itemB.value
  ) {
    return true;
  }
  return false;
};

const createScriptItem = async (newItem) => {
  console.log("🖥️  newItem: ", newItem);
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
