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
  console.log("^^^^ In getTargets thunk ^^^^");
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
  console.log("^^^^ In getSingleTarget thunk ^^^^");
  try {
    const res = await ipcRenderer.invoke("get-single-search-target", productId);
    await dispatch(getSingleTarget(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// Update searchTargets
export const updateTargetThunk =
  (data = { searchTargetId, payload }) =>
  async (dispatch) => {
    console.log("^^^^ In updateTargets thunk ^^^^");
    try {
      const res = await ipcRenderer.invoke("update-search-target", data);
      await dispatch(getTargetsThunk());
      return res;
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

const initalState = {
  targets: {},
  currentTarget: null,
};

const searchTargetsReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_TARGETS:
      return {
        ...state,
        targets: { ...action.searchTargets },
      };
    case GET_SINGLE_TARGET:
      return {
        ...state,
        currentTarget: action.searchTarget
      }
    default:
      return state;
  }
};

export default searchTargetsReducer;

// const searchTargetsReducer = (state = {}, action) => {

//   let newState;
//   switch (action.type) {
//     case GET_TARGETS:
//       newState = { ...action.searchTargets };
//       return newState;
//       case GET_SINGLE_TARGET:
//         newState = { ...action.searchTarget };
//         return newState;
//     default:
//       return state;
//   }
// };

// export default searchTargetsReducer;
