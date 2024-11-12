////////////// Action Creators ///////////////

export const GET_SETTINGS = "settings/GET_SETTINGS";
export const UPDATE_SETTINGS = "settings/UPDATE_SETTINGS";

///////////// Action Creators ///////////////

// Get all settings
export const getSettings = (settings) => ({
  type: GET_SETTINGS,
  settings,
});

/////////////////// Thunks ///////////////////

// Get all settings
export const getSettingsThunk = () => async (dispatch) => {
  console.log("^^^^ In getSettings thunk ^^^^");
  try {
    const res = await window.api.settings.getSettings(); // Updated to use window.api
    await dispatch(getSettings(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// Get dark mode setting
export const getDarkModeThunk = () => async (dispatch) => {
  console.log("^^^^ In getDarkMode thunk ^^^^");
  try {
    const res = await window.api.settings.getDarkMode(); // Updated to use window.api
    await dispatch(getSettings(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

// Update settings
export const updateSettingsThunk = (settingsData) => async (dispatch) => {
  console.log("^^^^ In updateSettings thunk ^^^^");
  try {
    const res = await window.api.settings.updateSettings(settingsData); // Updated to use window.api
    await dispatch(getSettings(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

///////////// Reducer //////////////

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
