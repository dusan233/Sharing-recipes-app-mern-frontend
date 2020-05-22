import * as actionTypes from "../actionTypes";

const initialState = {
  updatingProfile: false,
  updatedSuccessfully: false,
  updateProfileErrors: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_PROFILE_UPDATE:
      return {
        ...state,
        updatingProfile: true,
      };
    case actionTypes.STOP_PROFILE_UPDATE:
      return {
        ...state,
        updatingProfile: false,
      };
    case actionTypes.SET_UPDATE_PROFILE_ERRORS:
      return {
        ...state,
        updateProfileErrors: action.errors,
      };
    case actionTypes.CLEAR_UPDATE_PROFILE_ERRORS:
      return {
        ...state,
        updateProfileErrors: null,
      };
    default:
      return state;
  }
};

export default reducer;
