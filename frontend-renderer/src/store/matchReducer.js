////////////// Action Creators ///////////////

export const GET_MATCHES = "matchs/GET_MATCHS";
export const UPDATE_MATCH = "matchs/UPDATE_MATCH";
export const DELETE_MATCH = "matchs/DELETE_MATCH";

///////////// Action Creators ///////////////

// get all matchs
export const getMatches = (matches) => ({
  type: GET_MATCHES,
  matches,
});

/////////////////// Thunks ///////////////////

// get all matchs
export const getMatchesThunk = (productId) => async (dispatch) => {
  try {
    const res = await window.api.match.getMatches(productId);
    await dispatch(getMatches(res));
    return res;
  } catch (error) {
    console.error("error: ", error.message);
  }
};

// delete match
export const deleteMatchThunk = (matchId) => async (dispatch, getState) => {
  try {
    const res = await window.api.match.deleteMatch(matchId);
    if (res.success) {
      const matches = getState().matches;
      const updatedMatches = matches.filter((match) => match.id !== matchId);
      dispatch(getMatches(updatedMatches));
    }
  } catch (error) {
    console.error("error: ", error.message);
  }
};

////////////// Reducer //////////////////////

const initialState = [];

const matchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATCHES:
      return [...action.matches];
    default:
      return state;
  }
};

export default matchesReducer;
