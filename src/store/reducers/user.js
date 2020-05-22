import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  reviewLoading: false,
  recCardLoading: false,
  currentLoadingRec: null,
  reviewError: null,
  recipeReviews: null,
  createdRecipes: [],
  favouriteRecipes: [],
  delitingAccount: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.STOP_USER_LOADING:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.START_REVIEW_LOADING:
      return {
        ...state,
        reviewLoading: true,
      };
    case actionTypes.STOP_REVIEW_LOADING:
      return {
        ...state,
        reviewLoading: false,
      };
    case actionTypes.SET_USERS_CREATED_RECIPES:
      return {
        ...state,
        createdRecipes: action.createdRecipes,
      };
    case actionTypes.SET_USERS_FAVOURITE_RECIPES:
      return {
        ...state,
        favouriteRecipes: action.favouriteRecipes,
      };
    case actionTypes.SET_REVIEW_ERROR:
      return {
        ...state,
        reviewError: action.error,
      };
    case actionTypes.CLEAR_REVIEW_ERROR:
      return {
        ...state,
        reviewError: null,
      };
    case actionTypes.SET_RECIPE_REVIEWS:
      return {
        ...state,
        recipeReviews: action.reviews,
      };
    case actionTypes.START_RECCARD_LOADING:
      return {
        ...state,
        recCardLoading: true,
        currentLoadingRec: action.recId,
      };
    case actionTypes.STOP_RECCARD_LOADING:
      return {
        ...state,
        recCardLoading: false,
        currentLoadingRec: null,
      };
    case actionTypes.START_DELETING_ACCOUNT:
      return {
        ...state,
        delitingAccount: true,
      };
    case actionTypes.STOP_DELETING_ACCOUNT:
      return {
        ...state,
        delitingAccount: false,
      };
    default:
      return state;
  }
};

export default reducer;
