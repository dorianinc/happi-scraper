////////////// Action Creators ///////////////

export const GET_SCRIPTS = "scripts/GET_SCRIPTS";
export const UPDATE_SCRIPT = "scripts/UPDATE_SCRIPT";
export const GET_SINGLE_SCRIPT = "scripts/GET__SINGLE_SCRIPT";

///////////// Action Creators ///////////////

// get all search scripts
export const getScripts = (scripts) => ({
  type: GET_SCRIPTS,
  scripts,
});

// get single search script
export const getSingleScript = (script) => ({
  type: GET_SINGLE_SCRIPT,
  script,
});

// update single script
export const updateScript = (script) => ({
  type: UPDATE_SCRIPT,
  script,
});

/////////////////// Thunks ///////////////////

// Get all scripts
export const getScriptsThunk = () => async (dispatch) => {
  try {
    const res = await window.api.script.getScripts();
    await dispatch(getScripts(res));
    return res;
  } catch (error) {
    console.error("error: ", error.message);
  }
};

// get product details of single script
export const getSingleScriptThunk = (scriptId) => async (dispatch) => {
  try {
    const res = await window.api.script.getSingleScript(scriptId);
    await dispatch(getSingleScript(res));
    return res;
  } catch (error) {
    console.error("error: ", error.message);
  }
};

// Update scripts
export const updateScriptThunk = (scriptPayload) => async (dispatch) => {
  try {
    const res = await window.api.script.updateScript(scriptPayload);
    await dispatch(getScriptsThunk());
    return res;
  } catch (error) {
    console.error("error: ", error.message);
  }
};

///////////// Reducer //////////////

const initialState = {
  allScripts: {},
  currentScript: null,
};

const scriptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCRIPTS:
      return {
        ...state,
        allScripts: { ...action.scripts.allScripts },
      };
    case GET_SINGLE_SCRIPT:
      return {
        ...state,
        currentScript: { ...action.script },
      };
    default:
      return state;
  }
};

export default scriptsReducer;
