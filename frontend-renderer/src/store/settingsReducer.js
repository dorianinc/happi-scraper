////////////// Action Creators ///////////////

export const GET_SETTINGS = "settings/GET_SETTINGS";
export const UPDATE_SETTINGS = "settings/UPDATE_SETTINGS";

///////////// Action Creators ///////////////

// Get all settings
export const getSettings = (settings) => ({
  type: GET_SETTINGS,
  settings,
});

// Update settings
export const updateSettings = (updatedSettings) => ({
  type: UPDATE_SETTINGS,
  updatedSettings,
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


// Update settings
export const updateSettingsThunk = (settingsData) => async (dispatch) => {
  console.log("^^^^ In updateSettings thunk ^^^^");
  try {
    const res = await window.api.settings.updateSettings(settingsData); 
    await dispatch(updateSettings(res));
    return res;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

///////////// Reducer //////////////

const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return { ...action.settings }; 
    case UPDATE_SETTINGS:
      return { ...state, ...action.updatedSettings }; 
    default:
      return state;
  }
};

export default settingsReducer;
