import { ipcRenderer } from "electron";


////////////// Action Creators ///////////////

export const GET_WEBSITES = "websites/GET_WEBSITES";
export const UPDATE_WEBSITES = "websites/UPDATE_WEBSITES";

///////////// Action Creators ///////////////

// get all websites
export const getWebsites = (websites) => ({
  type: GET_WEBSITES,
  websites,
});

/////////////////// Thunks ///////////////////

// Get all websites
export const getWebsitesThunk = () => async (dispatch) => {
  console.log("^^^^ In getWebsites thunk ^^^^")
  try {
    const res = await ipcRenderer.invoke("get-websites");
    await dispatch(getWebsites(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// Update websites
export const updateWebsitesThunk = (data = { websiteId, payload }) => async (dispatch) => {
  console.log("^^^^ In updateWebsites thunk ^^^^")
  try {
    const res = await ipcRenderer.invoke("update-website", data);
    await dispatch(getWebsitesThunk());
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

const websitesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_WEBSITES:
      newState = { ...action.websites };
      return newState;
    default:
      return state;
  }
};

export default websitesReducer;
