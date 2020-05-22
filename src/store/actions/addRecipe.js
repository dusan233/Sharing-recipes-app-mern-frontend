import * as actionTypes from "../actionTypes";

const startRecLoading = () => {
  return {
    type: actionTypes.START_RECIPE_LOADING,
  };
};

const stopRecLoading = () => {
  return {
    type: actionTypes.STOP_RECIPE_LOADING,
  };
};

const startAllLoading = () => {
  return {
    type: actionTypes.START_ALL_LOADING,
  };
};

const stopAllLoading = () => {
  return {
    type: actionTypes.STOP_ALL_LOADING,
  };
};

const startTopRatedLoading = () => {
  return {
    type: actionTypes.START_TOP_RATED_LOADING,
  };
};

const stopTopRatedLoading = () => {
  return {
    type: actionTypes.STOP_TOP_RATED_LOADING,
  };
};

const setAddRecipeErrors = (errors) => {
  return {
    type: actionTypes.SET_ADD_RECIPE_ERRORS,
    errors: errors,
  };
};
export const cleanAddRecipeErrors = () => {
  return {
    type: actionTypes.CLEAN_ADD_RECIPE_ERRORS,
  };
};

const setSuccess = () => {
  return {
    type: actionTypes.SET_SUCCESS,
  };
};

export const clearSuccess = () => {
  return {
    type: actionTypes.CLEAR_SUCCESS,
  };
};

const setRecipeDetails = (recipeData) => {
  return {
    type: actionTypes.SET_RECIPE_DETAILS,
    recipe: recipeData,
  };
};

const gimeRecipeReviews = (reviews) => {
  return {
    type: actionTypes.SET_RECIPE_REVIEWS,
    reviews: reviews,
  };
};

const setLatestRecipes = (recipes) => {
  return {
    type: actionTypes.SET_LATEST_RECIPES,
    recipes: recipes,
  };
};

const setBestRatedRecipes = (recipes) => {
  return {
    type: actionTypes.SET_TOP_RATED_RECIPES,
    recipes: recipes,
  };
};

const setAllRecipes = (recipes) => {
  return {
    type: actionTypes.SET_ALL_RECIPES,
    recipes: recipes,
  };
};

const setRecipesCount = (count, page) => {
  return {
    type: actionTypes.SET_RECIPES_COUNT,
    count: count,
    page: page,
  };
};

export const addRecipe = (recipeData, userToken, userId, cleanInputs) => {
  return (dispatch) => {
    dispatch(startRecLoading());
    let formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("category", recipeData.category);
    formData.append("course", recipeData.course);
    formData.append("serves", recipeData.serve);
    formData.append("cookingTime", recipeData.cookingTime);
    formData.append("difficulty", recipeData.difficulty);
    formData.append("description", recipeData.description);
    formData.append("public", recipeData.publicly);
    recipeData.ingredients.forEach((ing) => {
      formData.append("ingredients", ing);
    });

    recipeData.instructions.forEach((ins) => {
      formData.append("instructions", ins);
    });
    recipeData.tags.forEach((tag) => {
      formData.append("tags", tag);
    });

    recipeData.images.forEach((file) => {
      formData.append("image", file);
    });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/add-recipe/${userId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
      },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(stopRecLoading());
        if (data.errorData) {
          const errors = {};
          data.errorData.forEach((erra) => {
            errors[erra.param] = erra.msg;
          });
          return dispatch(setAddRecipeErrors(errors));
        }
        dispatch(cleanAddRecipeErrors());
        dispatch(setSuccess());
        cleanInputs();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getLatestRecipes = () => {
  return (dispatch) => {
    dispatch(startRecLoading());
    fetch(`${process.env.REACT_APP_BACKEND_URL}/latest-recipes`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setLatestRecipes(data.recipes));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getBestRatedRecipes = () => {
  return (dispatch) => {
    dispatch(startTopRatedLoading());
    fetch(`${process.env.REACT_APP_BACKEND_URL}/toprated-recipes`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(stopTopRatedLoading());
        dispatch(setBestRatedRecipes(data.recipes));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getRecipeDetails = (recipeId, userId) => {
  return (dispatch) => {
    dispatch(startRecLoading());
    fetch(`${process.env.REACT_APP_BACKEND_URL}/recipe/${recipeId}/${userId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(stopRecLoading());
        dispatch(setRecipeDetails(data.recipe));
        dispatch(gimeRecipeReviews(data.recipe.reviews));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getAllRecipes = () => {
  return (dispatch) => {
    dispatch(startAllLoading());
    fetch(`${process.env.REACT_APP_BACKEND_URL}/recipes`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(stopAllLoading());
        dispatch(setAllRecipes(data.recipes));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const filterRecipes = (filters, page = 1) => {
  return (dispatch) => {
    dispatch(startAllLoading());
    fetch(`${process.env.REACT_APP_BACKEND_URL}/recipes/filter/${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filters: filters,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setAllRecipes(data.recipes));
        dispatch(stopAllLoading());
        dispatch(setRecipesCount(data.totalItems, data.currentPage));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
