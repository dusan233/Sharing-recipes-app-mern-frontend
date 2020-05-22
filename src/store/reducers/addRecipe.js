import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  success: false,
  recipeData: null,
  latestRecipes: [],
  topRatedRecipes: [],
  bestRatedLoading: false,
  allRecipes: [],
  allRecipesLoading: false,
  recipesCount: 0,
  currentPage: 1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_RECIPE_LOADING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actionTypes.STOP_RECIPE_LOADING:
      return {
        ...state,
        loading: false
      };
    case actionTypes.SET_ADD_RECIPE_ERRORS:
      return {
        ...state,
        recipeErrors: action.errors
      };
    case actionTypes.CLEAN_ADD_RECIPE_ERRORS:
      return {
        ...state,
        recipeErrors: null
      };
    case actionTypes.CLEAR_SUCCESS:
      return {
        ...state,
        success: false
      };
    case actionTypes.SET_SUCCESS:
      return {
        ...state,
        success: true
      };
    case actionTypes.SET_RECIPE_DETAILS:
      return {
        ...state,
        recipeData: action.recipe
      };
    case actionTypes.SET_LATEST_RECIPES:
      return {
        ...state,
        latestRecipes: action.recipes,
        loading: false
      };
    case actionTypes.START_TOP_RATED_LOADING:
      return {
        ...state,
        bestRatedLoading: true
      };
    case actionTypes.STOP_TOP_RATED_LOADING:
      return {
        ...state,
        bestRatedLoading: false
      };
    case actionTypes.SET_TOP_RATED_RECIPES:
      return {
        ...state,
        topRatedRecipes: action.recipes
      };
    case actionTypes.START_ALL_LOADING:
      return {
        ...state,
        allRecipesLoading: true
      };
    case actionTypes.STOP_ALL_LOADING:
      return {
        ...state,
        allRecipesLoading: false
      };
    case actionTypes.SET_ALL_RECIPES:
      return {
        ...state,
        allRecipes: action.recipes
      };
    case actionTypes.SET_RECIPES_COUNT:
      return {
        ...state,
        recipesCount: action.count,
        currentPage: action.page
      };
    default:
      return state;
  }
};

export default reducer;
