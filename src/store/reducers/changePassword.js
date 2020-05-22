import * as actionTypes from "../actionTypes";

const initialState = {
  changingPassword: false,
  changePasswordErrors: null,
  errors: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_CHANGING_PASSWORD:
      return {
        ...state,
        changingPassword: true,
      };
    case actionTypes.STOP_CHANGING_PASSWORD:
      return {
        ...state,
        changingPassword: false,
      };
    case actionTypes.SET_CHANGE_PASSWORD_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case actionTypes.CLEAR_CHANGE_PASSWORD_ERRORS:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};

export default reducer;
