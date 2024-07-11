import * as api from "../firestore/api/settings";

////////////// Action Creators ///////////////
export const GET_SETTINGS = "settings/GET_SETTINGS";
export const UPDATE_SETTINGS = "settings/UPDATE_SETTINGS";

///////////// Action Creators ///////////////
// get all settings
export const getSettings = (settings) => ({
  type: GET_SETTINGS,
  settings,
});

/////////////////// Thunks ///////////////////
// get all settings
export const getSettingsThunk = () => async (dispatch) => {
  const res = await api.getSettings();
  console.log("🖥️  res in getSettingsThunk: ", res);

  await dispatch(getSettings(res));
  return res;
};

// get all settings
export const getDarkModeThunk = () => async (dispatch) => {
  const res = await api.getDarkModeBoolean();
  console.log("🖥️  res in getDarkModeThunk: ", res);
  
  await dispatch(getSettings(res));
  return res;
};

// update settings
export const updateSettingsThunk = (settings) => async (dispatch) => {
  const res = await api.updateSettings(settings);
  await dispatch(getSettings(res));
  return res;
};

const settingsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_SETTINGS:
      newState = { ...action.settings };
      return newState;
    default:
      return state;
  }
};

export default settingsReducer;
