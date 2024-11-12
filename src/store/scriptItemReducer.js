////////////// Action Creators ///////////////

export const GET_SCRIPT_ITEMS = "scriptItems/GET_SCRIPT_ITEMS";

///////////// Action Creators ///////////////

// get all search scriptItems
export const getScriptItems = (scriptItems) => ({
  type: GET_SCRIPT_ITEMS,
  scriptItems,
});

/////////////////// Thunks ///////////////////

// Get all scriptItems
export const getScriptItemsThunk = (siteName) => async (dispatch) => {
  console.log("^^^^ In getScriptItems thunk ^^^^");
  try {
    const res = await window.api.script.getScriptItems(siteName);

    await dispatch(getScriptItems(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

///////////// Reducer //////////////

const initalState = {
  items: {},
};

const scriptItemsReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_SCRIPT_ITEMS:
      return {
        ...state,
        items: { ...action.scriptItems },
      };
    default:
      return state;
  }
};

export default scriptItemsReducer;
