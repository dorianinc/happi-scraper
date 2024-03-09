////////////// Action Creators ///////////////
export const GET_SETTINGS = "settings/GET_SETTINGS";
export const UPDATE_SETTINGS = "settings/UPDATE_SETTINGS";

///////////// Action Creators ///////////////
// get all settings
export const getSettings = (settings) => ({
  type: GET_SETTINGS,
  settings,
});

// update single settings
export const updateSettings = (settings) => ({
  type: UPDATE_SETTINGS,
  settings,
});

/////////////////// Thunks ///////////////////
// get all settings
export const getSettingsThunk = () => async (dispatch) => {
  const res = await fetch("/api/settings");
  if (res.ok) {
    const data = await res.json();
    await dispatch(getSettings(data));
    return data;
  }
};

// update settings
export const updateSettingsThunk = (payload) => async (dispatch) => {
  const res = await fetch(`/api/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(updateSettings(data));
    return data;
  }
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
