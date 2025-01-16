////////////// Action Creators ///////////////

export const CREATE_SCRIPT = "scripts/CREATE_SCRIPT";
export const GET_SCRIPTS = "scripts/GET_SCRIPTS";
export const GET_SINGLE_SCRIPT = "scripts/GET__SINGLE_SCRIPT";
export const DELETE_SCRIPT = "scripts/DELETE_SCRIPT";
///////////// Action Creators ///////////////

// delete script
export const createScript = (allScripts, script) => ({
  type: CREATE_SCRIPT,
  allScripts,
  script,
});

// get all scripts
export const getScripts = (scripts) => ({
  type: GET_SCRIPTS,
  scripts,
});

// get single script
export const getSingleScript = (script) => ({
  type: GET_SINGLE_SCRIPT,
  script,
});

// delete script
export const deleteScript = (scripts) => ({
  type: DELETE_SCRIPT,
  scripts,
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

// update scripts
export const updateScriptThunk = (scriptPayload) => async (dispatch) => {
  try {
    const res = await window.api.script.updateScript(scriptPayload);
    await dispatch(getScriptsThunk());
    return res;
  } catch (error) {
    console.error("error: ", error.message);
  }
};

export const deleteScriptThunk = (scriptId) => async (dispatch, getState) => {
  try {
    const res = await window.api.script.deleteScript(scriptId);
    if (res.success) {
      const scripts = getState().script.allScripts;
      const updatedScripts = scripts.filter((s) => s.id !== scriptId);
      dispatch(deleteScript(updatedScripts));
      return updatedScripts;
    }
  } catch (error) {
    console.error("error: ", error.message);
  }
};

export const createScriptThunk = () => async (dispatch, getState) => {
  try {
    const scripts = getState().script.allScripts;

    const blankScript = await window.api.script.createScript();
    console.log("🖥️  blankScript: ", blankScript);

    scripts.push(blankScript);
    console.log("🖥️  scripts: ", scripts);
    dispatch(createScript(scripts, blankScript));
  } catch (error) {
    console.error("error ==>", error);
  }
};

///////////// Reducer //////////////

const initialState = {
  allScripts: [],
  currentScript: null,
};

const scriptsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SCRIPT:
      console.log("----- CREATING SCRIPT ------");
      console.log("action ===> ", action);
      return {
        ...state,
        allScripts: [...action.allScripts],
        currentScript: { ...action.script },
      };
    case GET_SCRIPTS:
      return {
        ...state,
        allScripts: [...action.scripts.allScripts],
      };
    case GET_SINGLE_SCRIPT:
      return {
        ...state,
        currentScript: { ...action.script },
      };
    case DELETE_SCRIPT:
      return {
        ...state,
        currentScript: action.scripts[0],
        allScripts: action.scripts,
      };
    default:
      return state;
  }
};

export default scriptsReducer;
