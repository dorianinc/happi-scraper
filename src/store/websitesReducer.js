import * as api from "../firestore/api/websites";

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
// get all websites
export const getWebsitesThunk = () => async (dispatch) => {
  const data = await api.getWebsites();

  await dispatch(getWebsites(data));
  return data;
};

// update websites
export const updateWebsitesThunk = (siteSettings) => async (dispatch) => {
  const res = await api.updateWebsite(siteSettings);
  await dispatch(getWebsitesThunk());
  return res;
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
