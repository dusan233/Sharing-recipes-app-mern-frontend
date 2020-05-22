import * as actionTypes from "../actionTypes";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  loginErrors: null,
  signinErrors: null,
  redirect: false,
  username: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.STOP_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SET_SIGNUP_ERRORS:
      return {
        ...state,
        signinErrors: action.errors,
      };
    case actionTypes.SET_LOGIN_ERRORS:
      return {
        ...state,
        loginErrors: action.errors,
      };
    case actionTypes.CLEAR_SIGNUP_ERRORS:
      return {
        ...state,
        signinErrors: null,
        redirect: true,
      };
    case actionTypes.STORE_USER_TOKEN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        username: action.username,
      };
    case actionTypes.CLEAR_USER_TOKEN:
      return {
        ...state,
        token: null,
        userId: null,
        username: null,
      };
    case actionTypes.CLEAR_AUTH_EVERYTHING:
      return {
        ...state,
        loading: false,
        loginErrors: null,
        signinErrors: null,
        redirect: false,
      };
    default:
      return state;
  }
};

export default reducer;
