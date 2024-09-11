import { ipcRenderer } from "electron";


////////////// Action Creators ///////////////

export const GET_TARGETS = "targets/GET_TARGETS";
export const UPDATE_TARGET = "targets/UPDATE_TARGET";
export const GET_SINGLE_TARGET = "targets/GET__SINGLE_TARGET";

///////////// Action Creators ///////////////

// get all search targets
export const getTargets = (searchTargets) => ({
  type: GET_TARGETS,
  searchTargets,
});

// get single search target
export const getSingleTarget = (searchTarget) => ({
  type: GET_SINGLE_TARGET,
  searchTarget,
});

// update single target
export const updateTarget = (searchTarget) => ({
  type: UPDATE_TARGET,
  searchTarget,
});


/////////////////// Thunks ///////////////////

// Get all searchTargets
export const getTargetsThunk = () => async (dispatch) => {
  console.log("^^^^ In getSearchTargets thunk ^^^^")
  try {
    const res = await ipcRenderer.invoke("get-search-targets");
    await dispatch(getTargets(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// get product details of single product
export const getSingleTargetThunk = (productId) => async (dispatch) => {
  console.log("^^^^ In getSingleTarget thunk ^^^^")
  try {
    const res = await ipcRenderer.invoke("get-single-search-target", productId)
    console.log("🖥️  res: ", res)
    await dispatch(getTargets(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// Update searchTargets
export const updateTargetsThunk = (data = { searchTargetId, payload }) => async (dispatch) => {
  console.log("^^^^ In updateSearchTargets thunk ^^^^")
  try {
    const res = await ipcRenderer.invoke("update-search-target", data);
    await dispatch(getTargetsThunk());
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const searchTargetsReducer = (state = {}, action) => {

  let newState;
  switch (action.type) {
    case GET_TARGETS:
      newState = { ...action.searchTargets };
      return newState;
      case GET_SINGLE_TARGET:
        newState = { ...action.searchTarget };
        return newState;
    default:
      return state;
  }
};

export default searchTargetsReducer;
