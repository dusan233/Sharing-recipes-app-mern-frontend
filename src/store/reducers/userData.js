import * as actionTypes from "../actionTypes";

const initialState = {
  username: null,
  headline: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        username: action.username,
        headline: action.headline,
      };
    default:
      return state;
  }
};

export default reducer;
