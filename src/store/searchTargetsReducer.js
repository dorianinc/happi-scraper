import { ipcRenderer } from "electron";


////////////// Action Creators ///////////////

export const GET_SEARCHTARGETS = "searchTargets/GET_SEARCHTARGETS";
export const UPDATE_SEARCHTARGETS = "searchTargets/UPDATE_SEARCHTARGETS";

///////////// Action Creators ///////////////

// get all searchTargets
export const getSearchTargets = (searchTargets) => ({
  type: GET_SEARCHTARGETS,
  searchTargets,
});

/////////////////// Thunks ///////////////////

// Get all searchTargets
export const getSearchTargetsThunk = () => async (dispatch) => {
  console.log("^^^^ In getSearchTargets thunk ^^^^")
  try {
    const res = await ipcRenderer.invoke("get-searchTargets");
    console.log("🖥️  res: ", res)
    await dispatch(getSearchTargets(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// Update searchTargets
export const updateSearchTargetsThunk = (data = { searchTargetId, payload }) => async (dispatch) => {
  console.log("^^^^ In updateSearchTargets thunk ^^^^")
  try {
    const res = await ipcRenderer.invoke("update-searchTarget", data);
    await dispatch(getSearchTargetsThunk());
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const searchTargetsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_SEARCHTARGETS:
      newState = { ...action.searchTargets };
      return newState;
    default:
      return state;
  }
};

export default searchTargetsReducer;
