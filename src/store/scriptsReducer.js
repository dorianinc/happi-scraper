import { ipcRenderer } from "electron";

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
  console.log("^^^^ In getScripts thunk ^^^^");
  try {
    const res = await ipcRenderer.invoke("get-scripts");
    console.log("🖥️  res : ", res);

    await dispatch(getScripts(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// get product details of single product
export const getSingleScriptThunk = (scriptId) => async (dispatch) => {
  console.log("^^^^ In getSingleScript thunk ^^^^");
  try {
    const res = await ipcRenderer.invoke("get-single-script", scriptId);
    console.log("🖥️  res: ", res);
    await dispatch(getSingleScript(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// Update scripts
export const updateScriptThunk =
  (scriptId, updatedScript, scriptItems) => async (dispatch) => {
    console.log("🖥️  updatedScript: ", updatedScript);
    console.log("^^^^ In updateScripts thunk ^^^^");
    try {
      const res = await ipcRenderer.invoke("update-script", {
        scriptId,
        updatedScript,
        scriptItems,
      });
      await dispatch(getScriptsThunk());
      return res;
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

const initalState = {
  allScripts: {},
  currentScript: null,
};

const scriptsReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_SCRIPTS:
      console.log("🖥️   action: ", action);
      return {
        allScripts: { ...action.scripts.allScripts },
        currentScript: { ...action.scripts.currentScript },
      };
    case GET_SINGLE_SCRIPT:
      return {
        ...state,
        currentScript: action.script,
      };
    default:
      return state;
  }
};

export default scriptsReducer;

// const scriptsReducer = (state = {}, action) => {

//   let newState;
//   switch (action.type) {
//     case GET_SCRIPTS:
//       newState = { ...action.scripts };
//       return newState;
//       case GET_SINGLE_SCRIPT:
//         newState = { ...action.script };
//         return newState;
//     default:
//       return state;
//   }
// };

// export default scriptsReducer;
