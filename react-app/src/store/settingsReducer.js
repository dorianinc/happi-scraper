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
  const res = await fetch("/api/settings");
  if (res.ok) {
    const data = await res.json();
    await dispatch(getSettings(data));
    return data;
  }
};

// update settings
export const updateSettingsThunk = (settings) => async (dispatch) => {
  console.log("🖥️  settings: ", settings)
  const res = await fetch(`/api/settings/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(getSettings(data));
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